import {useCallback, useMemo, useRef, useState, type ChangeEvent} from 'react'
import {PatchEvent, set, unset, useClient, useFormValue} from 'sanity'
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Inline,
  Label,
  Stack,
  Text,
  Badge,
} from '@sanity/ui'
import {
  UploadIcon,
  TrashIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckmarkIcon,
  ResetIcon,
  ImagesIcon,
} from '@sanity/icons'

export interface PreviewGridItem {
  _key: string
  _type: 'image'
  asset: {
    _type: 'reference'
    _ref: string
  }
  isCover?: boolean
  alt?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProjectPreviewGridInput(props: any) {
  const {value = [], onChange} = props
  const client = useClient({apiVersion: '2024-03-24'})
  const {projectId = '', dataset = ''} = client.config()

  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Read gallery and coverImage from current document form state in real-time
  const galleryRaw = useFormValue(['gallery']) as
    | Array<{_key?: string; asset?: {_ref?: string}; alt?: string}>
    | undefined
  const coverImageRaw = useFormValue(['coverImage']) as
    | {asset?: {_ref?: string}; alt?: string}
    | undefined

  const currentItems: PreviewGridItem[] = useMemo(() => {
    if (!Array.isArray(value)) return []
    return value.filter(
      (item): item is PreviewGridItem =>
        Boolean(item && typeof item === 'object' && item.asset && item.asset._ref),
    )
  }, [value])

  const assetRefToUrl = useCallback(
    (ref: string): string | null => {
      if (!ref || !ref.startsWith('image-')) return null
      const parts = ref.split('-')
      if (parts.length < 4) return null
      const ext = parts[parts.length - 1]
      const dims = parts[parts.length - 2]
      const hash = parts.slice(1, parts.length - 2).join('-')
      if (!hash || !dims || !ext || !dims.includes('x')) return null
      return `https://cdn.sanity.io/images/${projectId}/${dataset}/${hash}-${dims}.${ext}?w=400&fit=max&auto=format`
    },
    [projectId, dataset],
  )

  // Collect all available images from this project (Cover + Gallery items)
  const availableProjectImages = useMemo(() => {
    const list: Array<{ref: string; url: string; label: string; alt?: string}> = []
    const seen = new Set<string>()

    if (coverImageRaw?.asset?._ref) {
      const ref = coverImageRaw.asset._ref
      const url = assetRefToUrl(ref)
      if (url) {
        seen.add(ref)
        list.push({ref, url, label: 'Cover Image', alt: coverImageRaw.alt})
      }
    }

    if (Array.isArray(galleryRaw)) {
      galleryRaw.forEach((item, index) => {
        const ref = item?.asset?._ref
        if (ref && !seen.has(ref)) {
          seen.add(ref)
          const url = assetRefToUrl(ref)
          if (url) {
            list.push({ref, url, label: `Gallery #${index + 1}`, alt: item.alt})
          }
        }
      })
    }

    return list
  }, [coverImageRaw, galleryRaw, assetRefToUrl])

  // Save helper
  const commitItems = useCallback(
    (newItems: PreviewGridItem[]) => {
      if (!newItems || newItems.length === 0) {
        onChange(PatchEvent.from([unset()]))
      } else {
        onChange(PatchEvent.from([set(newItems.slice(0, 4))]))
      }
    },
    [onChange],
  )

  // Add an image to the next empty slot (or replace if chosen)
  const handleSelectGalleryImage = useCallback(
    (ref: string, alt?: string) => {
      // If already in preview, remove it (toggle off)
      const existingIdx = currentItems.findIndex((item) => item.asset?._ref === ref)
      if (existingIdx !== -1) {
        const filtered = currentItems.filter((_, idx) => idx !== existingIdx)
        commitItems(filtered)
        return
      }

      // Check if all 4 slots are already full
      if (currentItems.length >= 4) {
        setError('All 4 preview slots are filled. Remove or clear a slot before adding another.')
        return
      }

      setError(null)
      const newItem: PreviewGridItem = {
        _key: Math.random().toString(36).substring(2, 10),
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: ref,
        },
        alt: alt || '',
      }

      commitItems([...currentItems, newItem])
    },
    [currentItems, commitItems],
  )

  // Remove a specific slot
  const handleRemoveSlot = useCallback(
    (index: number) => {
      setError(null)
      const updated = currentItems.filter((_, i) => i !== index)
      commitItems(updated)
    },
    [currentItems, commitItems],
  )

