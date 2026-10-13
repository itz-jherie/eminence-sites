'use client'

import Image from 'next/image'

interface AmbientImageProps {
  src: string;
  alt?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}

// Extract real image dimensions embedded in Sanity CDN asset URLs
function getSanityDimensions(url: string | null | undefined): { width: number; height: number; aspectRatio: number } | null {
  if (!url) return null;
  const match = url.match(/-(\d+)x(\d+)\./);
  if (!match) return null;
  const width = Number(match[1]);
  const height = Number(match[2]);
  if (!width || !height) return null;
  return { width, height, aspectRatio: width / height };
}

export default function AmbientImage({
  src,
  alt = '',
  className = '',
  imageClassName = '',
  priority = false,
}: AmbientImageProps) {
  if (!src) return null;

  const dims = getSanityDimensions(src);
  // If image is vertical / tall / square (ratio < 1.2), position at 'center 20%'
  // so the headline, top mockup framing, and prime subject sit properly without being cropped.
  // Landscape images (ratio >= 1.2) sit naturally dead-center.
  const isTall = dims ? dims.aspectRatio < 1.2 : false;
  const objectPosition = isTall ? 'center 20%' : 'center center';

  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#161616] ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        priority={priority}
        style={{
          objectFit: 'cover',
          objectPosition,
        }}
        className={`transition-transform duration-700 ease-out group-hover:scale-105 ${imageClassName}`}
      />
    </div>
  );
}
