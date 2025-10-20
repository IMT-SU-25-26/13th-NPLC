import React from 'react'
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { checkRoleAccess } from "@/lib/user";
import Restrictions from "@/components/utils/Restrictions";
import { getAllBPSubmissions } from '@/lib/competition';
import { User } from 'better-auth';
import Link from 'next/link';

// Tambahkan tipe Submission untuk mengganti `any`
type Submission = {
  id?: string;
  user: User;
  team_name?: string;
  proposal?: string;
  surat_pernyataan_orisinalitas?: string;
  figma_link?: string;
  submittedAt?: string | Date | null;
};

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

  const submissionsRaw = await getAllBPSubmissions('cmegpbi5m0001hke9buhvhrw4');

  // Normalize result (support both array or { success, data } shapes)
  const submissions: Submission[] =
    Array.isArray(submissionsRaw)
      ? (submissionsRaw as Submission[])
      : ((submissionsRaw?.data ?? submissionsRaw ?? []) as Submission[]);

  if (!submissions || submissions.length === 0) {
    return (
      <div className='min-h-screen w-screen overflow-hidden flex flex-col justify-center items-center bg-[#090A1E]'>
        <div className='pt-[7vh]'></div>
        <h1 className='text-5xl md:text-9xl text-white'>No Submissions Yet!</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-start p-8 bg-[#090A1E] overflow-x-auto">
      <div className='pt-[10vh]'></div>
      <div className="max-w-[95%] w-full">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#FCF551]">
            <thead className="bg-[#000000] border-1 border-[#FCF551] rounded-2xl">
              <tr>
                <th className="px-4 py-3 text-center text-sm font-medium text-[#FCF551]">Team</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-[#FCF551]">User</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-[#FCF551]">Figma</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-[#FCF551]">Proposal</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-[#FCF551]">Surat</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-[#FCF551]">Submitted At</th>
              </tr>
            </thead>

            <tbody className="bg-[#18182a]/80 divide-y divide-[#FCF551]/10 border-1 border-[#FCF551] rounded-2xl">
              {submissions.map((s: Submission) => {
                const submittedAt = s.submittedAt ? new Date(s.submittedAt).toLocaleString() : "-";
                const teamName = s.team_name || "-";
                const proposalUrl = s.proposal || "";
                const suratUrl = s.surat_pernyataan_orisinalitas || "";
                const figma = s.figma_link || "";

                return (
                  <tr key={s.id ?? `${s.user.id}_${teamName}`}>
                    <td className="px-4 py-3 align-middle text-center text-sm text-[#75E8F0] [text-shadow:_0_0_20px_rgba(117,232,240,1)]">{teamName}</td>
                    <td className="px-4 py-3 align-middle text-center text-sm text-[#75E8F0] [text-shadow:_0_0_20px_rgba(117,232,240,1)]">{s.user.name ?? "??"}</td>

                    {/* FIGMA */}
                    <td className="px-4 py-3 align-middle text-center text-sm">
                      {figma ? (
                        <Link
                          href={figma}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Open Figma"
                          className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-md border border-[#FCF551] text-[#FCF551] hover:bg-[#FCF551] hover:text-[#090A1E] transition-colors"
                        >
                          <span className="text-sm">Open Figma</span>
                        </Link>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>

                    {/* PROPOSAL */}
                    <td className="px-4 py-3 align-middle text-center text-sm">
                      {proposalUrl ? (
                        <Link
                          href={proposalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View Proposal (PDF)"
                          className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-md border border-[#FCF551] text-[#FCF551] hover:bg-[#FCF551] hover:text-[#090A1E] transition-colors"
                        >
                          <span className="text-sm">View Proposal</span>
                        </Link>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>

                    {/* SURAT */}
                    <td className="px-4 py-3 align-middle text-center text-sm">
                      {suratUrl ? (
                        <Link
                          href={suratUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View Surat Pernyataan"
                          className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-md border border-[#FCF551] text-[#FCF551] hover:bg-[#FCF551] hover:text-[#090A1E] transition-colors"
                        >
                          <span className="text-sm">View Surat</span>
                        </Link>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>

                    <td className="px-4 py-3 align-middle text-center text-sm text-[#75E8F0] [text-shadow:_0_0_20px_rgba(117,232,240,1)]">{submittedAt}</td>
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
