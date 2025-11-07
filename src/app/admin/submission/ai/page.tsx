import React from 'react'
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { checkRoleAccess } from "@/lib/user";
import Restrictions from "@/components/utils/Restrictions";
import prisma from "@/lib/prisma";
import Link from 'next/link';
import { aiPromptAdminSubmission } from '@/types/competition';
import Content from './Content';

export default async function page({
  searchParams
}: {
  searchParams: { round?: string } 
}) {
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

  // Get all available rounds
  const rounds = await prisma.aIRound.findMany({
    orderBy: {
      round: 'asc',
    },
  });

  // Fix: Need to await the searchParams
  const params = await searchParams;
  const selectedRound = params.round || (rounds.length > 0 ? rounds[0].id : '');
  
  // Get submissions for the selected round
  const submissionsResult = selectedRound ? 
    await prisma.aIPromptSubmission.findMany({
      where: { 
        round_id: selectedRound,
        competition_id: "cmegpc6sx0002hke9gxo7hd6u" 
      },
      include: { user: true },
    }) : [];

  // Convert to the expected format
  const submissions: aiPromptAdminSubmission[] = submissionsResult.map(sub => ({
    id: sub.id,
    user: sub.user,
    team_name: sub.team_name,
    ai_chat_link: sub.ai_chat_link,
    trial_and_error_link: sub.trial_and_error_link,
    submittedAt: sub.submittedAt
  }));

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-start p-8 bg-[#090A1E] overflow-x-auto">
      <div className='pt-[10vh]'></div>
      <div className="w-[100%] mb-4">
        <Link
          href="/admin"
          className="px-4 py-2 rounded-lg bg-[#18182a]/80 border-2 border-[#FCF551] text-[#FCF551] hover:bg-[#FCF551]/20 transition-colors"
        >
          Back to Admin
        </Link>
      </div>
      {/* Round Selector */}
      <div className="w-full flex flex-col justify-start items-start mb-8">
        <h2 className="text-[#FCF551] text-xl font-semibold mb-4">Select Round</h2>
        <div className="flex flex-wrap gap-3">
          {rounds.map((round) => (
            <Link
              key={round.id}
              href={`/admin/submission/ai?round=${round.id}`}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                selectedRound === round.id
                  ? "bg-[#FCF551] text-[#090A1E] shadow-lg"
                  : "bg-[#18182a]/80 border-2 border-[#FCF551] text-[#FCF551] hover:bg-[#FCF551]/20"
              }`}
            >
              Round {round.round} (Batch {round.batch})
              {round.status === "ongoing" && (
                <span className="ml-2 inline-block px-2 py-0.5 text-xs bg-green-500 text-white rounded-full">
                  Active
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* No Submissions Message */}
      {(!submissions || submissions.length === 0) ? (
        <div className='flex flex-col justify-start items-start w-full mt-12'>
          <h1 className='text-3xl md:text-5xl text-white mb-4'>No Submissions Yet!</h1>
          <p className='text-[#75E8F0] text-lg'>
            {selectedRound ? 'No submissions found for this round.' : 'Please select a round to view submissions.'}
          </p>
        </div>
      ) : (
        <Content submissions={submissions} rounds={rounds} />
      )}
    </div>
  );
}
