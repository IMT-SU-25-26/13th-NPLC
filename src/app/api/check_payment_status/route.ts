// File: app/api/registration-status/route.ts

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Mengambil competitionId dari URL query
    const { searchParams } = new URL(request.url);
    const competitionId = searchParams.get("competitionId");
    const team_name = searchParams.get("t_name") as string; // Ambil userId dari query

    if (!competitionId) {
      return new NextResponse("Competition ID is required", { status: 400 });
    }

    // Mencari pendaftaran di database berdasarkan userId dari sesi dan competitionId
    const registration = await prisma.competitionRegistration.findFirst({
      where: {
        team_name: team_name,
        competition_id: competitionId,
      },
      orderBy: {
        createdAt: "desc", // Ambil pendaftaran yang paling baru jika ada lebih dari satu
      },
    });

    // Jika tidak ditemukan, artinya pengguna belum mendaftar
    if (!registration) {
      return NextResponse.json({ status: "NOT_REGISTERED" });
    }

    // Jika sudah lunas, kirim status 'PAID'
    if (registration.is_paid) {
      return NextResponse.json({ status: "PAID" });
    }

    // Logika untuk mengecek kedaluwarsa (tetap sama)
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    // Membandingkan tanggal pendaftaran dengan tanggal 7 hari yang lalu
    if (registration.createdAt < twentyFourHoursAgo) {
      return NextResponse.json({ status: "EXPIRED" });
    }

    // Jika belum kedaluwarsa dan belum lunas, statusnya 'PENDING'
    return NextResponse.json({ status: "PENDING" });

  } catch (error) {
    console.error("Failed to get registration status:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}