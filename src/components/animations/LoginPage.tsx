"use client";
import { useEffect } from "react";
import { gsap } from "gsap";

const BuildingAnimations = () => {
  useEffect(() => {
    // Set initial properties untuk hardware acceleration
    gsap.set([".aoi", ".murasaki"], {
      force3D: true,
      transformOrigin: "center bottom",
      willChange: "transform"
    });

    // Buat timeline untuk sinkronisasi yang lebih baik
    const tl = gsap.timeline();

    // Animasi untuk building biru (aoi) - optimized
    tl.to(".aoi", {
      y: -10, // dikurangi dari -12
      duration: 3, // dikurangi dari 4
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    }, 0);

    // Animasi untuk building ungu (murasaki) - optimized
    tl.to(".murasaki", {
      y: -8, // dikurangi dari -8
      duration: 2.5, // dikurangi dari 3.5
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    }, 0.5); // delay dikurangi dari 1

    // Scale animations yang lebih subtle dan efficient
    tl.to(".aoi", {
      scaleY: 1.01, // dikurangi dari 1.02
      duration: 4, // dikurangi dari 5
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    }, 0.2);

    tl.to(".murasaki", {
      scaleY: 1.008, // dikurangi dari 1.015
      duration: 3.5, // dikurangi dari 4.5
      ease: "power1.inOut", 
      repeat: -1,
      yoyo: true,
    }, 1);

    // Cleanup function
    return () => {
      tl.kill();
      gsap.set([".aoi", ".murasaki"], {
        willChange: "auto"
      });
    };
  }, []);

  return null;
};

export default BuildingAnimations;