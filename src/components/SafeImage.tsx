'use client'

import Image, { type ImageProps } from 'next/image'
import { isExternalImage, proxySrc } from '@/lib/proxy-image'

type SafeImageProps = Omit<ImageProps, 'src'> & { src: string; alt: string }

export default function SafeImage({ src, alt, ...props }: SafeImageProps) {
  const proxied = isExternalImage(src)
  const finalSrc = proxySrc(src, typeof props.width === 'number' ? props.width : 1200)
  // The proxy already validates and caches external images. Sending its
  // dynamic response through Cloudflare Images again makes the Worker
  // self-binding reject the otherwise valid upstream response.
  return <Image src={finalSrc} alt={alt} {...props} unoptimized={proxied || props.unoptimized} />
}
