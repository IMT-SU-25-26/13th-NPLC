"use server";

import prisma from "./prisma";
// import { revalidatePath } from "next/cache";
// import { ActionResult } from "@/types/action";
import { Competition } from "@/types/competition";

export async function getCompetitions(): Promise<Competition[]> {
  return await prisma.competition.findMany({
    orderBy: { id: "desc" },
  });
}

export async function getCompetitionById(
  id: string
): Promise<Competition | null> {
  return await prisma.competition.findUnique({
    where: { id },
  });
}

export async function getRegistrationIdByCompetitionAndUser(
  competitionId: string,
  userId: string
) {
  try {
    const registration = await prisma.competitionRegistration.findMany({
      where: {
        competition_id: competitionId,
        user_id: userId,
      },
      select: {
        id: true,
      },
    });
    return registration.length > 0 ? registration[0].id : null;
  } catch (error) {
    console.error("Error fetching registration ID:", error);
    throw error;
  }
}

export async function updateRegistrationMidtransToken(
  registrationId: string,
  mid_token: string
) {
  try {
    await prisma.competitionRegistration.update({
      where: { id: registrationId },
      data: {
        registration_midtrans_token: mid_token,
        registration_status: "pending",
      },
    });
  } catch (error) {
    console.error("Error updating registration Midtrans token:", error);
    throw error;
  }
}

export async function updateIsPaid(registrationId: string, is_paid: boolean) {
  if (is_paid) {
    try {
      await prisma.competitionRegistration.update({
        where: { id: registrationId },
        data: { is_paid: is_paid, registration_status: "accepted" },
      });
    } catch (error) {
      console.error("Error updating is_paid:", error);
      throw error;
    }
  } else {
    try {
      await prisma.competitionRegistration.update({
        where: { id: registrationId },
        data: { is_paid: is_paid, registration_status: "failed" },
      });
    } catch (error) {
      console.error("Error updating is_paid:", error);
      throw error;
    }
  }
}

export async function cancelRegistration(registrationId: string) {
  try {
    await prisma.competitionRegistration.deleteMany({
      where: { id: registrationId },
    });
  } catch (error) {
    console.error("Error canceling registration:", error);
    throw error;
  }
}
