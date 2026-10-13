import {useEffect, useMemo, useState} from 'react'
import {
  type ArrayInputProps,
  PatchEvent,
  set,
  setIfMissing,
  insert,
  unset,
  useClient,
  useFormValue,
} from 'sanity'
import {Box, Button, Card, Flex, Grid, Stack, Text} from '@sanity/ui'

interface FeaturedRef {
  _key: string
  _type: string
  _ref: string
}

interface Candidate {
  _id: string
  title: string
  category: string
  coverUrl: string | null
  blocked: boolean
}

const API_VERSION = '2024-03-24'

const SITE_CATEGORIES: Record<string, string[]> = {
  motion: ['Motion'],
  branding: ['Branding', 'Graphics'],
  product: ['Product'],
  combined: ['Motion', 'Branding', 'Graphics'],
}

const SITE_VISIBILITY: Record<string, string> = {
  motion: 'showOnMotionSite',
  branding: 'showOnBrandingSite',
  product: 'showOnProductSite',
  combined: 'showOnCombinedSite',
}

function newKey() {
  return Math.random().toString(36).slice(2, 10)
}

/**
 * Visual picker for a site's Featured projects: a browsable grid of every
 * project in that site's categories (no search box needed). Click to pin —
 * click order = homepage order. Blocked projects are hidden here; unblock
 * them on the project document itself.
 */
