"use client";
import React, { useState } from "react";
import Link from "next/link";
import AccountButton from "./auth/AccountButton";
import { useSession } from "@/lib/auth/auth_client";
import Image from "next/image";
import MobileAccountButton from "./auth/MobileAccountButton";
import TargetCursor from "./TargetCursor/TargetCursor";
export default function NavigationBar() {
  const {
    data: session,
    isPending, //loading state
  } = useSession();
  const isLoggedIn = !!session;
  const isLoading = isPending;

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <TargetCursor spinDuration={5} hideDefaultCursor={true} />
      <div className="pointer-events-none fixed z-[50] px-4 sm:px-8 bg-transparent md:px-12 flex w-screen h-[8vh] sm:h-[12vh] justify-between gap-2 sm:gap-4 items-center">
        <Link href="/">
          <Image
            src="/Logos/NPLCLogo.webp"
            className="pointer-events-auto cursor-target w-[4rem] sm:w-[4rem] md:w-[6rem] lg:w-[8rem] xl:w-[12rem]"
            alt="Logo"
            width={200}
            height={200}
          />
        </Link>

        {/* Hamburger Icon for Mobile */}
        <button
          className="sm:hidden pointer-events-auto z-[60]"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <Image
              src="/buttons/hamburger-open.svg"
              className="w-10 pointer-events-auto h-auto"
              alt="Logo"
              width={200}
              height={200}
            />
          ) : (
            <Image
              src="/buttons/hamburger-idle.svg"
              className="w-10 pointer-events-auto h-auto"
              alt="Logo"
              width={100}
              height={200}
            />
          )}
        </button>

        {/* Desktop Menu */}
        <div className="hidden sm:flex justify-end items-center gap-1 xs:gap-2 sm:gap-4">
          {/* Home Link */}
          <div className="flex w-fit">
            <Link className="cursor-target w-full pointer-events-auto flex items-center" href="/">
              <span className="relative group inline-block">
                {/* <svg
                width="100%"
                height="100%"
                viewBox="0 0 161 68"
                preserveAspectRatio="xMidYMid meet"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 sm:w-20 md:w-24 lg:w-[7rem] xl:w-[10rem]"
              >
                <foreignObject
                  x="-153.923"
                  y="-153.693"
                  width="468.665"
                  height="375.426"
                >
                  <div
                    style={{
                      backdropFilter: "blur(76.96px)",
                      WebkitBackdropFilter: "blur(76.96px)",
                      clipPath: "url(#bgblur_0_784_141_clip_path)",
                      height: "100%",
                      width: "100%",
                    }}
                  ></div>
                </foreignObject>
                <path
                  data-figma-bg-blur-radius="153.923"
                  d="M159.202 1.38428V19.3931L155.647 22.9478V48.0239L155.984 48.3618L159.664 52.0474V66.6558H15.7861L1.1543 52.0161V1.38428H159.202Z"
                  className="transition-colors duration-200 group-hover:fill-[#fcf551]"
                  fill="transparent"
                  stroke="#FCF551"
                  strokeWidth="2.30885"
                />
                <text
                  x="80"
                  y="38"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="currentColor"
                  fontSize="18"
                  fontWeight="500"
                  className="text-[#FCF551] text-xl sm:text-xl md:text-2xl group-hover:text-[#661108]"
                >
                  Home
                </text>
                <defs>
                  <clipPath
                    id="bgblur_0_784_141_clip_path"
                    transform="translate(153.923 153.693)"
                  >
                    <path d="M159.202 1.38428V19.3931L155.647 22.9478V48.0239L155.984 48.3618L159.664 52.0474V66.6558H15.7861L1.1543 52.0161V1.38428H159.202Z" />
                  </clipPath>
                </defs>
              </svg> */}
                <svg
                  width="161"
                  height="68"
                  viewBox="0 0 161 68"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 sm:w-20 md:w-24 lg:w-[7rem] xl:w-[10rem]"
                >
                  <path
                    d="M159.202 1.3844V19.3932L155.647 22.9479V48.024L155.984 48.3619L159.664 52.0475V66.6559H15.7861L1.1543 52.0162V1.3844H159.202Z"
                    fill="none"
                    fillOpacity="100"
                    stroke="#FCF551"
                    strokeWidth="2.30885"
                    className="transition-colors duration-200 group-hover:fill-[#fcf551]"
                  />
                  <foreignObject x="0" y="0" width="100%" height="100%">
                    <div
                      style={{
                        backdropFilter: "blur(76.96px)",
                        WebkitBackdropFilter: "blur(76.96px)",
                        clipPath: "url(#bgblur_0_784_141_clip_path)",
                      height: "100%",
                      width: "100%",
                    }}
                  ></div>
                </foreignObject>
                <path
                  data-figma-bg-blur-radius="153.923"
                  d="M159.202 1.38428V19.3931L155.647 22.9478V48.0239L155.984 48.3618L159.664 52.0474V66.6558H15.7861L1.1543 52.0161V1.38428H159.202Z"
                  className="transition-colors duration-200 group-hover:fill-[#fcf551]"
                  fill="transparent"
                  stroke="#FCF551"
                  strokeWidth="2.30885"
                />
                  <text
                    x="80"
                    y="38"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="currentColor"
                    fontSize="18"
                    fontWeight="500"
                    className="text-[#FCF551] text-xl sm:text-xl md:text-2xl group-hover:text-[#661108]"
                  >
                    Home
                  </text>
                   <defs>
                  <clipPath
                    id="bgblur_0_784_141_clip_path"
                  >
                    <path d="M159.202 1.38428V19.3931L155.647 22.9478V48.0239L155.984 48.3618L159.664 52.0474V66.6558H15.7861L1.1543 52.0161V1.38428H159.202Z" />
                  </clipPath>
                </defs>
                </svg>
              </span>
            </Link>
          </div>

          {/* Competition Link */}
          <div className="flex w-fit">
            <Link
              className="cursor-target pointer-events-auto w-full flex items-center"
              href="/competition-details"
            >
              <span className="relative group inline-block">
                <svg
                  width="240"
                  height="68"
                  viewBox="0 0 240 68"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-24 sm:w-32 md:w-40 xl:w-[15rem]"
                >
                  <path
                    d="M237.725 1.38439V19.2555L232.944 22.4684L232.434 22.8111V48.1608L232.943 48.5035L238.412 52.1852V66.6559H23.3789L1.40137 51.8785V1.38439H237.725Z"
                    fill="none"
                    fillOpacity="100"
                    stroke="#FCF551"
                    strokeWidth="2.30885"
                    className="transition-colors duration-200 group-hover:fill-[#fcf551] group-hover:fill-opacity-100"
                  />
                  <foreignObject x="0" y="0" width="100%" height="100%">
                    <div
                      style={{
                        backdropFilter: "blur(76.96px)",
                        clipPath: "url(#bgblur_0_784_144_clip_path)",
                        height: "100%",
                        width: "100%",
                      }}
                    ></div>
                  </foreignObject>
                  <path
                    d="M237.724 1.38428V19.2554L232.944 22.4683L232.433 22.811V48.1606L232.943 48.5034L238.412 52.1851V66.6558H23.3787L1.40112 51.8784V1.38428H237.724Z"
                    fill="transparent"
                    stroke="#FCF551"
                    strokeWidth="2.30885"
                    className="transition-colors duration-200 group-hover:fill-[#fcf551]"
                  />
                  <text
                    x="120"
                    y="38"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="currentColor"
                    fontSize="18"
                    fontWeight="500"
                    className="text-[#FCF551] text-xl sm:text-xl md:text-2xl group-hover:text-[#661108]"
                  >
                    Competition Details
                  </text>
                  <defs>
                    <clipPath id="bgblur_0_784_144_clip_path">
                      <path d="M237.724 1.38428V19.2554L232.944 22.4683L232.433 22.811V48.1606L232.943 48.5034L238.412 52.1851V66.6558H23.3787L1.40112 51.8784V1.38428H237.724Z" />
                    </clipPath>
                  </defs>
                </svg>

                {/* <svg
                width="100%"
                height="100%"
                viewBox="0 0 240 68"
                preserveAspectRatio="xMidYMid meet"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-24 sm:w-32 md:w-40 xl:w-[15rem]"
              >
                <foreignObject
                  x="-153.676"
                  y="-153.693"
                  width="547.166"
                  height="375.426"
                >
                  <div
                    style={{
                      backdropFilter: "blur(76.96px)",
                      clipPath: "url(#bgblur_0_784_144_clip_path)",
                      height: "100%",
                      width: "100%",
                    }}
                  ></div>
                </foreignObject>
                <path
                  data-figma-bg-blur-radius="153.923"
                  d="M237.724 1.38428V19.2554L232.944 22.4683L232.433 22.811V48.1606L232.943 48.5034L238.412 52.1851V66.6558H23.3787L1.40112 51.8784V1.38428H237.724Z"
                  fill="transparent"
                  stroke="#FCF551"
                  strokeWidth="2.30885"
                  className="transition-colors duration-200 group-hover:fill-[#fcf551]"
                />
                <text
                  x="120"
                  y="38"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="currentColor"
                  fontSize="18"
                  fontWeight="500"
                  className="text-[#FCF551] text-xl sm:text-xl md:text-2xl group-hover:text-[#661108]"
                >
                  Competition
                </text>
                <defs>
                  <clipPath
                    id="bgblur_0_784_144_clip_path"
                    transform="translate(153.676 153.693)"
                  >
                    <path d="M237.724 1.38428V19.2554L232.944 22.4683L232.433 22.811V48.1606L232.943 48.5034L238.412 52.1851V66.6558H23.3787L1.40112 51.8784V1.38428H237.724Z" />
                  </clipPath>
                </defs>
              </svg> */}
              </span>
            </Link>
          </div>
          {isLoading ? (
            <div
              className="cursor-target pointer-events-auto animate-pulse bg-[#FCF551]/40 w-16 sm:w-20 md:w-24 lg:w-[7rem] xl:w-[10rem] h-8 sm:h-8 md:h-12 lg:h-[2rem] xl:h-[4rem] motion-reduce:animate-none"
              style={{
                animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              }}
            ></div>
          ) : (
            <div className="">
              {/* Auth Button */}
              <div className="w-fit">
                {!isLoggedIn ? (
                  <Link
                    href="/login"
                    className="cursor-target pointer-events-auto group flex items-center justify-center w-full"
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
                      <path d="M5.17285 50.248L4.83496 49.9092L1.15527 46.2227V23.6738L5.45703 19.3721L5.7959 19.0342V1.15527H163.766V17.5391L160.472 20.833L160.133 21.1709V48.2637L163.997 52.1279V66.4248H5.17285V50.248Z" fill="#3D3D3D" fillOpacity="0.31" stroke="#FCF551" strokeWidth="2.31"/>
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
                        Login
                      </text>
                       <defs>
                      <clipPath id="bgblur_0_1190_15_clip_path"><path d="M5.17285 50.248L4.83496 49.9092L1.15527 46.2227V23.6738L5.45703 19.3721L5.7959 19.0342V1.15527H163.766V17.5391L160.472 20.833L160.133 21.1709V48.2637L163.997 52.1279V66.4248H5.17285V50.248Z"/>
                      </clipPath></defs>
                    </svg>
                  </Link>
                ) : (
                  <div className="">
                    <AccountButton />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="z-[55] fixed top-0 left-0 w-full h-full bg-[#090A1E]/95 flex flex-col items-center justify-center gap-8 sm:hidden transition-all">
            <Link href="/" onClick={() => setMenuOpen(false)}>
              <span className="text-2xl pointer-events-auto text-[#FCF551] font-bold">Home</span>
            </Link>
            <Link
              href="/competition-details"
              onClick={() => setMenuOpen(false)}
            >
              <span className="text-2xl pointer-events-auto text-[#FCF551] font-bold">
                My Competitions
              </span>
            </Link>
            {!isLoggedIn ? (
              <Link href="/login" onClick={() => setMenuOpen(false)}>
                <span className="text-2xl pointer-events-auto text-[#FCF551] font-bold">Login</span>
              </Link>
            ) : (
               <Link href="/account" onClick={() => setMenuOpen(false)}>
                <span className="text-2xl pointer-events-auto text-[#FCF551] font-bold">Account</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  );
}
