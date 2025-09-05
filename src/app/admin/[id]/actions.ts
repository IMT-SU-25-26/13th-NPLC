"use server";

import { updateRegistrationStatus } from "@/lib/admin";
import { revalidatePath } from "next/cache";

export async function updateRegistrationStatusAction(
  team_name: string,
  competition_id: string,
  status: "pending" | "accepted" | "failed"
) {
  try {
    const result = await updateRegistrationStatus(team_name, competition_id, status);
    revalidatePath("/admin");
    revalidatePath(`/admin/${competition_id}`);
    return result;
  } catch {
    throw new Error("Failed to update registration status");
  }
}
