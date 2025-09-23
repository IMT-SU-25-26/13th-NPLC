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
    return {
      success: false,
      errorMessage: "Error fetching registration ID",
      data: null,
    };
  }
}

// export async function updateRegistrationMidtransToken(
//   team_name: string,
//   competition_id: string,
//   mid_token: string
// ) {
//   try {
//     await prisma.competitionRegistration.updateMany({
//       where: { team_name: team_name, competition_id: competition_id },
//       data: {
//         registration_midtrans_token: mid_token,
//         registration_status: "pending",
//       },
//     });
//   } catch (error) {
//     console.error("Error updating registration Midtrans token:", error);
//     throw error;
//   }
// }
export async function getRegistrationDetailById(registration_id: string) {
  try {
    const registration = await prisma.competitionRegistration.findUnique({
      where: { id: registration_id },
    });
    return { success: true, data: registration };
  } catch (error) {
    console.error("Error fetching registration detail:", error);
    return {
      success: false,
      errorMessage: "Error fetching registration detail",
      data: null,
    };
  }
}
export async function getRegistrationStatus(
  competition_id: string,
  team_name: string
) {
  try {
    const registration = await prisma.competitionRegistration.findFirst({
      where: {
        competition_id: competition_id,
        team_name: team_name,
      },
      select: {
        registration_status: true,
      },
    });
    return registration ? registration.registration_status : null;
  } catch (error) {
    console.error("Error fetching registration status:", error);
    return {
      success: false,
      errorMessage: "Error fetching registration status",
      data: null,
    };
  }
}

export async function updatePaymentProof(
  competition_id: string,
  team_name: string,
  payment_proof: string
) {
  try {
    await prisma.competitionRegistration.updateMany({
      where: { team_name: team_name, competition_id: competition_id },
      data: { imageUrl: payment_proof, registration_status: "pending" },
    });
  } catch (error) {
    console.error("Error updating payment proof:", error);
    return {
      success: false,
      errorMessage: "Error updating payment proof",
      data: null,
    };
  }
}

export async function updateIsPaid(
  competition_id: string,
  team_name: string,
  is_paid: boolean
) {
  if (is_paid) {
    try {
      await prisma.competitionRegistration.updateMany({
        where: { team_name: team_name, competition_id: competition_id },
        data: { registration_status: "accepted" },
      });
    } catch (error) {
      console.error("Error updating is_paid:", error);
      return {
        success: false,
        errorMessage: "Error updating is_paid",
        data: null,
      };
    }
  } else {
    try {
      await prisma.competitionRegistration.updateMany({
        where: { team_name: team_name, competition_id: competition_id },
        data: { registration_status: "failed" },
      });
    } catch (error) {
      console.error("Error updating is_paid:", error);
      return {
        success: false,
        errorMessage: "Error updating is_paid",
        data: null,
      };
    }
  }
}

export async function cancelRegistration(
  competition_id: string,
  team_name: string
) {
  try {
    await prisma.competitionRegistration.deleteMany({
      where: { competition_id: competition_id, team_name: team_name },
    });
  } catch (error) {
    console.error("Error canceling registration:", error);
    return {
      success: false,
      errorMessage: "Error canceling registration",
      data: null,
    };
  }
}

export async function submitAIPrompt(
  user_id: string,
  team_name: string,
  competition_id: string,
  ai_chat_link: string
) {
  try {
    await prisma.aIPromptSubmission.create({
      data: {
        user_id,
        team_name,
        competition_id,
        ai_chat_link,
        submittedAt: new Date(),
      },
    });
  } catch (error) {
    console.error("Error submitting AI Prompt:", error);
    return {
      success: false,
      errorMessage: "Error submitting AI Prompt",
      data: null,
    };
  }
}

export async function submitBusinessPlan(user_id: string, team_name: string, competition_id: string, proposal: string, surat_pernyataan_orisinalitas: string, figma_link: string) {
  try {
    await prisma.businessPlanSubmission.create({
      data: {
        user_id,
        team_name,
        competition_id,
        proposal,
        surat_pernyataan_orisinalitas,
        figma_link,
        submittedAt: new Date(),
      },
    });
  } catch (error) {
    console.error("Error submitting Business Plan:", error);
    return {
      success: false,
      errorMessage: "Error submitting Business Plan",
      data: null,
    };
  }

}
