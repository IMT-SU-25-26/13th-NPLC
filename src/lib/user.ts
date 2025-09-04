import { PrismaClient, Roles } from "@prisma/client";
import { State } from "@/types/form";

const prisma = new PrismaClient();

export async function updateNisn(userId: string, nisn: string) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { nomor_induk_siswa_nasional: nisn },
  });
  return user;
}

export async function updateUserRole(userId: string, role: Roles) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { role: role },
  });
  return user;
}

export async function updateName(userId: string, name: string) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { name },
  });
  return user;
}

export async function getUserByNISN(nisn: string) {
  const user = await prisma.user.findUnique({
    where: { nomor_induk_siswa_nasional: nisn },
  });
  return user;
}

export async function registerForACompetition(
  prevState: State,
  formData: FormData,
  competition_id: string
) {
  const rawFormData = {
    fullname: formData.getAll("fullname") as string[],
    nisn: formData.getAll("nisn") as string[],
    link_twiboon: formData.get("link_twiboon") as string,
    school_name: formData.get("school_name") as string,
    contact_person_number: formData.get("contact_person_number") as string,
    team_name: formData.get("team_name") as string,
    imageUrl: formData.get("imageUrl") as string,
    imagePublicId: formData.get("imagePublicId") as string,
  };

  const {
    fullname: fullnames,
    nisn: nisns,
    link_twiboon,
    school_name,
    contact_person_number,
    team_name,
    imageUrl,
    imagePublicId,
  } = rawFormData;

  const trimmedFullnames = (rawFormData.fullname as string[]).map((name) => name.replace(/\s/g, ''));
  const trimmedNisns = (rawFormData.nisn as string[]).map((nisn) => nisn.replace(/\s/g, ''));

  // Normalize inputs to arrays
  const nisnArr = Array.isArray(trimmedNisns) ? trimmedNisns : [trimmedNisns];
  const fullnameArr = Array.isArray(trimmedFullnames) ? trimmedFullnames : [trimmedFullnames];

  // Cek semua user dan validasi sebelum update
  const users = await Promise.all(
    nisnArr.map((nisnItem) =>
      prisma.user.findUnique({
        where: { nomor_induk_siswa_nasional: nisnItem },
      })
    )
  );

  const is_team_name_exists = await prisma.competitionRegistration.findFirst({
    where: { team_name: team_name, competition_id: competition_id },
  });

  if (is_team_name_exists) {
    return {
      errorMessage: `Team name ${team_name} is already taken!`,
      success: false,
    };
  }

  for (let i = 0; i < users.length; i++) {
    const user = users[i];

    if (!user) {
      return {
        errorMessage: `User with NISN ${nisnArr[i]} haven't made an account in the website`,
        success: false,
      };
    }

    if (user.name !== "null") {
      if (user.name !== fullnameArr[i]) {
        return {
          errorMessage: `Fullname for NISN ${nisnArr[i]} does not match`,
          success: false,
        };
      }
    }
    const isRegisteredForTheSameCompetition =
      await prisma.competitionRegistration.findFirst({
        where: { user_id: user.id, competition_id: competition_id },
      });
    const isRegisteredForCP = await prisma.competitionRegistration.findFirst({
      where: { user_id: user.id, competition_id: "cmegpb4cl0000hke9j8b2vg3f" },
    });

    if (isRegisteredForCP) {
      return {
        errorMessage: `User with NISN ${nisnArr[i]} is already registered for a competitive programming`,
        success: false,
      };
    }

    if (isRegisteredForTheSameCompetition) {
      return {
        errorMessage: `User with NISN ${nisnArr[i]} is already registered for this competition`,
        success: false,
      };
    }

    if (competition_id === "cmegpb4cl0000hke9j8b2vg3f") {
      const isAlreadyRegisteredForOtherCompetition =
        await prisma.competitionRegistration.findFirst({
          where: { user_id: user.id, competition_id: { not: competition_id } },
        });

      if (isAlreadyRegisteredForOtherCompetition) {
        return {
          errorMessage: `User with NISN ${nisnArr[i]} is already registered for another competition, If you want to register for competitive programming, you have to not be registered at any other competition!`,
          success: false,
        };
      }
    }
  }

  // Registration logic should be outside the loop
  try {
    await Promise.all(
      nisnArr.map((nisnItem) =>
        prisma.user.update({
          where: { nomor_induk_siswa_nasional: nisnItem },
          data: {
            role: "participant",
          },
        })
      )
    );

    await Promise.all(
      nisnArr.map((nisnItem, index) => {
        const user = users[index];
        if (!user) {
          return { success: false, errorMessage: `User with NISN ${nisnItem} not found during registration` };
        }

        return prisma.competitionRegistration.create({
          data: {
            user_id: user.id,
            competition_id: competition_id,
            team_name: team_name,
            school_name: school_name,
            link_twiboon: link_twiboon,
            contact_person_number: contact_person_number,
            imageUrl: imageUrl,
            imagePublicId: imagePublicId,
          },
        });
      })
    );

    return { success: true };
  } catch (error) {
    console.error("Error updating users:", error);
    return {
      errorMessage:
        error instanceof Error ? error.message : "An unexpected error occurred",
      success: false,
    };
  }
}

export async function checkCompetitionPageAccess(
  userId: string,
  competitionId: string
) {
  const competitionRegistrationData = await prisma.competitionRegistration.findFirst({
    where: { user_id: userId, competition_id: competitionId },
  });

  return competitionRegistrationData;
}

export async function checkRoleAccess(userId: string, acceptedRole: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  return user?.role === acceptedRole;
}