import React from 'react'
import Image from 'next/image'
export default function MobileWaves({ className }: { className: string }) {
  return (
    <Image className={`mobile-top-waves sm:hidden ${className} absolute`} src="/register/BGBottomDots.webp" alt="Mobile Waves" height={100} width={100} />
  )
}