  // Swap / move slot
  const handleMoveSlot = useCallback(
    (index: number, direction: 'left' | 'right') => {
      setError(null)
      const targetIndex = direction === 'left' ? index - 1 : index + 1
      if (targetIndex < 0 || targetIndex >= currentItems.length) return

      const updated = [...currentItems]
      const temp = updated[index]
      updated[index] = updated[targetIndex]
      updated[targetIndex] = temp
      commitItems(updated)
    },
    [currentItems, commitItems],
  )

  // Auto-fill from first 4 gallery items
  const handleAutoFillFromGallery = useCallback(() => {
    setError(null)
    if (availableProjectImages.length === 0) {
      setError('No gallery or cover images available in this project to auto-fill.')
      return
    }

    const firstFour = availableProjectImages.slice(0, 4).map((img) => ({
      _key: Math.random().toString(36).substring(2, 10),
      _type: 'image' as const,
      asset: {
        _type: 'reference' as const,
        _ref: img.ref,
      },
      alt: img.alt || '',
    }))

    commitItems(firstFour)
  }, [availableProjectImages, commitItems])

  // Clear all slots
  const handleClearAll = useCallback(() => {
    setError(null)
    commitItems([])
  }, [commitItems])

  // Upload a totally new image specifically for preview
  const handleUploadNewImage = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.currentTarget.files?.[0]
      if (!file) return

      if (currentItems.length >= 4) {
        setError('All 4 preview slots are filled. Remove a slot before uploading a new image.')
        event.currentTarget.value = ''
        return
      }

      setUploading(true)
      setError(null)

