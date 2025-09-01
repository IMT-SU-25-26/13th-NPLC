"use server";

import { updateRegistrationStatus } from "@/lib/admin";
import { revalidatePath } from "next/cache";

export async function updateRegistrationStatusAction(
  id: string,
  status: "pending" | "accepted" | "failed"
) {
  try {
    const result = await updateRegistrationStatus(id, status);
    revalidatePath("/admin");
    revalidatePath(`/admin/${id}`);
    return result;
  } catch {
    throw new Error("Failed to update registration status");
  }
}
