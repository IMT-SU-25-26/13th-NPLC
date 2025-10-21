'use client'
import React from "react";
import { aiPromptAdminSubmission } from "@/types/competition";
import Link from "next/link";


export default function Content({ submissions }: { submissions: aiPromptAdminSubmission[] }) {
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
                      {item.user?.name || "-"}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-center text-sm">
                      {item.ai_chat_link ? (
                        <Link
                          href={item.ai_chat_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Open AI Chat"
                          className="inline-flex w-full items-center justify-start"
                        >
                          <span className="text-sm gap-2 px-3 py-1 rounded-md border border-[#FCF551] text-[#FCF551] hover:bg-[#FCF551] hover:text-[#090A1E] transition-colors">Open AI Chat</span>
                        </Link>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 align-middle text-left text-sm text-[#75E8F0] [text-shadow:_0_0_20px_rgba(117,232,240,1)]">
                      {submittedAt}
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
