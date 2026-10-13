import {useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent} from 'react'
import {type ObjectInputProps, PatchEvent, set, unset, useClient} from 'sanity'
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Inline,
  Label,
  Select,
  Spinner,
  Stack,
  Text,
} from '@sanity/ui'

interface PickValue {
  project?: {_ref?: string}
  image?: {asset?: {_ref?: string}}
  alt?: string
}

type HomepagePickInputProps = Omit<ObjectInputProps, 'value'> & {
  value?: PickValue | undefined
}

interface PickableImage {
  ref: string
  url: string
  label: string
}

interface ProjectOption {
  _id: string
  title: string
  category: string
  galleryCount: number
  images: PickableImage[]
}

interface ProjectRaw {
  _id: string
  title: string
  category: string
  galleryCount: number
  coverRef?: string | null
  posterRef?: string | null
  galleryRefs?: (string | null)[]
}

const API_VERSION = '2024-03-24'

/**
 * Build a cdn.sanity.io URL directly from an inline asset reference
 * (e.g. "image-<hash>-1920x1080-png") without joining to the asset document.
 */
function assetRefToUrl(
  ref: string,
  projectId: string,
  dataset: string,
): string | null {
  if (!ref.startsWith('image-')) return null
  const parts = ref.split('-')
  if (parts.length < 4) return null
  const ext = parts[parts.length - 1]
  const dims = parts[parts.length - 2]
  const hash = parts.slice(1, parts.length - 2).join('-')
  if (!hash || !dims || !ext || !dims.includes('x')) return null
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${hash}-${dims}.${ext}`
}

function buildProjectImages(
  project: ProjectRaw,
  projectId: string,
  dataset: string,
): PickableImage[] {
  const list: PickableImage[] = []
  const seen = new Set<string>()
  const push = (ref: string | null | undefined, label: string) => {
    if (!ref || seen.has(ref)) return
    const url = assetRefToUrl(ref, projectId, dataset)
    if (!url) return
    seen.add(ref)
    list.push({ref, url, label})
  }
  push(project.coverRef, 'Cover image')
  ;(project.galleryRefs || []).forEach((ref) => push(ref, 'Gallery image'))
  push(project.posterRef, 'Video poster')
  return list
}

/**
 * Dependent picker for homepage showcase slots:
 * 1. Choose a project (or "Custom image" to skip)
 * 2. Pick an image from THAT project's gallery / cover / video poster
 * 3. Or upload a custom image instead
 */
export default function HomepagePickInput(props: HomepagePickInputProps) {
  const {value, onChange} = props
  const client = useClient({apiVersion: API_VERSION})
  const {projectId = '', dataset = ''} = client.config()

  const [projects, setProjects] = useState<ProjectOption[]>([])
  const [loadingProjects, setLoadingProjects] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const selectedProjectRef = value?.project?._ref ?? null
  const selectedImageRef = value?.image?.asset?._ref ?? null

  const selectedProject = useMemo(
    () => projects.find((p) => p._id === selectedProjectRef) ?? null,
    [projects, selectedProjectRef],
  )
  const images = useMemo(() => selectedProject?.images ?? [], [selectedProject])

  // Load all projects WITH their gallery asset refs in one join-free query —
  // the thumbnails and the dropdown count come from the same inline document
  // data, so they can never disagree.
  useEffect(() => {
    let cancelled = false
    setLoadingProjects(true)
    client
      .fetch(
        `*[_type == "project"] | order(orderRank) {
          _id, title, category,
          "galleryCount": count(gallery),
          "coverRef": coverImage.asset._ref,
          "posterRef": videoPoster.asset._ref,
          "galleryRefs": gallery[].asset._ref
        }`,
      )
      .then((result: ProjectRaw[]) => {
        if (!cancelled) {
          setProjects(
            (result || []).map((p) => ({
              _id: p._id,
              title: p.title,
              category: p.category,
              galleryCount: p.galleryCount,
              images: buildProjectImages(p, projectId, dataset),
            })),
          )
        }
      })
      .catch(() => {
        if (!cancelled) setError('Could not load projects')
      })
      .finally(() => {
        if (!cancelled) setLoadingProjects(false)
      })
    return () => {
      cancelled = true
    }
  }, [client, projectId, dataset])

  // Preview URL of the currently selected image — constructed from the inline
  // asset ref (works for gallery picks AND custom uploads), no fetch needed.
  const previewUrl = useMemo(() => {
    if (!selectedImageRef) return null
    const known = images.find((i) => i.ref === selectedImageRef)
    return known?.url ?? assetRefToUrl(selectedImageRef, projectId, dataset)
  }, [selectedImageRef, images, projectId, dataset])

  const handleProjectChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const id = event.currentTarget.value
      if (!id) {
        // Custom image mode — drop the project reference and any stale image from it
        onChange(PatchEvent.from([unset(['project']), unset(['image'])]))
      } else {
        // Switching project invalidates the previously picked image
        onChange(
          PatchEvent.from([set({_type: 'reference', _ref: id}, ['project']), unset(['image'])]),
        )
      }
    },
    [onChange],
  )

  const handlePickImage = useCallback(
    (img: PickableImage) => {
      onChange(
        PatchEvent.from([
          set({_type: 'image', asset: {_type: 'reference', _ref: img.ref}}, ['image']),
          unset(['image.hotspot']),
        ]),
      )
    },
    [onChange],
  )

  const handleClearImage = useCallback(() => {
    onChange(PatchEvent.from([unset(['image'])]))
  }, [onChange])

  const handleUpload = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.currentTarget.files?.[0]
      if (!file) return
      setUploading(true)
      setError(null)
      try {
        const asset = await client.assets.upload('image', file, {
          contentType: file.type,
          filename: file.name,
        })
        onChange(
          PatchEvent.from([
            set({_type: 'image', asset: {_type: 'reference', _ref: asset._id}}, ['image']),
            unset(['image.hotspot']),
          ]),
        )
      } catch {
        setError('Upload failed — please try again')
      } finally {
        setUploading(false)
        event.currentTarget.value = ''
      }
    },
    [client, onChange],
  )

  return (
    <Stack space={3}>
      {error && <Text size={1}>{error}</Text>}

      {/* Step 1 — project (optional, for custom uploads) */}
      <Stack space={2}>
        <Label size={1}>1 — Project (choose “Custom image” to skip)</Label>
        {loadingProjects ? (
          <Inline space={2}>
            <Spinner />
            <Text size={1}>Loading projects…</Text>
          </Inline>
        ) : (
          <Select fontSize={1} value={selectedProjectRef ?? ''} onChange={handleProjectChange}>
            <option value="">Custom image (no project)</option>
            {projects.map((p) => (
              <option key={p._id} value={p._id}>
                {p.title} ({p.category}
                {p.galleryCount > 0
                  ? ` · ${p.galleryCount} gallery images`
                  : ' · no gallery, cover only'})
              </option>
            ))}
          </Select>
        )}
      </Stack>

      {/* Step 2 — pick from the selected project's images */}
      {selectedProjectRef && (
        <Stack space={2}>
          <Label size={1}>2 — Pick an image from this project</Label>
          {loadingProjects ? (
            <Inline space={2}>
              <Spinner />
              <Text size={1}>Loading images…</Text>
            </Inline>
          ) : images.length === 0 ? (
            <Text size={1} muted>
              This project has no images to pick from — upload a custom image below instead.
            </Text>
          ) : (
            <>
              {images.length === 1 && (
                <Text size={1} muted>
                  Only the cover image is available — this project has no gallery images (Motion
                  projects store their media as videos). Use it below, pick another project, or
                  upload a custom image.
                </Text>
              )}
              {images.length > 1 && (
                <Text size={1} muted>
                  {images.length} images available — click one to select it.
                </Text>
              )}
              <Grid columns={[3, 4, 5]} gap={2}>
                {images.map((img) => (
                  <Card
                    key={img.ref}
                    as="button"
                    padding={0}
                    radius={2}
                    tone={selectedImageRef === img.ref ? 'primary' : 'default'}
                    style={{
                      cursor: 'pointer',
                      border:
                        selectedImageRef === img.ref ? '2px solid #2362fb' : '2px solid transparent',
                    }}
                    onClick={() => handlePickImage(img)}
                    title={`Click to select — ${img.label}`}
                  >
                    <Box style={{aspectRatio: '4/3'}}>
                      <img
                        src={img.url}
                        alt={img.label}
                        style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}}
                      />
                    </Box>
                  </Card>
                ))}
              </Grid>
            </>
          )}
        </Stack>
      )}

      {/* Step 3 — or upload a custom image */}
      <Stack space={2}>
        <Label size={1}>
          {selectedProjectRef ? 'Or upload a custom image instead' : '2 — Upload a custom image'}
        </Label>
        <Inline space={2}>
          <Button
            text={uploading ? 'Uploading…' : 'Upload image'}
            tone="primary"
            fontSize={1}
            disabled={uploading}
            loading={uploading}
            onClick={() => fileInputRef.current?.click()}
          />
          <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleUpload} />
        </Inline>
      </Stack>

      {/* Current selection preview */}
      {selectedImageRef && (
        <Card padding={2} radius={2} shadow={1} tone="positive">
          <Flex align="center" gap={3}>
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Selected"
                style={{width: 64, height: 48, objectFit: 'cover', borderRadius: 3, display: 'block'}}
              />
            )}
            <Stack space={2} flex={1}>
              <Text size={1} weight="semibold">
                Selected image {selectedProjectRef ? 'from project' : '(custom upload)'}
              </Text>
            </Stack>
            <Button
              text="Clear"
              tone="critical"
              fontSize={1}
              mode="ghost"
              onClick={handleClearImage}
            />
          </Flex>
        </Card>
      )}
    </Stack>
  )
}
