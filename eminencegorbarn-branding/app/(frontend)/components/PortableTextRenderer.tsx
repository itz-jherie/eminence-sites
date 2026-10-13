'use client'

import { ComponentProps } from 'react'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'

// Custom styled components for rendering Sanity Portable Text
const components: PortableTextComponents = {
  // Block-level styles
  block: {
    normal: ({ children }) => (
      <p className="text-[#c4c4cc] text-base md:text-lg leading-[1.8] mb-6 font-normal">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="text-[#EEEEEE] text-2xl md:text-3xl lg:text-4xl font-normal tracking-tight mt-14 mb-6 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-[#EEEEEE] text-xl md:text-2xl font-normal tracking-tight mt-10 mb-4 leading-tight">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-[#EEEEEE] text-lg md:text-xl font-medium mt-8 mb-3 leading-snug">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-[#3BEDFF] pl-6 my-8 py-2">
        <p className="text-[#a1a1aa] text-lg md:text-xl italic leading-relaxed font-normal">
          {children}
        </p>
      </blockquote>
    ),
  },

  // List rendering
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-[#c4c4cc] text-base md:text-lg leading-[1.8]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside ml-6 mb-6 space-y-2 text-[#c4c4cc] text-base md:text-lg leading-[1.8]">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => <li className="pl-2">{children}</li>,
    number: ({ children }) => <li className="pl-2">{children}</li>,
  },

  // Inline marks (bold, italic, etc.)
  marks: {
    strong: ({ children }) => (
      <strong className="text-[#EEEEEE] font-semibold">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-[#d4d4dc]">{children}</em>
    ),
    underline: ({ children }) => (
      <span className="underline underline-offset-4 decoration-[#3BEDFF]/40">{children}</span>
    ),
    'strike-through': ({ children }) => (
      <span className="line-through text-[#666]">{children}</span>
    ),
    link: ({ children, value }) => {
      const target = value?.href?.startsWith('http') ? '_blank' : undefined
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-[#3BEDFF] hover:text-[#6ef3ff] underline underline-offset-4 decoration-[#3BEDFF]/30 hover:decoration-[#3BEDFF] transition-colors duration-300"
        >
          {children}
        </a>
      )
    },
  },

  // Custom types (inline images)
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null
      // Build Sanity image URL from _ref
      const ref = value.asset._ref
      const [, id, dimensions, format] = ref.split('-')
      const url = `https://cdn.sanity.io/images/uz3il453/production/${id}-${dimensions}.${format}`

      return (
        <figure className="my-10 md:my-14">
          <div className="relative w-full h-[300px] sm:h-[450px] md:h-[600px] rounded-xl overflow-hidden group">
            <Image
              src={url}
              alt={value.alt || ''}
              fill
              className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
            />
          </div>
          {value.caption && (
            <figcaption className="text-[#666] text-sm mt-4 text-center italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}

export default function PortableTextRenderer({ content }: { content: ComponentProps<typeof PortableText>['value'] }) {
  if (!content || (Array.isArray(content) && content.length === 0)) return null

  return (
    <div className="portable-text-body">
      <PortableText value={content} components={components} />
    </div>
  )
}
