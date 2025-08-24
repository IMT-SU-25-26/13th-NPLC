"use client";
import React from "react";
import { signOut } from "@/lib/auth/auth_client";
import { useState } from "react";

export default function MobileAuthButtonClient() {
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
      className="cursor-target cursor-target text-2xl text-[#FCF551] font-bold group flex items-center justify-center w-full"
    >
      {pending ? "Pending..." : "Logout"}
    </button>
  );
}
