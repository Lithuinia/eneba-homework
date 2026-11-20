import { useEffect, useState } from 'react'

interface ProductArtworkProps {
  src: string | null
  alt: string
  platform: string
  className?: string
}

const gradients: Record<string, string> = {
  Steam: 'linear-gradient(145deg, #1b2838 0%, #2a475e 55%, #66c0f4 100%)',
  PSN: 'linear-gradient(145deg, #0b1a3a 0%, #1f4fa0 55%, #4aa8ff 100%)',
  Xbox: 'linear-gradient(145deg, #0e2a12 0%, #107c10 55%, #7ee787 100%)',
  Nintendo: 'linear-gradient(145deg, #3a0b0b 0%, #e60012 55%, #ff8f9c 100%)',
  Roblox: 'linear-gradient(145deg, #24102e 0%, #6b2c91 55%, #f5a3ff 100%)',
  PC: 'linear-gradient(145deg, #1f0a4d 0%, #4618ac 55%, #c5b1f1 100%)',
  'Gift Card': 'linear-gradient(145deg, #3c2600 0%, #f0a613 55%, #fad318 100%)',
}

export function ProductArtwork({ src, alt, platform, className = '' }: ProductArtworkProps) {
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setFailed(false)
  }, [src])

  const initials = alt
    .replace(/[^\p{L}\p{N} ]/gu, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('')

  if (!src || failed) {
    return (
      <div
        className={`product-artwork product-artwork-fallback ${className}`.trim()}
        style={{ background: gradients[platform] ?? gradients.PC }}
        aria-label={alt}
        role="img"
      >
        <span className="product-artwork-mark">{initials || 'EN'}</span>
        <span className="product-artwork-platform">{platform}</span>
      </div>
    )
  }

  return (
    <div className={`product-artwork ${className}`.trim()}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        onLoad={(event) => {
          const image = event.currentTarget
          if (image.naturalWidth < 200 || image.naturalHeight < 200) {
            setFailed(true)
          }
        }}
      />
    </div>
  )
}
