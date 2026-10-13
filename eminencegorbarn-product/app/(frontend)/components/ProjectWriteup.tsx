'use client'

import React, { useState, useRef, ComponentProps } from 'react'
import { PortableText, toPlainText } from '@portabletext/react'
import PortableTextRenderer from './PortableTextRenderer'

type PortableTextValue = ComponentProps<typeof PortableText>['value']
type PortableTextBlock = Extract<NonNullable<PortableTextValue>, unknown[]>[number]

interface ProjectWriteupProps {
  description?: string | null
  tagline?: string | null
  coreIdea?: string | null
  body?: PortableTextValue | null
}

function getBlockText(block: PortableTextBlock): string {
  try {
    return toPlainText(block as unknown as Parameters<typeof toPlainText>[0]).trim()
  } catch {
    return ''
  }
}

export default function ProjectWriteup({
  description,
  tagline,
  coreIdea,
  body,
}: ProjectWriteupProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const topRef = useRef<HTMLDivElement>(null)

  // 1. Determine first paragraph
  const descText = description?.trim() || ''

  let firstParagraph = descText
  let remainingBody: PortableTextBlock[] = Array.isArray(body) ? [...body] : body ? [body] : []

  // If no description, use the first block of body as paragraph 1
  if (!firstParagraph && remainingBody.length > 0) {
    const firstTextBlockIndex = remainingBody.findIndex(
      (b) => b._type === 'block' && getBlockText(b).length > 0
    )
    if (firstTextBlockIndex !== -1) {
      firstParagraph = getBlockText(remainingBody[firstTextBlockIndex])
      remainingBody = remainingBody.filter((_, idx) => idx !== firstTextBlockIndex)
    }
  }

  // 2. Clean remaining body blocks:
  // - Filter out blocks that duplicate tagline
  // - Filter out blocks that duplicate the firstParagraph
  const cleanBody = remainingBody.filter((block) => {
    if (block._type === 'block') {
      const text = getBlockText(block)
      if (tagline && text.toLowerCase() === tagline.trim().toLowerCase()) {
        return false
      }
      if (firstParagraph && text.toLowerCase() === firstParagraph.toLowerCase()) {
        return false
      }
    }
    return true
  })

  // 3. Determine if there is additional content to reveal
  const hasCoreIdea = Boolean(coreIdea && coreIdea.trim())
  const hasMoreBody = cleanBody.length > 0
  const hasMore = hasCoreIdea || hasMoreBody

  if (!firstParagraph && !hasMore) {
    return null
  }

  const toggleExpand = (fromBottom: boolean = false) => {
    if (isExpanded) {
      if (fromBottom && topRef.current) {
        topRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
      setIsExpanded(false)
    } else {
      setIsExpanded(true)
    }
  }

  return (
    <div ref={topRef} className="project-writeup max-w-3xl">
      {/* First Paragraph */}
      {firstParagraph && (
        <p
          className={`text-[#EEEEEE] font-normal leading-relaxed ${
            hasMore ? 'mb-4' : 'mb-10'
          }`}
          style={{ fontSize: 'clamp(17px, 1.8vw, 22px)' }}
        >
          {firstParagraph}
        </p>
      )}

      {/* Truncation / Read More Toggle */}
      {hasMore && (
        <>
          <div className="mb-6">
            <button
              type="button"
              onClick={() => toggleExpand(false)}
              className="group inline-flex items-center gap-2.5 text-sm sm:text-base font-medium text-[#3BEDFF] hover:text-white transition-colors duration-200 cursor-pointer select-none"
              aria-expanded={isExpanded}
              aria-controls="project-extended-writeup"
            >
              <span>{isExpanded ? 'Read less' : 'Read more'}</span>
              <span
                className={`inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#3BEDFF]/10 border border-[#3BEDFF]/20 text-[#3BEDFF] group-hover:bg-[#3BEDFF] group-hover:text-black group-hover:border-[#3BEDFF] transition-all duration-300 transform ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              >
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
          </div>

          {/* Extended Content Container */}
          <div
            id="project-extended-writeup"
            className={`transition-all duration-500 ease-in-out ${
              isExpanded
                ? 'max-h-[10000px] opacity-100 mb-10'
                : 'max-h-0 opacity-0 overflow-hidden mb-0 pointer-events-none'
            }`}
            aria-hidden={!isExpanded}
          >
            {/* Core Brand Idea Callout */}
            {hasCoreIdea && (
              <div className="p-6 md:p-8 rounded-xl bg-white/[0.03] border border-white/10 mb-8 max-w-3xl">
                <p className="text-xs uppercase tracking-widest text-[#3BEDFF] font-semibold mb-2">
                  Core Brand Idea
                </p>
                <p className="text-xl md:text-2xl text-white font-normal leading-snug">
                  &ldquo;{coreIdea}&rdquo;
                </p>
              </div>
            )}

            {/* Case Study Body */}
            {hasMoreBody && (
              <div>
                <div className="w-12 h-[2px] bg-[#3BEDFF]/40 mb-8" />
                <PortableTextRenderer content={cleanBody} />
              </div>
            )}

            {/* Bottom Read Less Button (convenient for long case studies) */}
            {cleanBody.length >= 2 && (
              <div className="pt-6 pb-2">
                <button
                  type="button"
                  onClick={() => toggleExpand(true)}
                  className="group inline-flex items-center gap-2.5 text-sm sm:text-base font-medium text-[#3BEDFF] hover:text-white transition-colors duration-200 cursor-pointer select-none"
                >
                  <span>Read less</span>
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#3BEDFF]/10 border border-[#3BEDFF]/20 text-[#3BEDFF] group-hover:bg-[#3BEDFF] group-hover:text-black group-hover:border-[#3BEDFF] transition-all duration-300 transform rotate-180">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
