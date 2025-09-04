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
    throw new Error("Failed to fetch registrations");
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
    throw new Error("Failed to fetch registration");
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
    throw new Error("Failed to update registration status");
  }
}