export default function SiteFeaturedProjectsInput(props: ArrayInputProps) {
  const {value, onChange} = props
  const client = useClient({apiVersion: API_VERSION})
  const site = (useFormValue(['site']) as string | undefined) ?? undefined

  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loading, setLoading] = useState(true)

  const current: FeaturedRef[] = useMemo(
    () => (Array.isArray(value) ? (value as FeaturedRef[]) : []),
    [value],
  )
  const selectedIds = useMemo(() => current.map((v) => v._ref), [current])
  const positionOf = useMemo(() => {
    const map = new Map<string, number>()
    selectedIds.forEach((id, i) => map.set(id, i + 1))
    return map
  }, [selectedIds])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    client
      .fetch(
        `*[_type == "project"] | order(orderRank) {
          _id, title, category,
          "coverUrl": coverImage.asset->url,
          showOnMotionSite, showOnBrandingSite, showOnProductSite, showOnCombinedSite
        }`,
      )
      .then((rows) => {
        if (cancelled) return
        setCandidates(
          (rows || []).map(
            (r: Record<string, unknown>): Candidate => ({
              _id: r._id as string,
              title: (r.title as string) || 'Untitled',
              category: (r.category as string) || '',
              coverUrl: (r.coverUrl as string) || null,
              blocked: false,
            }),
          ),
        )
        setLoading(false)
      })
      .catch(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [client])

  // Mark blocked per current site (needs raw flags — refetch lightweight check)
  const [blockedIds, setBlockedIds] = useState<Set<string>>(new Set())
  useEffect(() => {
    if (!site || !SITE_VISIBILITY[site]) {
      setBlockedIds(new Set())
      return
    }
    let cancelled = false
    const field = SITE_VISIBILITY[site]
    client
      .fetch(`*[_type == "project" && ${field} == false]._id`)
      .then((ids) => {
        if (!cancelled) setBlockedIds(new Set((ids || []) as string[]))
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [client, site])

  const visibleCandidates = useMemo(() => {
    const cats = site ? SITE_CATEGORIES[site] : undefined
    const list = candidates.filter((c) => !cats || cats.includes(c.category))
    // Blocked projects sink to the bottom, greyed out
    return [...list].sort((a, b) => Number(blockedIds.has(a._id)) - Number(blockedIds.has(b._id)))
  }, [candidates, blockedIds, site])

  const orderedSelected = useMemo(
    () =>
      current
        .map((ref) => candidates.find((c) => c._id === ref._ref))
        .filter((c): c is Candidate => Boolean(c)),
    [current, candidates],
  )

  const toggle = (id: string) => {
    const existing = current.find((v) => v._ref === id)
    if (existing?._key) {
      onChange(PatchEvent.from(unset([{_key: existing._key}])))
    } else {
      onChange(
        PatchEvent.from([
          setIfMissing([]),
          insert(
            [{_type: 'reference', _ref: id, _key: newKey()}],
            'after',
            [-1],
          ),
        ]),
      )
    }
  }

  const move = (from: number, to: number) => {
    if (to < 0 || to >= current.length) return
    const next = [...current]
    const [item] = next.splice(from, 1)
    next.splice(to, 0, item)
    onChange(PatchEvent.from(set(next)))
  }

  const clearAll = () => {
    onChange(PatchEvent.from(unset([])))
  }

  return (
    <Stack space={4}>
      {orderedSelected.length > 0 && (
        <Card padding={3} radius={2} shadow={1} tone="primary">
          <Stack space={3}>
            <Text size={1} weight="semibold">
              Pinned in homepage order ({orderedSelected.length})
            </Text>
            <Stack space={2}>
              {orderedSelected.map((c, i) => (
                <Card key={c._id} padding={2} radius={2} border>
                  <Flex align="center" gap={2}>
                    <Text size={1} muted style={{minWidth: 20}}>
                      {i + 1}.
                    </Text>
                    <Box flex={1}>
                      <Text size={1} textOverflow="ellipsis">
                        {c.title}
                      </Text>
                    </Box>
                    <Button
                      mode="bleed"
                      padding={2}
                      title="Move up"
                      text="↑"
                      disabled={i === 0}
                      onClick={() => move(i, i - 1)}
                    />
                    <Button
                      mode="bleed"
                      padding={2}
                      title="Move down"
                      text="↓"
                      disabled={i === orderedSelected.length - 1}
                      onClick={() => move(i, i + 1)}
                    />
                    <Button
                      mode="bleed"
                      padding={2}
                      tone="critical"
                      title="Unpin"
                      text="×"
                      onClick={() => toggle(c._id)}
                    />
                  </Flex>
                </Card>
              ))}
            </Stack>
            <Box>
              <Button mode="ghost" tone="critical" text="Unpin all" onClick={clearAll} />
            </Box>
          </Stack>
        </Card>
      )}

      <Text size={1} weight="semibold">
        {site
          ? `All ${SITE_CATEGORIES[site].join(' + ')} projects — tap to pin`
          : 'All projects — tap to pin (pick a Site above to filter)'}
      </Text>

      {loading ? (
        <Text size={1} muted>
          Loading projects…
        </Text>
      ) : visibleCandidates.length === 0 ? (
        <Text size={1} muted>
          No projects in this site&apos;s categories yet. Set a project&apos;s
          Category in All Projects first.
        </Text>
      ) : (
        <Grid columns={[2, 3, 4]} gap={2}>
          {visibleCandidates.map((c) => {
            const pos = positionOf.get(c._id)
            const selected = pos !== undefined
            const blocked = blockedIds.has(c._id)
            return (
              <Card
                key={c._id}
                radius={2}
                border
                padding={2}
                tone={selected ? 'primary' : undefined}
                style={{
                  cursor: blocked ? 'not-allowed' : 'pointer',
                  position: 'relative',
                  opacity: blocked && !selected ? 0.45 : 1,
                }}
                onClick={blocked ? undefined : () => toggle(c._id)}
              >
                <Stack space={2}>
                  <Box
                    style={{
                      aspectRatio: '16 / 9',
                      borderRadius: 6,
                      overflow: 'hidden',
                      background: '#1a1a1a',
                    }}
                  >
                    {c.coverUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={`${c.coverUrl}?w=400&q=60&auto=format`}
                        alt={c.title}
                        style={{width: '100%', height: '100%', objectFit: 'cover'}}
                      />
                    ) : (
                      <Flex align="center" justify="center" style={{height: '100%'}}>
                        <Text size={0} muted>
                          No cover
                        </Text>
                      </Flex>
                    )}
                  </Box>
                  <Text size={1} weight={selected ? 'semibold' : undefined} textOverflow="ellipsis">
                    {c.title}
                  </Text>
                  <Text size={0} muted>
                    {c.category}{blocked ? ' · Blocked' : ''}
                  </Text>
                </Stack>
                {selected && (
                  <Box
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      background: '#3BEDFF',
                      color: '#111',
                      borderRadius: 999,
                      minWidth: 22,
                      height: 22,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: 12,
                    }}
                  >
                    {pos}
                  </Box>
                )}
              </Card>
            );
          })}
        </Grid>
      )}

      <Text size={0} muted>
        Everything else in this site&apos;s categories appears automatically
        after pinned picks, in catalogue drag order. Greyed-out projects are
        blocked via their Show-on toggle — open the project to unblock.
      </Text>
    </Stack>
  );
}
