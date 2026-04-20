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
const DEFAULT_REMOTE_IMAGE_SIZE = {
  height: 900,
  width: 1200,
}
const LEADING_SLASHES_PATTERN = /^\/+/

function isRemoteImage(src: string) {
  return src.startsWith('http://') || src.startsWith('https://') || src.startsWith('//')
}

function resolveImageSize(src: string) {
  if (isRemoteImage(src)) {
    return DEFAULT_REMOTE_IMAGE_SIZE
  }

  if (!src.startsWith('/')) {
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
  const isRemote = isRemoteImage(src)
  const { height, width } = resolveImageSize(src)

  return (
    <figure className="mt-7 mb-4 flex flex-col items-center">
      <Image
        className={`block h-auto max-w-full rounded-[22px] border border-(--border) bg-(--background-strong) ${
          isRemote ? 'max-h-[min(70vh,960px)] w-auto' : 'w-full'
        }`}
        src={src}
        alt={alt ?? ''}
        width={width}
        height={height}
        sizes="(max-width: 768px) 100vw, 896px"
        unoptimized={isRemote}
      />
      {alt
        ? <figcaption className="mt-2.5 text-center text-[0.92rem] text-(--foreground-muted)">{alt}</figcaption>
        : null}
    </figure>
  )
}
