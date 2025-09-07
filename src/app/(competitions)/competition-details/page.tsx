import React from "react";
import prisma from "@/lib/prisma";
import "@/styles/competition-detail.css";
import Restrictions from "@/components/utils/Restrictions";
import { Team } from "@/types/competition";
import CompetitionDetail from "@/components/competition/CompetitionDetail";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

export default async function Page() {
  // Get current session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return (
      <Restrictions restrictionDescription="You are not logged in into an account!"  />
    );
  }

  // 1. Dapatkan semua pendaftaran untuk pengguna saat ini
  const currentUserRegistrations = await prisma.competitionRegistration.findMany({
    where: { user_id: session.user.id },
  });

  // 2. Untuk setiap pendaftaran, cari semua anggota tim
  // Kita menggunakan Promise.all untuk menjalankan semua kueri secara paralel agar lebih cepat
  const userTeams: Team[] = await Promise.all(
    currentUserRegistrations.map(async (registration): Promise<Team> => { // Tambahkan tipe return di sini
      const teamMembers = await prisma.competitionRegistration.findMany({
        where: {
          competition_id: registration.competition_id,
          team_name: registration.team_name,
        },
        include: {
          user: {
            select: {
              id: true, // [cite: 4]
              name: true, // [cite: 7]
              nomor_induk_siswa_nasional: true, // [cite: 7]
            },
          },
        },
      });

      return {
        competition_id: registration.competition_id,
        team_name: registration.team_name,
        school_name: registration.school_name,
        members: teamMembers,
      };
    })
  );
  return (
    <div className="overflow-hidden">
      {/* 4. Tambahkan pengecekan di sini */}
      {userTeams.length > 0 ? (
        // Jika ada tim, tampilkan datanya
        <CompetitionDetail teams={userTeams} />
      ) : (
        // Jika tidak ada tim, tampilkan pesan
        <Restrictions restrictionDescription="  Register to a competition to view this page!" />
      )}
    </div>
  );
}