import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

import { imageSize } from 'image-size'
import Image from 'next/image'

type MdxImageProps = {
  alt?: string
  src: string
}

const DEFAULT_IMAGE_SIZE = {
  height: 900,
  width: 1600,
}
const LEADING_SLASHES_PATTERN = /^\/+/

function resolveImageSize(src: string) {
  if (!src.startsWith('/') || src.startsWith('//')) {
    return DEFAULT_IMAGE_SIZE
  }

  const publicDir = path.join(process.cwd(), 'public')
  const sanitizedSrc = src.split('?')[0]?.split('#')[0] ?? src
  const imagePath = path.resolve(publicDir, sanitizedSrc.replace(LEADING_SLASHES_PATTERN, ''))

  if (!imagePath.startsWith(publicDir) || !fs.existsSync(imagePath)) {
    return DEFAULT_IMAGE_SIZE
  }

  const dimensions = imageSize(fs.readFileSync(imagePath))

  if (!dimensions.width || !dimensions.height) {
    return DEFAULT_IMAGE_SIZE
  }

  return {
    height: dimensions.height,
    width: dimensions.width,
  }
}

export function MdxImage({ alt, src }: MdxImageProps) {
  const { height, width } = resolveImageSize(src)

  return (
    <figure className="mdx-figure">
      <Image
        className="mdx-image"
        src={src}
        alt={alt ?? ''}
        width={width}
        height={height}
        sizes="(max-width: 768px) 100vw, 896px"
      />
      {alt ? <figcaption className="mdx-caption">{alt}</figcaption> : null}
    </figure>
  )
}
