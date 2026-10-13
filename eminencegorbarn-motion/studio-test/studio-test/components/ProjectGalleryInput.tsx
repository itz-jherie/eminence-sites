import {useCallback, useMemo, useState} from 'react'
import {PatchEvent, set, unset, useClient} from 'sanity'
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
  EyeOpenIcon,
  EyeClosedIcon,
  ResetIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@sanity/icons'

export interface GalleryItemValue {
  _key: string
  _type: 'image'
  asset?: {
    _type: 'reference'
    _ref: string
  }
  isCover?: boolean
  isHidden?: boolean
  alt?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProjectGalleryInput(props: any) {
  const {value = [], onChange} = props
  const client = useClient({apiVersion: '2024-03-24'})
  const {projectId = '', dataset = ''} = client.config()

  const [isManagerOpen, setIsManagerOpen] = useState(false)

  const items: GalleryItemValue[] = useMemo(() => {
    if (!Array.isArray(value)) return []
    return value.filter(
      (item): item is GalleryItemValue =>
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
      return `https://cdn.sanity.io/images/${projectId}/${dataset}/${hash}-${dims}.${ext}?w=300&fit=max&auto=format`
    },
    [projectId, dataset],
  )

  const hiddenCount = useMemo(() => items.filter((item) => Boolean(item.isHidden)).length, [items])
  const visibleCount = items.length - hiddenCount

  // Toggle isHidden on a specific gallery image
  const handleToggleHidden = useCallback(
    (targetKey: string) => {
      const updated = items.map((item) => {
        if (item._key === targetKey) {
          return {
            ...item,
            isHidden: !item.isHidden,
          }
        }
        return item
      })
      onChange(PatchEvent.from([set(updated)]))
    },
    [items, onChange],
  )

  // Unhide all images
  const handleUnhideAll = useCallback(() => {
    const updated = items.map((item) => ({
      ...item,
      isHidden: false,
    }))
    onChange(PatchEvent.from([set(updated)]))
  }, [items, onChange])

  return (
    <Stack space={3}>
      {/* Blocker & Visibility Toolbar Card */}
      {items.length > 0 && (
        <Card
          padding={4}
          radius={3}
          tone={hiddenCount > 0 ? 'caution' : 'default'}
          border
          style={{
            backgroundColor: hiddenCount > 0 ? 'rgba(251, 146, 60, 0.04)' : 'rgba(255, 255, 255, 0.02)',
          }}
        >
          <Stack space={3}>
            <Flex justify="space-between" align="center" wrap="wrap" gap={3}>
              <Stack space={2}>
                <Inline space={2}>
                  <Text weight="semibold" size={1}>
                    Image Blocker & Visibility Manager
                  </Text>
                  <Badge tone="positive" fontSize={1} padding={2}>
                    {visibleCount} Displayed
                  </Badge>
                  {hiddenCount > 0 ? (
                    <Badge tone="critical" fontSize={1} padding={2}>
                      {hiddenCount} Blocked / Hidden
                    </Badge>
                  ) : null}
                </Inline>
                <Text size={1} muted>
                  Block or unblock specific gallery images from the live website without deleting them.
                </Text>
              </Stack>

              <Inline space={2}>
                {hiddenCount > 0 && (
                  <Button
                    icon={ResetIcon}
                    text="Unhide All"
                    tone="positive"
                    mode="ghost"
                    fontSize={1}
                    padding={2}
                    onClick={handleUnhideAll}
                  />
                )}
                <Button
                  icon={isManagerOpen ? ChevronUpIcon : ChevronDownIcon}
                  text={isManagerOpen ? 'Close Blocker Menu' : 'Manage Blocked Images'}
                  tone={hiddenCount > 0 ? 'caution' : 'primary'}
                  mode={isManagerOpen ? 'default' : 'ghost'}
                  fontSize={1}
                  padding={2}
                  onClick={() => setIsManagerOpen((prev) => !prev)}
                />
              </Inline>
            </Flex>

            {/* Collapsible Quick Blocker Visual Grid */}
            {isManagerOpen && (
              <Box paddingTop={3} style={{borderTop: '1px solid rgba(255, 255, 255, 0.1)'}}>
                <Stack space={3}>
                  <Text size={1} weight="medium">
                    Click any image below to toggle between <strong style={{color: '#3BEDFF'}}>Displayed</strong> and <strong style={{color: '#f87171'}}>Blocked</strong>:
                  </Text>
                  <Grid columns={[2, 3, 4, 6]} gap={2}>
                    {items.map((item, index) => {
                      const url = item.asset?._ref ? assetRefToUrl(item.asset._ref) : null
                      const isBlocked = Boolean(item.isHidden)

                      return (
                        <Card
                          key={item._key}
                          radius={2}
                          overflow="hidden"
                          tone={isBlocked ? 'critical' : 'default'}
                          border
                          style={{
                            cursor: 'pointer',
                            position: 'relative',
                            aspectRatio: '16/10',
                            backgroundColor: '#111',
                            borderColor: isBlocked ? '#ef4444' : 'rgba(255, 255, 255, 0.15)',
                            transition: 'all 0.2s ease',
                          }}
                          onClick={() => handleToggleHidden(item._key)}
                        >
                          {url ? (
                            <img
                              src={url}
                              alt={item.alt || `Gallery #${index + 1}`}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                opacity: isBlocked ? 0.35 : 1,
                                filter: isBlocked ? 'grayscale(80%)' : 'none',
                                transition: 'opacity 0.2s',
                              }}
                            />
                          ) : (
                            <Flex justify="center" align="center" style={{height: '100%'}}>
                              <Text size={1} muted>No preview</Text>
                            </Flex>
                          )}

                          {/* Top Status Badge */}
                          <Box
                            style={{
                              position: 'absolute',
                              top: 6,
                              left: 6,
                              pointerEvents: 'none',
                            }}
                          >
                            {isBlocked ? (
                              <Badge tone="critical" fontSize={0} padding={1}>
                                <Inline space={1}>
                                  <EyeClosedIcon />
                                  <span>BLOCKED</span>
                                </Inline>
                              </Badge>
                            ) : (
                              <Badge tone="positive" fontSize={0} padding={1} style={{opacity: 0.9}}>
                                <Inline space={1}>
                                  <EyeOpenIcon />
                                  <span>#{index + 1}</span>
                                </Inline>
                              </Badge>
                            )}
                          </Box>

                          {/* Bottom Click Hint */}
                          <Box
                            style={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              right: 0,
                              backgroundColor: isBlocked ? 'rgba(239, 68, 68, 0.85)' : 'rgba(0, 0, 0, 0.65)',
                              color: '#fff',
                              padding: '3px 6px',
                              textAlign: 'center',
                            }}
                          >
                            <Text size={0} weight="semibold" style={{color: '#fff'}}>
                              {isBlocked ? 'Click to Unhide' : 'Click to Block'}
                            </Text>
                          </Box>
                        </Card>
                      )
                    })}
                  </Grid>
                </Stack>
              </Box>
            )}
          </Stack>
        </Card>
      )}

      {/* Standard Sanity Array UI (Upload dropzone, reorder, individual item edits) */}
      {props.renderDefault(props)}
    </Stack>
  )
}
