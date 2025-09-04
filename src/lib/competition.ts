"use server";

import prisma from "./prisma";
import { z } from "zod";

// Define response schemas
const competitionSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    max_participants: z.number(),
    registration_fee: z.number(),
    // Add other fields as needed
  })
  .array();

const singleCompetitionSchema = competitionSchema.element.nullable();

const registrationIdSchema = z.object({
  id: z.string(),
}).nullable();

const registrationStatusSchema = z
  .enum(["pending", "accepted", "failed"])
  .nullable();

const operationResultSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  data: z.any().optional(),
});

export async function getCompetitions(): Promise<
  z.infer<typeof operationResultSchema>
> {
  try {
    const competitions = await prisma.competition.findMany({
      orderBy: { id: "desc" },
    });

    const validationResult = competitionSchema.safeParse(competitions);

    if (!validationResult.success) {
      return {
        success: false,
        message: "Invalid competition data format",
      };
    }

    return {
      success: true,
      data: validationResult.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch competitions",
    };
  }
}

export async function getCompetitionById(
  id: string
): Promise<z.infer<typeof operationResultSchema>> {
  try {
    const competition = await prisma.competition.findUnique({
      where: { id },
    });

    const validationResult = singleCompetitionSchema.safeParse(competition);

    if (!validationResult.success) {
      return {
        success: false,
        message: "Invalid competition data format",
      };
    }

    return {
      success: true,
      data: validationResult.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to fetch competition",
    };
  }
}

export async function getRegistrationIdByCompetitionAndUser(
  competitionId: string,
  userId: string
): Promise<z.infer<typeof operationResultSchema>> {
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

    const result = registration.length > 0 ? registration[0] : null;
    const validationResult = registrationIdSchema.safeParse(result);

    if (!validationResult.success) {
      return {
        success: false,
        message: "Invalid registration data format",
      };
    }

    return {
      success: true,
      data: validationResult.data?.id || null,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to fetch registration ID",
    };
  }
}

export async function getRegistrationStatus(
  competition_id: string,
  team_name: string
): Promise<z.infer<typeof operationResultSchema>> {
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

    const validationResult = registrationStatusSchema.safeParse(
      registration ? registration.registration_status : null
    );

    if (!validationResult.success) {
      return {
        success: false,
        message: "Invalid registration status format",
      };
    }

    return {
      success: true,
      data: validationResult.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to fetch registration status",
    };
  }
}

export async function updatePaymentProof(
  competition_id: string,
  team_name: string,
  payment_proof: string
): Promise<z.infer<typeof operationResultSchema>> {
  try {
    // Input validation
    const inputSchema = z.object({
      competition_id: z.string().min(1, "Competition ID is required"),
      team_name: z.string().min(1, "Team name is required"),
      payment_proof: z.string().min(1, "Payment proof is required"),
    });

    const validationResult = inputSchema.safeParse({
      competition_id,
      team_name,
      payment_proof,
    });

    if (!validationResult.success) {
      return {
        success: false,
        message: validationResult.error.issues[0].message,
      };
    }

    await prisma.competitionRegistration.updateMany({
      where: { team_name: team_name, competition_id: competition_id },
      data: { imageUrl: payment_proof, registration_status: "pending" },
    });

    return {
      success: true,
      message: "Payment proof updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update payment proof",
    };
  }
}

export async function updateIsPaid(
  competition_id: string,
  team_name: string,
  is_paid: boolean
): Promise<z.infer<typeof operationResultSchema>> {
  try {
    // Input validation
    const inputSchema = z.object({
      competition_id: z.string().min(1, "Competition ID is required"),
      team_name: z.string().min(1, "Team name is required"),
      is_paid: z.boolean(),
    });

    const validationResult = inputSchema.safeParse({
      competition_id,
      team_name,
      is_paid,
    });

    if (!validationResult.success) {
      return {
        success: false,
        message: validationResult.error.issues[0].message,
      };
    }

    const status = is_paid ? "accepted" : "failed";

    await prisma.competitionRegistration.updateMany({
      where: { team_name: team_name, competition_id: competition_id },
      data: { registration_status: status },
    });

    return {
      success: true,
      message: `Registration marked as ${status}`,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update payment status",
    };
  }
}

export async function cancelRegistration(
  competition_id: string,
  user_id: string
): Promise<z.infer<typeof operationResultSchema>> {
  try {
    // Input validation
    const inputSchema = z.object({
      competition_id: z.string().min(1, "Competition ID is required"),
      user_id: z.string().min(1, "User ID is required"),
    });

    const validationResult = inputSchema.safeParse({
      competition_id,
      user_id,
    });

    if (!validationResult.success) {
      return {
        success: false,
        message: validationResult.error.issues[0].message,
      };
    }

    await prisma.competitionRegistration.deleteMany({
      where: { competition_id: competition_id, user_id: user_id },
    });

    return {
      success: true,
      message: "Registration canceled successfully",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to cancel registration",
    };
  }
}

