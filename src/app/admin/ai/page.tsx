import React from "react";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { checkRoleAccess } from "@/lib/user";
import Restrictions from "@/components/utils/Restrictions";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { changeAIRoundStatus } from "@/lib/admin";
import { revalidatePath } from "next/cache";
import RoundStatusManager from "./RoundStatusManager";

// Fix the issue by making sure the page is rendered as a Server Component
export default async function Page() {
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

  // Define the available rounds from your seed data
  const availableRounds = [
    {
      id: "round1-batch1",
      round: 1,
      batch: 1,
    },
    {
      id: "round1-batch2",
      round: 1,
      batch: 2,
    },
    {
      id: "round2-batch1",
      round: 2,
      batch: 1,
    },
    {
      id: "round3-batch1",
      round: 3,
      batch: 1,
    },
    {
      id: "round4-batch1",
      round: 4,
      batch: 1,
    },
  ];

  // Try to get the current status of rounds from the database
  interface Round {
    id: string;
    round: number;
    batch: number;
    status: "not_started" | "ongoing" | "finished";
  }

  let roundsWithStatus: Round[] = [];
  try {
    const dbRounds = await prisma.aIRound.findMany();

    // Merge the status information with our predefined rounds
    roundsWithStatus = availableRounds.map((round) => {
      const dbRound = dbRounds.find((r) => r.id === round.id);
      return {
        ...round,
        status:
          (dbRound?.status as "not_started" | "ongoing" | "finished") ||
          "not_started",
      };
    });
  } catch (error) {
    console.error("Error fetching rounds:", error);
    // If there's an error, just use the rounds with default status
    roundsWithStatus = availableRounds.map((round) => ({
      ...round,
      status: "not_started" as const,
    }));
  }

  // Find current active round (if any)
  const activeRound = roundsWithStatus.find(
    (round) => round.status === "ongoing"
  );

  // Server action to change round status
  async function changeRoundStatus(formData: FormData) {
    "use server";

    const roundId = formData.get("roundId") as string;
    const newStatus = formData.get("newStatus") as
      | "not_started"
      | "ongoing"
      | "finished";

    if (!roundId || !newStatus) {
      return { success: false, error: "Missing required fields" };
    }

    try {
      await changeAIRoundStatus(roundId, newStatus);
      revalidatePath("/admin/ai");
      return { success: true };
    } catch (error) {
      console.error("Error changing round status:", error);
      return { success: false, error: "Failed to change round status" };
    }
  }

  return (
    <div className="min-h-screen w-screen flex gap-4 flex-col items-center justify-start p-8 bg-[#090A1E] overflow-x-auto">
      <div className="pt-[10vh]"></div>
      <div className="w-[95%] mb-4">
        <Link
          href="/admin"
          className="px-4 py-2 rounded-lg bg-[#18182a]/80 border-2 border-[#FCF551] text-[#FCF551] hover:bg-[#FCF551]/20 transition-colors"
        >
          Back to Admin
        </Link>
      </div>
      <div className="w-[95%]">
        <div className="flex items-center mb-8">
          <h1 className="text-3xl font-bold text-[#75E8F0] [text-shadow:_0_0_15px_rgba(117,232,240,0.8)]">
            AI Prompt Round Management
          </h1>
        </div>

        {/* Current Round Status */}
        <div className="mb-8 p-6 bg-[#18182a]/80 border-2 border-[#FCF551] rounded-lg">
          <h2 className="text-xl font-semibold text-[#FCF551] mb-4">
            Current Status
          </h2>
          {activeRound ? (
            <div className="flex items-center gap-3">
              <span className="text-white text-lg">
                <span className="text-[#75E8F0]">
                  Round {activeRound.round} (Batch {activeRound.batch})
                </span>{" "}
                is currently active
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            </div>
          ) : (
            <div className="text-yellow-400">No round is currently active</div>
          )}
        </div>

        {/* Round Management */}
        <div className="bg-[#18182a]/80 border-2 border-[#FCF551] rounded-lg p-6">
          <h2 className="text-xl font-semibold text-[#FCF551] mb-4">
            Round Management
          </h2>
          <RoundStatusManager
            rounds={roundsWithStatus}
            changeRoundStatus={changeRoundStatus}
          />
        </div>
      </div>
    </div>
  );
}
