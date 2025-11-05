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

    return { success: true, data: registrations };
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return {
      success: false,
      errorMessage: "Error fetching registrations",
      data: null,
    };
  }
}

export async function getAllProgrammingRegistrations() {
  try {
    const registrations = await prisma.competitionRegistration.findMany({
      where: {
        competition_id: "cmegpb4cl0000hke9j8b2vg3f",
      },
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

    return { success: true, data: registrations };
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return {
      success: false,
      errorMessage: "Error fetching registrations",
      data: null,
    };
  }
}

export async function getAllBPRegistrations() {
  try {
    const registrations = await prisma.competitionRegistration.findMany({
      where: {
        competition_id: "cmegpbi5m0001hke9buhvhrw4",
      },
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

    return { success: true, data: registrations };
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return {
      success: false,
      errorMessage: "Error fetching registrations",
      data: null,
    };
  }
}

export async function getAllAIRegistrations() {
  try {
    const registrations = await prisma.competitionRegistration.findMany({
      where: {
        competition_id: "cmegpc6sx0002hke9gxo7hd6u",
      },
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

    return { success: true, data: registrations };
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return {
      success: false,
      errorMessage: "Error fetching registrations",
      data: null,
    };
  }
}

export async function getAllTypeRacerRegistrations() {
  try {
    const registrations = await prisma.competitionRegistration.findMany({
      where: {
        competition_id: "cmegpd01h0003hke91ea54m7c",
      },
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

    return { success: true, data: registrations };
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return {
      success: false,
      errorMessage: "Error fetching registrations",
      data: null,
    };
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

    return { success: true, data: registration };
  } catch (error) {
    console.error("Error fetching registration:", error);
    return {
      success: false,
      errorMessage: "Error fetching registration",
      data: null,
    };
  }
}

export async function updateRegistrationStatus(
  team_name: string,
  competition_id: string,
  status: "pending" | "accepted" | "failed"
) {
  try {
    const updatedRegistration = await prisma.competitionRegistration.updateMany(
      {
        where: { team_name, competition_id },
        data: {
          registration_status: status,
        },
      }
    );

    return updatedRegistration;
  } catch (error) {
    console.error("Error updating registration status:", error);
    return {
      success: false,
      errorMessage: "Error updating registration status",
      data: null,
    };
  }
}

export async function getAllAvailableAIRound() {
  await prisma.aIRound.findMany({
    orderBy: {
      round: "asc",
    },
  });
}

export async function getCurrentRound() {
  await prisma.aIRound.findFirst({
    where:{
      status: "ongoing"
    }
  });
}

export async function getAIRoundSubmission(currentRound: string) {
  await prisma.aIPromptSubmission.findMany({
    where: {
      round_id: currentRound,
    },
  });
}

export async function changeAIRoundStatus(
  roundId: string,
  newStatus: "not_started" | "ongoing" | "finished"
) {
  try {
    // First, check if the round exists
    const roundExists = await prisma.aIRound.findUnique({
      where: { id: roundId }
    });

    if (!roundExists) {
      return {
        success: false,
        errorMessage: `Round with ID ${roundId} not found`,
        data: null,
      };
    }

    // If setting to ongoing, finish all other ongoing rounds first
    if (newStatus === "ongoing") {
      await prisma.aIRound.updateMany({
        where: { status: "ongoing" },
        data: {
          status: "finished",
        },
      });
    }

    // Update the selected round
    const updatedRound = await prisma.aIRound.update({
      where: { id: roundId },
      data: {
        status: newStatus,
      },
    });

    return { success: true, data: updatedRound };
  } catch (error) {
    console.error("Error updating AI Round status:", error);
    return {
      success: false,
      errorMessage: "Error updating AI Round status",
      data: null,
    };
  }
}

export async function advanceUserToNextAIRound(
  userId: string,
  nextRoundId: string
) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        current_ai_round_id: nextRoundId,
      },
    });

    return { success: true, data: updatedUser };
  } catch (error) {
    console.error("Error advancing user to next AI Round:", error);
    return {
      success: false,
      errorMessage: "Error advancing user to next AI Round",
      data: null,
    };
  }
}
