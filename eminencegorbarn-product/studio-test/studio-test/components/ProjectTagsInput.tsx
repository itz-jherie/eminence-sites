import React, { useState, useCallback, useMemo } from 'react'
import { type ArrayOfPrimitivesInputProps, PatchEvent, set, unset } from 'sanity'
import {
  Card,
  Stack,
  Flex,
  Inline,
  Badge,
  Button,
  TextInput,
  Text,
  Box,
  Label,
} from '@sanity/ui'

// Preset combinations requested by the user
const PRESET_COMBINATIONS = [
  { label: 'Fintech / Cryptocurrency / Digital Payments', tags: ['Fintech', 'Cryptocurrency', 'Digital Payments'] },
  { label: 'Entertainment / Streaming / Technology', tags: ['Entertainment', 'Streaming', 'Technology'] },
  { label: 'Artificial Intelligence / SaaS / Future of Work', tags: ['Artificial Intelligence', 'SaaS', 'Future of Work'] },
  { label: 'Technology', tags: ['Technology'] },
  { label: 'Education / Nonprofit', tags: ['Education', 'Nonprofit'] },
  { label: 'Fitness / Artificial Intelligence', tags: ['Fitness', 'Artificial Intelligence'] },
  { label: 'Healthcare / Wellness', tags: ['Healthcare', 'Wellness'] },
  { label: 'Real Estate', tags: ['Real Estate'] },
  { label: 'Fitness / Health & Wellness', tags: ['Fitness', 'Health & Wellness'] },
  { label: 'Health & Wellness / Nutrition', tags: ['Health & Wellness', 'Nutrition'] },
]

// Common individual bubble tags that can be clicked to toggle on/off
const INDIVIDUAL_BUBBLE_TAGS = [
  'Fintech',
  'Cryptocurrency',
  'Digital Payments',
  'Artificial Intelligence',
  'Technology',
  'SaaS',
  'Future of Work',
  'Entertainment',
  'Streaming',
  'Healthcare',
  'Wellness',
  'Health & Wellness',
  'Fitness',
  'Nutrition',
  'Real Estate',
  'Education',
  'Nonprofit',
  'Web3',
  'Brand Identity',
  'Motion Graphics',
]

