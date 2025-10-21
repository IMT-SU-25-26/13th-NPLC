"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { aiPromptAdminSubmission } from '@/types/competition';
import { toast } from 'sonner';

interface ContentProps {
  submissions: aiPromptAdminSubmission[];
  rounds: {
    id: string;
    round: number;
    batch: number;
    status: string;
  }[];
}

export default function Content({ submissions, rounds }: ContentProps) {
  const [isAdvancing, setIsAdvancing] = useState<Record<string, boolean>>({});
  const [selectedRounds, setSelectedRounds] = useState<Record<string, string>>({});

  const handleSelectRound = (userId: string, roundId: string) => {
    setSelectedRounds(prev => ({ ...prev, [userId]: roundId }));
  };

  const advanceUser = async (userId: string) => {
    if (!selectedRounds[userId]) {
      toast.error("Please select a round first");
      return;
    }

    setIsAdvancing(prev => ({ ...prev, [userId]: true }));
    
    try {
      const response = await fetch('/api/admin/advance-user-from-table', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId, 
          nextRoundId: selectedRounds[userId]
        })
      });

      const result = await response.json();
      
      if (result.success) {
        toast.success(`User advanced to Round ${
          rounds.find(r => r.id === selectedRounds[userId])?.round
        } (Batch ${
          rounds.find(r => r.id === selectedRounds[userId])?.batch
        })`);
      } else {
        toast.error(result.error || "Failed to advance user");
      }
    } catch (error) {
      toast.error("An error occurred while advancing user");
      console.error(error);
    } finally {
      setIsAdvancing(prev => ({ ...prev, [userId]: false }));
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="max-w-[95%] w-full">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#FCF551]">
            <thead className="bg-[#000000] border-1 border-[#FCF551] rounded-2xl">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#FCF551]">Team</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#FCF551]">User</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#FCF551]">AI Chat Link</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#FCF551]">Submitted At</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#FCF551]">Advance User</th>
              </tr>
            </thead>
            <tbody className="bg-[#18182a]/80 divide-y divide-[#FCF551]/10 border-1 border-[#FCF551] rounded-2xl">
              {submissions.map((item) => {
                const submittedAt = item.submittedAt 
                  ? new Date(item.submittedAt).toLocaleString() 
                  : "-";
                
                return (
                  <tr key={item.id}>
                    <td className="px-4 py-3 text-left text-sm text-[#75E8F0] [text-shadow:_0_0_20px_rgba(117,232,240,1)]">
                      {item.team_name || "-"}
                    </td>
                    <td className="px-4 py-3 text-left text-sm text-[#75E8F0] [text-shadow:_0_0_20px_rgba(117,232,240,1)]">
                      <Link href={`/admin/submission/ai/user/${item.user.id}`}>
                        {item.user.name || "Unknown"}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-left text-sm text-[#75E8F0] [text-shadow:_0_0_20px_rgba(117,232,240,1)]">
                      {item.ai_chat_link ? (
                        <Link href={item.ai_chat_link} target="_blank" rel="noopener noreferrer" className="underline">
                          View AI Chat
                        </Link>
                      ) : "-"}
                    </td>
                    <td className="px-4 py-3 text-left text-sm text-[#75E8F0] [text-shadow:_0_0_20px_rgba(117,232,240,1)]">
                      {submittedAt}
                    </td>
                    <td className="px-4 py-3 text-left text-sm">
                      <div className="flex items-center space-x-2">
                        <select 
                          className="px-2 py-1 bg-[#18182a] border border-[#FCF551] rounded text-[#75E8F0] text-sm"
                          onChange={(e) => handleSelectRound(item.user.id, e.target.value)}
                          value={selectedRounds[item.user.id] || ""}
                        >
                          <option value="">Select round</option>
                          {rounds.map(round => (
                            <option key={round.id} value={round.id}>
                              Round {round.round} (Batch {round.batch})
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => advanceUser(item.user.id)}
                          disabled={isAdvancing[item.user.id] || !selectedRounds[item.user.id]}
                          className={`px-2 py-1 rounded text-xs font-medium 
                            ${isAdvancing[item.user.id] || !selectedRounds[item.user.id] 
                              ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                              : 'bg-green-600 text-white hover:bg-green-700'}`}
                        >
                          {isAdvancing[item.user.id] ? 'Processing...' : 'Advance'}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
