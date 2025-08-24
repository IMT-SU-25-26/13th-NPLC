import React from "react";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import RegistrationDetail from "@/components/competition/RegistrationDetail";
import prisma from "@/lib/prisma"; // or wherever your PrismaClient is exported

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
    // include: { competition: true }, // if you want competition details
  });


  return (
    <div className="min-h-screen w-screen overflow-hidden flex flex-col items-center justify-center bg-gradient-to-b from-[#111114] to-[#090A1E] p-4">
      <h1 className="text-2xl font-bold mb-4">Your Registrations</h1>
      {registrations.length === 0 ? (
        <div>No registrations found.</div>
      ) : (
        <div className="flex flex-col gap-4">
          {registrations.map((reg) => (
            <RegistrationDetail key={reg.id} registrationStatus={reg.registration_status} registration_id={reg.id} token={reg.registration_midtrans_token ?? ""} />
          ))}
        </div>
      )}
    </div>
  );
}