// NPLC 13th by SU IMT
"use client";

import { useEffect, useState } from "react";
import "@/styles/home.css";
import Image from "next/image";
import TabButtonContainer from "@/components/utils/TabButtonContainer";
import UseBuildingParallax from "@/components/animations/UseBuildingParallax";
import { Star } from "@/types/misc";

// Generate star objects with random positions and sizes
const generateStars = (count: number) => {
  return Array.from({ length: count }, () => ({
    left: `${Math.random() * 98}%`,
    top: `${Math.random() * 35}%`, // Keep stars in upper part
    size: 0.1 + Math.random() * 0.7, // Random size between 0.1% and 0.8%
    opacity: 0.5 + Math.random() * 0.1, // Random opacity
  }));
};

export default function Home() {
  const [stars, setStars] = useState<Star[]>([]);

  const { blueRef, purpleRef, stairsRef, wavesRef, lightWavesRef, starsRef } =
    UseBuildingParallax();

  useEffect(() => {
    // Generate between 15-30 stars
    setStars(generateStars(20 + Math.floor(Math.random() * 10)));

    // Pastikan array ref di-reset setiap kali komponen di-mount
    // untuk menghindari referensi lama yang tidak terpakai.
    starsRef.current = [];
  }, [starsRef]); // Dependensi sudah benar

  return (
    // Tambahkan class 'up-container' untuk trigger GSAP
    <div className="overflow-hidden">
      <div className="up-container up-container relative flex lg:gap-8 flex-col justify-start items-center w-full h-screen">
        {stars.map((star, index) => (
          <Image
            draggable={false}
            key={`star-${index}`}
            ref={(el) => {
              // Pastikan hanya elemen yang valid yang dimasukkan
              if (el && starsRef.current) {
                starsRef.current[index] = el;
              }
            }}
            className="star absolute z-[1] h-auto will-change-transform"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}%`,
              opacity: star.opacity,
            }}
            src={"/backgrounds/Star.svg"}
            width={100}
            height={100}
            alt={`star-${index}`}
          />
        ))}
        <div className="z-[5] absolute w-full h-full bg-gradient-to-b from-[0%] from-[#2a0335]/50 via-[43%] via-[#6258D1]/50 to-[100%] to-[#00CBC1]/50 blue-light-top"></div>
        <div className="home-purple-light-middle absolute bottom-[-5rem] bg-[#97156A] w-[300px] h-[500px] md:w-[600px] md:h-[600px] xl:w-[1100px] xl:h-[900px] rounded-full blur-[100px] z-[0]"></div>
        <Image
          src={"/backgrounds/BangunanBelakangBiru.svg"}
          alt="Background"
          width={100}
          draggable={false}
          ref={blueRef}
          height={100}
          className="z-[1] restriction-blue-building will-change-transform absolute w-screen h-auto bottom-[0rem]"
        />
        <Image
          src={"/backgrounds/BangunanDepanUngu.svg"}
          alt="Background"
          width={100}
          draggable={false}
          ref={purpleRef}
          height={100}
          className="z-[2] restriction-purple-building absolute will-change-transform w-screen h-auto bottom-[-5rem]"
        />
        <div className="flex flex-col gap-12 items-center justify-center w-full h-full">
          <Image
            className="timeline-text z-[6] w-[30rem] h-auto"
            src={"/home/TimelineText.svg"}
            width={100}
            draggable={false}
            height={100}
            alt="time-line-text"
          />
          <Image
            className="timeline z-[6] w-[70rem] h-auto backdrop-blur-lg"
            src={"/home/Timeline.webp"}
            draggable={false}
            width={2000}
            height={2000}
            alt="time-line-text"
          />
          <Image
            className="hidden timeline-mobile z-[12] w-[70rem] h-auto backdrop-blur-lg"
            src={"/home/TimelineMobile.webp"}
            draggable={false}
            width={2000}
            height={2000}
            alt="time-line-text"
          />
        </div>
      </div>
      {/* Pastikan `down-container` ada untuk trigger animasi lainnya */}
      <div className="relative z-10 down-container xl:py-16 w-full bg-[#090A1E] h-full">
        <Image
          className="upmost-ground absolute w-screen z-[11] bottom-[0rem] h-auto"
          src={"/backgrounds/UpmostGround.svg"}
          width={1000}
          draggable={false}
          height={1000}
          alt="background-gradient"
        />
        <Image
          ref={wavesRef}
          className="waves absolute w-screen z-[9] bottom-[0rem] h-auto will-change-transform"
          src={"/home/bg-waves.webp"}
          width={1000}
          height={1000}
          draggable={false}
          alt="background-gradient"
        />
        <Image
          className="hidden waves2 absolute w-screen z-[9] bottom-[0rem] h-auto"
          src={"/home/bg-waves.webp"}
          width={1000}
          height={1000}
          draggable={false}
          alt="background-gradient"
        />
        <Image
          ref={lightWavesRef}
          className="light-waves absolute w-screen z-[8] bottom-[0rem] h-auto will-change-transform"
          src={"/home/Lights.svg"}
          width={1000}
          height={1000}
          draggable={false}
          alt="background-gradient"
        />
        <Image
          className="hidden light-waves2 absolute w-screen z-[8] bottom-[0rem] h-auto"
          src={"/home/Lights2.svg"}
          width={1000}
          height={1000}
          draggable={false}
          alt="background-gradient"
        />
        <Image
          ref={stairsRef}
          draggable={false}
          className="stairs absolute z-[0] w-full top-[-26%] h-auto will-change-transform"
          src={"/backgrounds/Stairs.svg"}
          width={1000}
          height={1000}
          alt="background-gradient"
        />
        <TabButtonContainer />
      </div>
    </div>
  );
}