export default function ProjectTagsInput(props: ArrayOfPrimitivesInputProps) {
  const { onChange, value } = props
  const [customInput, setCustomInput] = useState('')

  const currentTags: string[] = useMemo(() => {
    if (!value || !Array.isArray(value)) return []
    return value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
  }, [value])

  // Update Sanity document with clean, deduplicated tags
  const updateTags = useCallback(
    (nextTags: string[]) => {
      const seen = new Set<string>()
      const cleaned: string[] = []
      for (const t of nextTags) {
        const trimmed = t.trim()
        const lower = trimmed.toLowerCase()
        if (trimmed && !seen.has(lower)) {
          seen.add(lower)
          cleaned.push(trimmed)
        }
      }
      onChange(PatchEvent.from(cleaned.length > 0 ? set(cleaned) : unset()))
    },
    [onChange]
  )

  // Toggle single tag
  const toggleTag = useCallback(
    (tag: string) => {
      const trimmed = tag.trim()
      if (!trimmed) return
      const exists = currentTags.some((t) => t.toLowerCase() === trimmed.toLowerCase())
      if (exists) {
        updateTags(currentTags.filter((t) => t.toLowerCase() !== trimmed.toLowerCase()))
      } else {
        updateTags([...currentTags, trimmed])
      }
    },
    [currentTags, updateTags]
  )

  // Remove tag by index
  const removeTag = useCallback(
    (indexToRemove: number) => {
      updateTags(currentTags.filter((_, idx) => idx !== indexToRemove))
    },
    [currentTags, updateTags]
  )

  // Set all tags from a preset combo
  const applyPreset = useCallback(
    (presetTags: string[]) => {
      updateTags(presetTags)
    },
    [updateTags]
  )

  // Add custom typed tag (supports comma/slash separated)
  const handleAddCustom = useCallback(() => {
    if (!customInput.trim()) return
    const split = customInput
      .split(/[/,]+/)
      .map((s) => s.trim())
      .filter(Boolean)
    updateTags([...currentTags, ...split])
    setCustomInput('')
  }, [customInput, currentTags, updateTags])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddCustom()
    }
  }

  return (
    <Card padding={4} radius={2} tone="transparent" border style={{ background: 'rgba(255,255,255,0.02)' }}>
      <Stack space={4}>
        {/* 1. Active Selected Tags & Subtitle Preview */}
        <Box>
          <Flex justify="space-between" align="center" paddingBottom={2}>
            <Label size={1} weight="semibold">
              Current Project Subtitle ({currentTags.length} {currentTags.length === 1 ? 'tag' : 'tags'})
            </Label>
            {currentTags.length > 0 && (
              <Button
                text="Clear All"
                tone="critical"
                mode="bleed"
                fontSize={1}
                padding={2}
                onClick={() => updateTags([])}
              />
            )}
          </Flex>

          <Card
            padding={3}
            radius={2}
            tone="default"
            border
            style={{
              background: '#0d1117',
              borderColor: currentTags.length > 0 ? '#38bdf8' : '#30363d',
              minHeight: '44px',
            }}
          >
            {currentTags.length > 0 ? (
              <Flex wrap="wrap" gap={2} align="center">
                {currentTags.map((tag, idx) => (
                  <button
                    key={`${tag}-${idx}`}
                    type="button"
                    onClick={() => removeTag(idx)}
                    title="Click to remove tag"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'rgba(56, 189, 248, 0.15)',
                      border: '1px solid #38bdf8',
                      color: '#7dd3fc',
                      borderRadius: '9999px',
                      padding: '4px 12px',
                      fontSize: '13px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'
                      e.currentTarget.style.borderColor = '#ef4444'
                      e.currentTarget.style.color = '#fca5a5'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(56, 189, 248, 0.15)'
                      e.currentTarget.style.borderColor = '#38bdf8'
                      e.currentTarget.style.color = '#7dd3fc'
                    }}
                  >
                    <span>{tag}</span>
                    <span style={{ fontSize: '14px', fontWeight: 'bold', lineHeight: 1 }}>×</span>
                  </button>
                ))}
                <Box marginLeft={2}>
                  <Text size={1} muted>
                    (Displays as: <strong style={{ color: '#e2e8f0' }}>{currentTags.join(' / ')}</strong>)
                  </Text>
                </Box>
              </Flex>
            ) : (
              <Text size={1} muted>
                No tags selected yet. Click any preset or bubble below, or type your own custom tags.
              </Text>
            )}
          </Card>
        </Box>

        {/* 2. Custom Tag Input Field */}
        <Box>
          <Label size={1} weight="semibold" style={{ marginBottom: '6px', display: 'block' }}>
            Add Custom Tag
          </Label>
          <Flex gap={2}>
            <Box flex={1}>
              <TextInput
                value={customInput}
                onChange={(e) => setCustomInput(e.currentTarget.value)}
                onKeyDown={handleKeyDown}
                placeholder='Type custom tag (e.g. "Cybersecurity" or "IoT / Hardware") and press Enter...'
                fontSize={2}
                padding={3}
              />
            </Box>
            <Button
              text="Add Tag"
              tone="primary"
              fontSize={1}
              padding={3}
              disabled={!customInput.trim()}
              onClick={handleAddCustom}
            />
          </Flex>
        </Box>

        {/* 3. Preset Combinations (1-Click Apply) */}
        <Box>
          <Label size={1} weight="semibold" style={{ marginBottom: '8px', display: 'block' }}>
            ⚡ 1-Click Preset Combos (Click to Apply)
          </Label>
          <Flex wrap="wrap" gap={2}>
            {PRESET_COMBINATIONS.map((preset, idx) => {
              const isActive =
                currentTags.length === preset.tags.length &&
                preset.tags.every((t, i) => currentTags[i]?.toLowerCase() === t.toLowerCase())

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => applyPreset(preset.tags)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '6px 13px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: isActive ? 600 : 400,
                    background: isActive ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                    border: isActive ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.12)',
                    color: isActive ? '#38bdf8' : '#e2e8f0',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'
                    }
                  }}
                >
                  {isActive && <span style={{ marginRight: '6px' }}>✓</span>}
                  {preset.label}
                </button>
              )
            })}
          </Flex>
        </Box>

        {/* 4. Quick Individual Tag Bubbles (Toggle On/Off) */}
        <Box>
          <Label size={1} weight="semibold" style={{ marginBottom: '8px', display: 'block' }}>
            🏷️ Quick Tag Bubbles (Click to Toggle On/Off)
          </Label>
          <Flex wrap="wrap" gap={2}>
            {INDIVIDUAL_BUBBLE_TAGS.map((tag) => {
              const isSelected = currentTags.some((t) => t.toLowerCase() === tag.toLowerCase())

              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '5px 12px',
                    borderRadius: '9999px',
                    fontSize: '12px',
                    fontWeight: isSelected ? 600 : 400,
                    background: isSelected ? '#38bdf8' : 'rgba(255, 255, 255, 0.06)',
                    border: isSelected ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.15)',
                    color: isSelected ? '#0f172a' : '#cbd5e1',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'
                      e.currentTarget.style.borderColor = '#94a3b8'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'
                    }
                  }}
                >
                  <span>{isSelected ? '✓ ' : '+ '}</span>
                  <span>{tag}</span>
                </button>
              )
            })}
          </Flex>
        </Box>
      </Stack>
    </Card>
  )
}
