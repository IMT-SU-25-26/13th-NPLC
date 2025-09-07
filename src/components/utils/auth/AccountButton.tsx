import React from "react";
import Link from "next/link";

export default function AccountButton() {

  return (
    <Link
        href="/account"
      className={`cursor-target pointer-events-auto h-auto cursor-target group flex items-center justify-center`}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 166 68"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 sm:w-20 md:w-24 lg:w-[7rem] xl:w-[10rem]"
      >
        <foreignObject x="0" y="0" width="100%" height="100%">
          <div
            style={{
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              clipPath: "url(#bgblur_0_1190_15_clip_path)",
              height: "100%",
              width: "100%",
            }}
          ></div>
        </foreignObject>
        <path
          d="M5.48892 0.230103V18.7855L0.848145 23.4263V46.9303L4.86554 50.9554V67.81H166V51.879L162.136 48.0155V21.8794L165.769 18.2468V0.230103H5.48892Z"
          fill="transparent"
          stroke="#FCF551"
          strokeWidth="2.30885"
          className="transition-colors duration-200 group-hover:fill-[#fcf551]"
        />
        <text
          x="83"
          y="34"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="currentColor"
          fontSize="18"
          fontWeight="500"
          className="text-[#FCF551] text-xl sm:text-xl md:text-2xl group-hover:text-[#661108]"
        >
            Account
        </text>
        <defs>
          <clipPath id="bgblur_0_1190_15_clip_path">
            <path d="M5.17285 50.248L4.83496 49.9092L1.15527 46.2227V23.6738L5.45703 19.3721L5.7959 19.0342V1.15527H163.766V17.5391L160.472 20.833L160.133 21.1709V48.2637L163.997 52.1279V66.4248H5.17285V50.248Z" />
          </clipPath>
        </defs>
      </svg>
    </Link>
  );
}
