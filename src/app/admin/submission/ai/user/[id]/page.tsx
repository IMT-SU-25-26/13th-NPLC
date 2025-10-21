import React from 'react'
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { checkRoleAccess } from "@/lib/user";
import Restrictions from "@/components/utils/Restrictions";
import Link from 'next/link';
import prisma from '@/lib/prisma';
import AdvanceUserButton from './AdvanceUserButton';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function page({ params }: PageProps) {
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

  const userId = await params.id;

  // Get user details
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  // Get user AI submissions
  const submissions = await prisma.aIPromptSubmission.findMany({
    where: { user_id: userId },
    orderBy: { submittedAt: 'desc' },
    include: {
      round: true,
    },
  });

  // Define the available rounds from your seed data
  const availableRounds = [
    {
      id: "round1-batch1",
      round: 1,
      batch: 1,
      status: "not_started" 
    },
    {
      id: "round1-batch2",
      round: 1,
      batch: 2,
      status: "not_started"
    },
    {
      id: "round2-batch1",
      round: 2,
      batch: 1,
      status: "not_started"
    },
    {
      id: "round3-batch1",
      round: 3,
      batch: 1,
      status: "not_started"
    },
    {
      id: "round4-batch1",
      round: 4,
      batch: 1,
      status: "not_started"
    }
  ];
  
  // Try to get the current status of rounds from the database
  let roundsWithStatus = [];
  try {
    const dbRounds = await prisma.aIRound.findMany();
    
    // Merge the status information with our predefined rounds
    roundsWithStatus = availableRounds.map(round => {
      const dbRound = dbRounds.find(r => r.id === round.id);
      return {
        ...round,
        status: dbRound?.status || "not_started"
      };
    });
  } catch (error) {
    console.error("Error fetching rounds:", error);
    // If there's an error, just use the rounds with default status
    roundsWithStatus = availableRounds;
  }
  
  // Find current active round (if any)
  const currentRound = roundsWithStatus.find(round => round.status === "ongoing");

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
      <div className="max-w-4xl w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#75E8F0] [text-shadow:_0_0_15px_rgba(117,232,240,0.8)]">
            Advance User to Next Round
          </h1>
          <Link
            href="/admin/submission/ai"
            className="px-4 py-2 rounded-lg bg-[#18182a]/80 border-2 border-[#FCF551] text-[#FCF551] hover:bg-[#FCF551]/20 transition-colors"
          >
            Back to Submissions
          </Link>
        </div>

        {/* User Info */}
        <div className="mb-8 p-6 bg-[#18182a]/80 border-2 border-[#FCF551] rounded-lg">
          <h2 className="text-xl font-semibold text-[#FCF551] mb-4">User Information</h2>
          {user ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Name</p>
                <p className="text-white">{user.name}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <p className="text-white">{user.email}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">NISN</p>
                <p className="text-white">{user.nomor_induk_siswa_nasional || 'Not provided'}</p>
              </div>
            </div>
          ) : (
            <p className="text-red-400">User not found</p>
          )}
        </div>

        {/* Submission Info */}
        <div className="mb-8 p-6 bg-[#18182a]/80 border-2 border-[#FCF551] rounded-lg">
          <h2 className="text-xl font-semibold text-[#FCF551] mb-4">Submission Detail</h2>
          
          {submissions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#FCF551]/10">
                    <th className="px-4 py-2 text-left text-[#FCF551]">Round</th>
                    <th className="px-4 py-2 text-left text-[#FCF551]">Batch</th>
                    <th className="px-4 py-2 text-left text-[#FCF551]">Submission Link</th>
                    <th className="px-4 py-2 text-left text-[#FCF551]">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((sub) => (
                    <tr key={sub.id} className="border-t border-[#FCF551]/10">
                      <td className="px-4 py-3 text-[#75E8F0]">{sub.round.round || 'Unknown'}</td>
                      <td className="px-4 py-3 text-[#75E8F0]">{sub.round.batch || 'Unknown'}</td>
                      <td className="px-4 py-3">
                        <a 
                          href={sub.ai_chat_link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[#FCF551] hover:underline"
                        >
                          View Submission
                        </a>
                      </td>
                      <td className="px-4 py-3 text-white">
                        {sub.submittedAt 
                          ? new Date(sub.submittedAt).toLocaleString() 
                          : 'Unknown date'
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-yellow-400">No AI submissions found for this user</p>
          )}
        </div>

        {/* Advance User Section */}
        <div className="p-6 bg-[#18182a]/80 border-2 border-[#FCF551] rounded-lg">
          <h2 className="text-xl font-semibold text-[#FCF551] mb-4">Advance User</h2>
          
          {currentRound ? (
            <div className="space-y-4">
              <p className="text-white">
                Current active round: <span className="text-[#75E8F0]">Round {currentRound.round} (Batch {currentRound.batch})</span>
              </p>
              <AdvanceUserButton 
                userId={userId} 
                availableRounds={roundsWithStatus}
              />
            </div>
          ) : (
            <p className="text-yellow-400">No active round is currently running</p>
          )}
        </div>
      </div>
    </div>
  );
}
