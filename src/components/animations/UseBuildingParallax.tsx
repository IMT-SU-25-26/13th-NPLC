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
  const starsRef = useRef([])
  
  useEffect(() => {
    // Skip animation if user prefers reduced motion
    const prefersReducedMotion = 
      typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
      
    if (prefersReducedMotion) return
    
    const ctx = gsap.context(() => {
      // Blue building parallax
      gsap.to(blueRef.current, {
        scrollTrigger: {
          trigger: '.up-container',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
        y: '20%',
        ease: 'none'
      })
      
      // Purple building parallax
      gsap.to(purpleRef.current, {
        scrollTrigger: {
          trigger: '.up-container',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
        y: '25%',
        ease: 'none'
      })
      
      // Stairs parallax
      gsap.to(stairsRef.current, {
        scrollTrigger: {
          trigger: '.down-container',
          start: 'top bottom',
          end: 'top top',
          scrub: 0.8, 
        },
        y: '15%',
        ease: 'power1.out' 
      })
      
      // Waves parallax effect
      gsap.to(wavesRef.current, {
        scrollTrigger: {
          trigger: '.down-container',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.3,
        },
        y: '8%',
        ease: 'sine.inOut'
      })
      
      // Light waves parallax effect
      gsap.to(lightWavesRef.current, {
        scrollTrigger: {
          trigger: '.down-container',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: '12%',
        ease: 'sine.inOut'
      })
      
      starsRef.current.forEach((star, index) => {
        const depth = 1 + (Math.random() * 3); 
        const direction = index % 2 === 0 ? -1 : 1;
        
        gsap.to(star, {
          scrollTrigger: {
        trigger: '.up-container',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8, // Random scrub speed
          },
          y: `${direction * depth * 25}%`, // Much larger vertical movement
          x: `${direction * depth * 15}%`, // Larger horizontal movement
          rotation: index % 3 === 0 ? 15 * direction : 0, // Add rotation to some stars
          scale: 1 + (Math.random() * 0.3), // Slight scaling effect
          ease: 'sine.inOut'
        });
      });
    })
    
    // Cleanup
    return () => {
      ctx.revert()
    }
  }, [])
  
  return {
    blueRef,
    purpleRef,
    stairsRef,
    wavesRef,
    lightWavesRef,
    starsRef // Return the stars ref array
  }
}