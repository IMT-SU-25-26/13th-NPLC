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
  // Generate stars on client side only to avoid hydration mismatch
  const [stars, setStars] = useState<Star[]>([]);

  // Get the refs from our parallax hook
  const { blueRef, purpleRef, stairsRef, wavesRef, lightWavesRef, starsRef } =
    UseBuildingParallax();

  // Initialize starsRef.current as an array
  useEffect(() => {
    if (starsRef.current === undefined || !Array.isArray(starsRef.current)) {
      starsRef.current = [];
    }
    // Generate between 15-30 stars
    setStars(generateStars(20 + Math.floor(Math.random() * 10)));
  }, [starsRef]);

  return (
    <div className="overflow-hidden">
      <div className="min-h-screen w-screen overflow-hidden bg-gradient-to-b from-[#111114] to-[#090A1E]">
        {/* Stars */}
        {stars.map((star, index) => (
          <Image
            key={`star-${index}`}
            ref={(el) => {
              if (starsRef.current)
                (starsRef.current as (HTMLImageElement | null)[])[index] = el;
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

        {/* Remove the old single star */}
        {/* <Image
            className="star absolute z-[1] w-[2.5%] top-[0%] h-auto"
            src={"/backgrounds/Star.svg"}
            width={1000}
            height={1000}
            alt="background-gradient"
          /> */}
        <div className="relative up-container mt-[-0%] min-h-full w-full">
          <Image
            className="dimensional-rift absolute z-[0] w-full top-[-26%] h-auto"
            src={"/backgrounds/DimensionalRift.svg"}
            width={1000}
            height={1000}
            alt="background-gradient"
          />
          <Image
            className="gradient-light-bg absolute z-[1] w-full bottom-[-12.5%] h-auto"
            src={"/backgrounds/GradientLightBG.webp"}
            width={1000}
            height={1000}
            alt="background-gradient"
          />

          <Image
            className="light-middle absolute z-[2] w-full bottom-[20%] h-auto"
            src={"/backgrounds/LightTengah.webp"}
            width={1000}
            height={1000}
            alt="light-tengah"
          />
          <Image
            ref={blueRef}
            className="blue-building absolute z-[3] bottom-0 w-screen h-auto will-change-transform"
            src={"/backgrounds/BangunanBelakangBiru.svg"}
            width={100}
            height={100}
            alt="bagunan-biru"
          />
          <Image
            ref={purpleRef}
            className="purple-building absolute z-[4] bottom-0 w-screen h-auto will-change-transform"
            src={"/backgrounds/BangunanDepanUngu.svg"}
            width={100}
            height={100}
            alt="bangunan-ungu"
          />
          <Image
            className="front-light-gradient absolute z-[5] bottom-0 w-screen h-auto"
            src={"/backgrounds/FrontGradientLightBG.svg"}
            width={100}
            height={100}
            alt="front-light"
          />
          <div className="mt-[15%] timeline-container flex flex-col gap-12 items-center justify-start">
            <Image
              className="timeline-text z-[6] w-[30rem] h-auto"
              src={"/home/TimelineText.svg"}
              width={100}
              height={100}
              alt="time-line-text"
            />
            <Image
              className="timeline z-[6] w-[70rem] h-auto backdrop-blur-lg"
              src={"/home/Timeline.webp"}
              width={2000}
              height={2000}
              alt="time-line-text"
            />
            <Image
              className="hidden timeline-mobile z-[12] w-[70rem] h-auto backdrop-blur-lg"
              src={"/home/TimelineMobile.webp"}
              width={2000}
              height={2000}
              alt="time-line-text"
            />
          </div>
        </div>
        <div className="mt-[-10%] relative z-10 down-container w-full bg-[#090A1E] min-h-screen">
          <Image
            className="upmost-ground absolute w-screen z-[11] bottom-[0rem] h-auto"
            src={"/backgrounds/UpmostGround.svg"}
            width={1000}
            height={1000}
            alt="background-gradient"
          />
          <Image
            ref={wavesRef} // Add ref here
            className="waves absolute w-screen z-[9] bottom-[0rem] h-auto will-change-transform"
            src={"/home/bg-waves.webp"}
            width={1000}
            height={1000}
            alt="background-gradient"
          />
          <Image
            className="hidden waves2 absolute w-screen z-[9] bottom-[0rem] h-auto"
            src={"/home/bg-waves.webp"}
            width={1000}
            height={1000}
            alt="background-gradient"
          />
          <Image
            ref={lightWavesRef} // Add ref here
            className="light-waves absolute w-screen z-[8] bottom-[0rem] h-auto will-change-transform"
            src={"/home/Lights.svg"}
            width={1000}
            height={1000}
            alt="background-gradient"
          />
          <Image
            className="hidden light-waves2 absolute w-screen z-[8] bottom-[0rem] h-auto"
            src={"/home/Lights2.svg"}
            width={1000}
            height={1000}
            alt="background-gradient"
          />
          <Image
            ref={stairsRef}
            className="stairs absolute z-[0] w-full top-[-26%] h-auto will-change-transform"
            src={"/backgrounds/Stairs.svg"}
            width={1000}
            height={1000}
            alt="background-gradient"
          />
          <TabButtonContainer />
        </div>
      </div>
    </div>
  );
}
