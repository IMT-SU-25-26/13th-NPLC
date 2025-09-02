'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

// Register the ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function UseBuildingParallax() {
  const blueRef = useRef(null)
  const purpleRef = useRef(null)
  const stairsRef = useRef(null)
  const wavesRef = useRef(null)
  const lightWavesRef = useRef(null)
  // starsRef sekarang akan merujuk ke kontainer/elemen parent dari bintang
  // Namun, karena bintang dibuat dinamis, kita akan tetap menggunakan array.
  const starsRef = useRef<(HTMLImageElement | null)[]>([])
  
  useEffect(() => {
    // Skip animation if user prefers reduced motion
    const prefersReducedMotion = 
      typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
      
    if (prefersReducedMotion) return
    
    // PENJELASAN PERUBAHAN UTAMA:
    // Kita membuat satu timeline utama yang akan dikontrol oleh satu ScrollTrigger.
    // Semua animasi yang dipicu oleh scroll pada ".up-container" akan masuk ke sini.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.up-container', // Perbaikan: Gunakan trigger yang sudah ada
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5, // Scrub akan diwarisi oleh semua animasi di timeline ini
      }
    });
    
    const ctx = gsap.context(() => {
      // Tambahkan animasi gedung ke timeline utama.
      // Posisi '<' berarti semua animasi ini dimulai bersamaan saat timeline mulai.
      tl.to(blueRef.current, { y: '20%', ease: 'none' }, '<')
        .to(purpleRef.current, { y: '25%', ease: 'none' }, '<');
      
      // PERBAIKAN UTAMA PADA ANIMASI BINTANG:
      // Kita loop melalui ref bintang dan menambahkan animasi mereka ke timeline yang SAMA.
      // GSAP sangat efisien dalam menangani banyak target dalam satu timeline.
      starsRef.current.forEach((star, index) => {
        if (!star) return; // Lewati jika elemen ref null
        
        const depth = 1 + (Math.random() * 3); 
        const direction = index % 2 === 0 ? -1 : 1;
        
        // Tambahkan animasi untuk setiap bintang ke timeline yang sudah ada
        tl.to(star, {
          y: `${direction * depth * 25}%`,
          x: `${direction * depth * 15}%`,
          rotation: index % 3 === 0 ? 15 * direction : 0,
          scale: 1 + (Math.random() * 0.3),
          ease: 'sine.inOut'
        }, '<'); // '<' memastikan semua bintang bergerak bersamaan dengan gedung
      });
      
      // Animasi untuk elemen di ".down-container" tetap menggunakan ScrollTrigger terpisah
      // karena pemicu (trigger) dan timing-nya berbeda. Ini sudah benar.
      gsap.to(stairsRef.current, {
        scrollTrigger: {
          trigger: '.down-container',
          start: 'top bottom',
          end: 'top top',
          scrub: 0.8, 
        },
        y: '15%',
        ease: 'power1.out' 
      });
      
      gsap.to(wavesRef.current, {
        scrollTrigger: {
          trigger: '.down-container',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.3,
        },
        y: '8%',
        ease: 'sine.inOut'
      });
      
      gsap.to(lightWavesRef.current, {
        scrollTrigger: {
          trigger: '.down-container',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: '12%',
        ease: 'sine.inOut'
      });
    });
    
    // Cleanup
    return () => {
      ctx.revert();
    }
    // Tambahkan dependensi `starsRef.current.length` agar animasi di-refresh
    // jika jumlah bintang berubah (meskipun dalam kasus ini tidak).
  }, [starsRef.current.length]);
  
  return {
    blueRef,
    purpleRef,
    stairsRef,
    wavesRef,
    lightWavesRef,
    starsRef
  }
}