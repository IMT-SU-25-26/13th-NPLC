import prisma from "@/lib/prisma";
import { success } from "better-auth";

export async function getAllCompetitionRegistrations() {
  try {
    const registrations = await prisma.competitionRegistration.findMany({
      include: {
        competition: {
          select: {
            name: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {success: true, data:registrations};
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return { success: false, errorMessage: "Error fetching registrations"};
  }
}

export async function getCompetitionRegistrationById(id: string) {
  try {
    const registration = await prisma.competitionRegistration.findUnique({
      where: { id },
      include: {
        competition: {
          select: {
            name: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
            nomor_induk_siswa_nasional: true,
          },
        },
      },
    });

    return {success: true, data: registration};
  } catch (error) {
    console.error("Error fetching registration:", error);
    return { success: false, errorMessage: "Error fetching registration", data: null };
  }
}

export async function updateRegistrationStatus(
  team_name: string,
  competition_id: string,
  status: "pending" | "accepted" | "failed"
) {
  try {
    const updatedRegistration = await prisma.competitionRegistration.updateMany({
      where: { team_name, competition_id },
      data: {
        registration_status: status,
      },
    });

    return updatedRegistration;
  } catch (error) {
    console.error("Error updating registration status:", error);
    return { success: false, errorMessage: "Error updating registration status", data: null };
  }
}
