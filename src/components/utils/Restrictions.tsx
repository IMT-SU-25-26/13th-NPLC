"use client";
import Image from "next/image";
import Link from "next/link";
import "@/styles/restriction-page.css";
import { useEffect, useState } from "react";
import { Star } from "@/types/misc";

export default function Restrictions({
  restrictionDescription,
}: {
  restrictionDescription: string;
}) {
  const generateStars = (count: number) => {
    return Array.from({ length: count }, () => ({
      left: `${Math.random() * 98}%`,
      top: `${Math.random() * 35}%`, // Keep stars in upper part
      size: 0.1 + Math.random() * 0.7, // Random size between 0.1% and 0.8%
      opacity: 0.5 + Math.random() * 0.1, // Random opacity
    }));
  };
  const [stars, setStars] = useState<Star[]>([]);
  useEffect(() => {
    // Generate between 15-30 stars
    setStars(generateStars(20 + Math.floor(Math.random() * 10)));
  }, []);
  return (
    <div className="min-h-screen w-screen overflow-hidden bg-gradient-to-b from-[#111114] to-[#090A1E]">
      <div className="restriction-top-container relative flex lg:gap-8 flex-col justify-start items-center w-full h-screen">
        {stars.map((star, index) => (
          <Image
            key={`star-${index}`}
            className="star absolute z-[0] h-auto will-change-transform"
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
        <div className="restriction-detail-purple-light-middle absolute bottom-[-5rem] bg-[#97156A] w-[1100px] h-[900px] rounded-full blur-[100px] z-[0]"></div>
        <Image
          src={"/backgrounds/BangunanBelakangBiru.svg"}
          alt="Background"
          width={100}
          height={100}
          className="z-[1] restriction-blue-building absolute w-screen h-auto bottom-[0rem]"
        />
        <Image
          src={"/backgrounds/BangunanDepanUngu.svg"}
          alt="Background"
          width={100}
          height={100}
          className="z-[2] restriction-purple-building absolute w-screen h-auto bottom-[0rem]"
        />
        <Image
          src={"/backgrounds/Stairs.svg"}
          alt="Stairs"
          width={100}
          height={100}
          className="z-[10] restriction-stairs absolute w-screen h-auto bottom-[-1rem]"
        />

        <div className="restriction-middle-container relative z-20 flex gap-6 flex-col items-center justify-center min-h-screen w-full px-4">
          <Image
            className="restriction-warning-text w-1/2 sm:w-1/4 h-auto"
            src={"/restrictions/WarningText.webp"}
            width={1000}
            height={1000}
            alt="background-gradient"
          />
          <div className="font-RopaSans-Regular gap-4 flex backdrop-blur-lg flex-col justify-center items-center restriction-out-container bg-[url('/restrictions/restricted-mobile.svg')] sm:bg-[url('/restrictions/page-restriction-bg.svg')] bg-contain bg-center bg-no-repeat">
            <h1 className="text-center restriction-title">
              This page is restricted
            </h1>
            <p className="text-center restriction-description">
              {restrictionDescription}
            </p>
            <Link href="/" className="restriction-btn h-auto group">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 417 138"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 117.09H41.3058L0 96.9246V117.09Z"
                  fill="#661109"
                  className={`group-hover:fill-[#000000] transition-colors duration-200`}
                />
                <path
                  d="M98.49 0L0 38.8754V85.6927L64.3021 117.09H309.815L408.305 78.2145V0H98.49Z"
                  fill="#661109"
                  className={`group-hover:fill-[#000000] transition-colors duration-200`}
                />
                <path
                  d="M8.69482 126.217H50.0006L8.69482 106.044V126.217Z"
                  fill="#FCF551"
                  className={`group-hover:fill-[#c651fc] transition-colors duration-200 cursor-target`}
                />
                <path
                  d="M107.177 9.12653L8.69482 47.9947V94.8193L72.9969 126.216H318.51L417 87.341V9.12653H107.177Z"
                  fill="#FCF551"
                  className={`group-hover:fill-[#c651fc] transition-colors duration-200 cursor-target`}
                />
                <path
                  d="M72.6392 132.396H271.941V137.262H72.6392"
                  fill="#FCF551"
                  className={`group-hover:fill-[#c651fc] transition-colors duration-200 cursor-target`}
                />
                <path
                  d="M8.56348 132.396H49.8693V137.262H8.56348"
                  fill="#FCF551"
                  className={`group-hover:fill-[#c651fc] transition-colors duration-200`}
                />
                <text
                  x="200"
                  y="75"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="currentColor"
                  fontSize="18"
                  fontWeight="500"
                  className="cursor-target text-[#D787DF] text-5xl sm:text-2xl md:text-4xl lg:text-5xl font-rubik-glitch group-hover:text-[#D787DF]"
                >
                  Home_
                </text>
                <text
                  x="210"
                  y="70"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="currentColor"
                  fontSize="18"
                  fontWeight="500"
                  className="cursor-target text-[#75E7F0] text-5xl sm:text-2xl md:text-4xl lg:text-5xl font-rubik-glitch group-hover:text-[#75E7F0]"
                >
                  Home_
                </text>
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-[#090A1E] absolute bottom-0 w-full h-full"></div>
    </div>
  );
}
