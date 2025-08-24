import React from "react";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
// import RegistrationDetail from "@/components/competition/RegistrationDetail";
import prisma from "@/lib/prisma"; // or wherever your PrismaClient is exported
import "@/styles/home.css"
// import Image from "next/image";
// import TabButtonContainer from "@/components/utils/TabButtonContainer";

export default async function Page() {
  // Get current session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return <div className="min-h-screen w-screen flex items-center justify-center">Not logged in</div>;
  }

  // Fetch all registrations for this user
  const registrations = await prisma.competitionRegistration.findMany({
    where: { user_id: session.user.id },
    include: { competition: true }, // if you want competition details
  });


  // Generate stars on client side only to avoid hydration mismatch
  
  // Initialize starsRef.current as an arra

  return (
    <div className="overflow-hidden">
      <div className="min-h-screen w-screen overflow-hidden bg-gradient-to-b from-[#111114] to-[#090A1E]">
       </div>
    </div>
  );
}