      try {
        const asset = await client.assets.upload('image', file, {
          contentType: file.type,
          filename: file.name,
        })

        const newItem: PreviewGridItem = {
          _key: Math.random().toString(36).substring(2, 10),
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
          alt: file.name.replace(/\.[^/.]+$/, ''),
        }

        commitItems([...currentItems, newItem])
      } catch {
        setError('Image upload failed. Please try again.')
      } finally {
        setUploading(false)
        event.currentTarget.value = ''
      }
    },
    [client, currentItems, commitItems],
  )

  const slotLabels = [
    'Slot 1 (Top-Left)',
    'Slot 2 (Top-Right)',
    'Slot 3 (Bottom-Left)',
    'Slot 4 (Bottom-Right)',
  ]

  return (
    <Stack space={4}>
      {/* Informative Header / Instructions */}
      <Card padding={3} radius={2} tone="primary" border>
        <Flex justify="space-between" align="center" wrap="wrap" gap={2}>
          <Stack space={2}>
            <Text size={1} weight="semibold">
              Selected Preview Images for /projects page ({currentItems.length}/4 selected)
            </Text>
            <Text size={1} muted>
              {currentItems.length === 0
                ? 'No custom preview selected — the /projects page will automatically use the first 4 gallery images by default.'
                : 'Custom preview active! The inner project page will keep the full gallery order below.'}
            </Text>
          </Stack>
          <Inline space={2}>
            <Button
              icon={UploadIcon}
              text={uploading ? 'Uploading…' : 'Upload New Image'}
              tone="primary"
              fontSize={1}
              disabled={uploading || currentItems.length >= 4}
              loading={uploading}
              onClick={() => fileInputRef.current?.click()}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleUploadNewImage}
            />

            {availableProjectImages.length > 0 && (
              <Button
                icon={ImagesIcon}
                text="Auto-fill 1st 4 from Gallery"
                fontSize={1}
                mode="ghost"
                onClick={handleAutoFillFromGallery}
              />
            )}

            {currentItems.length > 0 && (
              <Button
                icon={ResetIcon}
                text="Clear Custom Preview"
                fontSize={1}
                tone="critical"
                mode="ghost"
                onClick={handleClearAll}
              />
            )}
          </Inline>
        </Flex>
      </Card>

      {error && (
        <Card padding={2} radius={2} tone="critical">
          <Text size={1}>{error}</Text>
        </Card>
      )}

      {/* 2x2 Slots Grid representing the /projects layout */}
      <Stack space={2}>
        <Label size={1}>2x2 Preview Arrangement on /projects</Label>
        <Grid columns={[1, 2]} gap={3}>
          {[0, 1, 2, 3].map((slotIdx) => {
            const item = currentItems[slotIdx]
            const imgUrl = item ? assetRefToUrl(item.asset?._ref) : null

            return (
              <Card
                key={slotIdx}
                padding={2}
                radius={2}
                border
                tone={item ? 'default' : 'transparent'}
                style={{
                  borderStyle: item ? 'solid' : 'dashed',
                  minHeight: 140,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Flex justify="space-between" align="center" style={{marginBottom: 8}}>
                  <Badge tone={item ? 'primary' : 'default'} fontSize={0}>
                    {slotLabels[slotIdx]}
                  </Badge>
                  {item && (
                    <Inline space={1}>
                      <Button
                        icon={ArrowLeftIcon}
                        fontSize={0}
                        padding={1}
                        mode="bleed"
                        disabled={slotIdx === 0}
                        onClick={() => handleMoveSlot(slotIdx, 'left')}
                        title="Move left"
                      />
                      <Button
                        icon={ArrowRightIcon}
                        fontSize={0}
                        padding={1}
                        mode="bleed"
                        disabled={slotIdx >= currentItems.length - 1}
                        onClick={() => handleMoveSlot(slotIdx, 'right')}
                        title="Move right"
                      />
                      <Button
                        icon={TrashIcon}
                        fontSize={0}
                        padding={1}
                        tone="critical"
                        mode="bleed"
                        onClick={() => handleRemoveSlot(slotIdx)}
                        title="Remove image from this slot"
                      />
                    </Inline>
                  )}
                </Flex>

                {item && imgUrl ? (
                  <Box
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: 120,
                      borderRadius: 4,
                      overflow: 'hidden',
                      backgroundColor: '#111',
                    }}
                  >
                    <img
                      src={imgUrl}
                      alt={item.alt || `Slot ${slotIdx + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  </Box>
                ) : (
                  <Flex
                    direction="column"
                    align="center"
                    justify="center"
                    style={{height: 120, textAlign: 'center'}}
                  >
                    <Text size={1} muted>
                      Slot {slotIdx + 1} Empty
                    </Text>
                    <Text size={0} muted style={{marginTop: 4}}>
                      Click a gallery image below or upload a new one
                    </Text>
                  </Flex>
                )}
              </Card>
            )
          })}
        </Grid>
      </Stack>

      {/* Selectable Menu: Project's Available Images */}
      <Stack space={3}>
        <Flex justify="space-between" align="baseline">
          <Label size={1}>
            Select from Project Gallery ({availableProjectImages.length} available)
          </Label>
          <Text size={0} muted>
            Click any image to add to preview (or click again to remove)
          </Text>
        </Flex>

        {availableProjectImages.length === 0 ? (
          <Card padding={3} radius={2} tone="transparent" border style={{borderStyle: 'dashed'}}>
            <Text size={1} muted>
              No gallery or cover images uploaded to this project yet. Add images to the Project Gallery
              below or use the &quot;Upload New Image&quot; button above.
            </Text>
          </Card>
        ) : (
          <Grid columns={[3, 4, 6]} gap={2}>
            {availableProjectImages.map((img) => {
              const selectedIdx = currentItems.findIndex((item) => item.asset?._ref === img.ref)
              const isSelected = selectedIdx !== -1

              return (
                <Card
                  key={img.ref}
                  as="button"
                  padding={0}
                  radius={2}
                  border
                  tone={isSelected ? 'primary' : 'default'}
                  style={{
                    position: 'relative',
                    cursor: 'pointer',
                    outline: isSelected ? '3px solid #2362fb' : 'none',
                    overflow: 'hidden',
                  }}
                  onClick={() => handleSelectGalleryImage(img.ref, img.alt)}
                  title={
                    isSelected
                      ? `In Slot ${selectedIdx + 1} — Click to remove`
                      : `Click to add to Slot ${currentItems.length + 1}`
                  }
                >
                  <Box style={{aspectRatio: '4/3', position: 'relative'}}>
                    <img
                      src={img.url}
                      alt={img.label}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />

                    {/* Active Slot Badge Overlay */}
                    {isSelected && (
                      <Box
                        style={{
                          position: 'absolute',
                          top: 4,
                          right: 4,
                          zIndex: 2,
                        }}
                      >
                        <Badge tone="primary" fontSize={0}>
                          <Flex align="center" gap={1}>
                            <CheckmarkIcon /> Slot {selectedIdx + 1}
                          </Flex>
                        </Badge>
                      </Box>
                    )}

                    {/* Label Tag */}
                    <Box
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        padding: '2px 4px',
                      }}
                    >
                      <Text size={0} style={{color: '#fff', fontSize: '10px'}} textOverflow="ellipsis">
                        {img.label}
                      </Text>
                    </Box>
                  </Box>
                </Card>
              )
            })}
          </Grid>
        )}
      </Stack>
    </Stack>
  )
}
