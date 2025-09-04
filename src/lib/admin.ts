import prisma from "@/lib/prisma";

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

    return registrations;
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return { success: false, errorMessage: "Error fetching registrations", data: null };
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

    return registration;
  } catch (error) {
    console.error("Error fetching registration:", error);
    return { success: false, errorMessage: "Error fetching registration", data: null };
  }
}

export async function updateRegistrationStatus(
  id: string,
  status: "pending" | "accepted" | "failed"
) {
  try {
    const updatedRegistration = await prisma.competitionRegistration.update({
      where: { id },
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
