'use client'
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/restrictions.module.css";

export default function Restrictions({restrictionDescription}: {restrictionDescription: string}) {
  return (
    <div className="overflow-hidden min-h-screen w-full">
      <div className="w-full overflow-hidden bg-gradient-to-b from-[#111114] to-[#090A1E] min-h-screen relative">
        <div className="relative w-full min-h-screen">
          <Image
            className="light-background absolute z-[1] w-full bottom-[40%] sm:bottom-[40%] lg:bottom-[-30%] h-[35rem] sm:h-auto"
            src={"/backgrounds/GradientLightBG.webp"}
            width={1000}
            height={1000}
            alt="background-gradient"
          />
          <Image
            className="hollow-purple absolute z-[2] w-full bottom-[40%] sm:bottom-[35%] lg:bottom-[20%] h-auto"
            src={"/backgrounds/LightTengah.webp"}
            width={1000}
            height={1000}
            alt="light-tengah"
          />
          <Image
            className="aoi absolute z-[3] bottom-[40%] sm:bottom-[35%] lg:bottom-[-4%] w-screen h-auto"
            src={"/backgrounds/BangunanBelakangBiru.svg"}
            width={100}
            height={100}
            alt="bagunan-biru"
          />
          <Image
            className="murasaki absolute z-[4] bottom-[35%] sm:bottom-[30%] lg:bottom-[-4%] w-screen h-auto"
            src={"/backgrounds/BangunanDepanUngu.svg"}
            width={100}
            height={100}
            alt="bangunan-ungu"
          />
          <Image
            className="light absolute z-[5] bottom-[30%] sm:bottom-[25%] lg:bottom-0 w-screen h-auto"
            src={"/backgrounds/FrontGradientLightBG.svg"}
            width={100}
            height={100}
            alt="front-light"
          />
          <div className="relative z-20 flex gap-6 flex-col items-center justify-center min-h-screen w-full px-4">
            <Image
              className="w-1/2 sm:w-1/4 h-auto"
              src={"/restrictions/WarningText.webp"}
              width={1000}
              height={1000}
              alt="background-gradient"
            />
            <div className={styles.outcontainer}>
              <div className={styles.incontainer}>
                <h1 className={styles.title}>
                  This page is restricted
                </h1>
                <p className={styles.text}>
                  {restrictionDescription}
                </p>
              </div>
              <Link href="/" className={styles.btn}>
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
          <Image
            className="tangga absolute z-[10] w-full bottom-[28%] sm:bottom-[20%] lg:bottom-[-8%] h-auto"
            src={"/backgrounds/Stairs.svg"}
            width={1000}
            height={1000}
            alt="background-gradient"
          />
        </div>
      </div>
    </div>
  );
}
