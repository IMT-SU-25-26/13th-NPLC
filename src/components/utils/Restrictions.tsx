'use client'
import Image from "next/image";
import Link from "next/link";
import '@/styles/warning-page.css'

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
            {/* yang belum:
            mobile landscape -> belum responsive
             */}
            <div className="
              max-[345px]:h-[160px] max-[345px]:w-[250px]
              max-[361px]:h-[180px]
              max-[376px]:h-[180px]
              max-[391px]:h-[200px]
              max-[769px]:h-[200px]
              max-[771px]:h-[200px]
              max-[821px]:w-[320px]
              max-[824px]:h-[180px] max-[824px]:w-[290px]
              max-[913px]:w-[400px]
              max-[1025px]:w-[390px]
              max-[1281px]:w-[390px]
              max-[1311px]:w-[400px]
              max-[1367px]:w-[390px]
              max-[1441px]:w-[390px]
              max-[1513px]:w-[390px]
              max-[1537px]:w-[390px]
              max-[1539px]:w-[400px]
              max-[1729px]:w-[390px]
              max-[1901px]:w-[380px]
              max-[1921px]:w-[380px]
              max-[2049px]:w-[380px]
              max-[2561px]:w-[380px]
              max-[2851px]:w-[380px]
              max-[3841px]:w-[380px]
              blur-container flex flex-col justify-between items-center lg:gap-0 
              h-[15rem] w-full p-8 shadow-lg 
              bg-[url('/restrictions/restricted-mobile.svg')] 
              bg-contain bg-center bg-no-repeat backdrop-blur-md">
              <div className="
              inner-container flex flex-col font-exo2 gap-4 sm:gap-8 lg:gap-12 h-full items-center justify-center text-center">
                <h1 className="
                max-[345px]:-mt-4
                max-[361px]:text-[20px] max-[361px]:-mt-4
                max-[376px]:-mt-4 max-[376px]:text-[20px]
                max-[391px]:-mt-2 max-[391px]:text-[24px]
                max-[769px]:-mt-4
                max-[771px]:-mt-4
                max-[821px]:text-[24px]
                max-[824px]:text-[20px] 
                max-[854px]:mb-4
                max-[913px]:text-2xl max-[913px]:-mb-4
                max-[1025px]:text-[30px]
                max-[1281px]:text-[30px]
                max-[1311px]:w-[400px] max-[1311px]:text-[30px]
                max-[1367px]:w-[390px] max-[1367px]:text-[30px]
                max-[1441px]:w-[390px] max-[1441px]:text-[30px]
                max-[1513px]:w-[390px] max-[1513px]:text-[30px]
                max-[1537px]:w-[390px] max-[1537px]:text-[30px]
                max-[1539px]:w-[400px] max-[1539px]:text-[30px] max-[1539px]:-mt-2
                max-[1729px]:w-[400px] max-[1729px]:text-[30px] max-[1729px]:-mt-2
                max-[1901px]:w-[400px] max-[1901px]:text-[30px] max-[1901px]:-mt-2
                max-[1921px]:w-[380px] max-[1921px]:text-[30px] max-[1921px]:-mt-2
                max-[2049px]:w-[380px] max-[2049px]:text-[30px] max-[2049px]:-mt-2
                max-[2561px]:w-[380px] max-[2561px]:text-[30px] max-[2561px]:-mt-2
                max-[2851px]:w-[380px] max-[2851px]:text-[30px] max-[2851px]:-mt-2
                max-[3841px]:w-[380px] max-[3841px]:text-[30px] max-[3841px]:-mt-2
                text-title font-bold text-white text-md">
                  This page is restricted
                </h1>
                <h2 className="
                max-[345px]:-mt-2 max-[345px]:text-[14px] max-[345px]:w-[220px]
                max-[361px]:text-[16px] max-[361px]:-mt-2
                max-[376px]:mb-2 max-[376px]:-mt-5
                max-[415px]:-mt-5
                max-[431px]:-mt-5
                max-[541px]:-mt-3
                max-[769px]:-mt-6 max-[769px]:mb-4
                max-[771px]:-mt-6 max-[771px]:mb-2
                max-[821px]:w-[300px] max-[821px]:text-[18px]
                max-[824px]:text-[18px] max-[824px]:-mt-8 max-[824px]:mb-2
                max-[913px]:mt-2
                max-[1025px]:-mt-8 max-[1025px]:w-[400px]
                max-[1281px]:-mt-8 max-[1281px]:w-[400px]
                max-[1311px]:-mt-10
                max-[1367px]:text-[22px] max-[1367px]:-mt-8
                max-[1441px]:w-[390px] max-[1441px]:text-[22px] max-[1441px]:-mt-9 
                max-[1513px]:text-[22px] max-[1513px]:-mt-8
                max-[1537px]:w-[390px] max-[1537px]:text-[22px] max-[1537px]:-mt-8
                max-[1539px]:text-[22px] max-[1539px]:-mt-8
                max-[1729px]:text-[22px] max-[1729px]:-mt-8
                max-[1901px]:w-[390px] max-[1901px]:text-[22px] max-[1901px]:-mt-8
                max-[1921px]:w-[390px] max-[1921px]:text-[22px] max-[1921px]:-mt-8
                max-[2049px]:w-[390px] max-[2049px]:text-[22px] max-[2049px]:-mt-8
                max-[2561px]:w-[390px] max-[2561px]:text-[22px] max-[2561px]:-mt-8
                max-[2851px]:w-[390px] max-[2851px]:text-[22px] max-[2851px]:-mt-8
                max-[3841px]:w-[390px] max-[3841px]:text-[22px] max-[3841px]:-mt-8
                text-description text-white font-space-mono max-w-[90%] sm:max-w-[80%]">
                  {restrictionDescription}
                </h2>
              </div>
              <Link
                href="/"
                className="
                home-button
                max-[345px]:w-[90px] max-[345px]:mt-1
                max-[361px]:w-[85px] max-[361px]:mt-2
                max-[376px]:w-[120px] max-[376px]:mt-2
                max-[391px]:mt-2
                max-[541px]:mt-1
                max-[769px]:w-[140px]
                max-[854px]:mt-0
                max-[824px]:w-[100px]
                max-[913px]:w-[140px] max-[913px]:mt-4
                max-[1025px]:mt-2 max-[1025px]:w-[140px]
                max-[1281px]:w-[150px] max-[1281px]:mt-2
                max-[1311px]:w-[150px] max-[1311px]:mt-3
                max-[1367px]:w-[150px] max-[1367px]:mt-3
                max-[1441px]:w-[150px] max-[1441px]:mt-3
                max-[1513px]:w-[170px] max-[1513px]:mt-2
                max-[1537px]:w-[150px] max-[1537px]:mt-3
                max-[1539px]:w-[170px] max-[1539px]:mt-3
                max-[1729px]:w-[170px] max-[1729px]:mt-3
                max-[1901px]:w-[170px] max-[1901px]:mt-3
                max-[1921px]:w-[170px] max-[1921px]:mt-3
                max-[2049px]:w-[170px]
                max-[2561px]:w-[170px] max-[2561px]:mt-3
                max-[2851px]:w-[170px] max-[2851px]:mt-3
                max-[3841px]:w-[170px] max-[3841px]:mt-3
                all-button group flex 
                h-full "
              >
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
