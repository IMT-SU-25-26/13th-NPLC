import React from 'react'
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { checkRoleAccess } from "@/lib/user";
import Restrictions from "@/components/utils/Restrictions";
import prisma from "@/lib/prisma";
import Link from "next/link";
import RoundManager from './RoundManager';

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return (
      <Restrictions restrictionDescription="You must be logged in to view this page." />
    );
  }

  const hasAccess = await checkRoleAccess(session.user.id, "admin");
  if (!hasAccess) {
    return (
      <Restrictions restrictionDescription="You do not have permission to view this page." />
    );
  }

  // Fetch all rounds
  const rounds = await prisma.aIRound.findMany({
    orderBy: {
      round: 'asc',
    },
  });

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-start p-8 bg-[#090A1E] overflow-x-auto">
      <div className='pt-[10vh]'></div>
      <div className="w-[95%] mb-4">
        <Link
          href="/admin"
          className="px-4 py-2 rounded-lg bg-[#18182a]/80 border-2 border-[#FCF551] text-[#FCF551] hover:bg-[#FCF551]/20 transition-colors"
        >
          Back to Admin
        </Link>
      </div>
      
      <div className="w-[95%] max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#75E8F0] [text-shadow:_0_0_15px_rgba(117,232,240,0.8)]">
            AI Round Management
          </h1>
        </div>

        <RoundManager initialRounds={rounds} />
      </div>
    </div>
  );
}