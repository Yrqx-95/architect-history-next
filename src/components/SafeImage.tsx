'use client'

import Image, { type ImageProps } from 'next/image'
import { proxySrc } from '@/lib/proxy-image'

type SafeImageProps = Omit<ImageProps, 'src'> & { src: string; alt: string }

export default function SafeImage({ src, alt, ...props }: SafeImageProps) {
  const finalSrc = proxySrc(src, typeof props.width === 'number' ? props.width : 1200)
  return <Image src={finalSrc} alt={alt} {...props} />
}
