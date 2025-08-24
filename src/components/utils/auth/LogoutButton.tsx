"use client";
import React from "react";
import { signOut } from "@/lib/auth/auth_client";
import { useState } from "react";

export default function AuthButtonClient() {
  const [pending, setPending] = useState(false);
  const handleLogout = async () => {
    setPending(true);
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          setPending(false);
          window.location.href = "/";
        },
      },
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="cursor-target cursor-target group flex items-center justify-center w-full"
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
        <path
          data-figma-bg-blur-radius="153.923"
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
          {`${pending ? "Pending" : "Logout"}`}
        </text>
      </svg>
    </button>
  );
}
