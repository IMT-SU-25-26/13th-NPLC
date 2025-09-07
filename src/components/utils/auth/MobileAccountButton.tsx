import React from "react";
import Link from "next/link";
export default function MobileAccountButton() {
  return (
    <Link
      href="/account"
      className="cursor-target cursor-target text-2xl text-[#FCF551] font-bold group flex items-center justify-center w-full"
    >
      Account
    </Link>
  );
}
