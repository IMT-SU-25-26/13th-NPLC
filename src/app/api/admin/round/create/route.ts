import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/auth';
import { checkRoleAccess } from '@/lib/user';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers
    });
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    const hasAccess = await checkRoleAccess(session.user.id, "admin");
    if (!hasAccess) {
      return NextResponse.json(
        { success: false, error: "Not authorized" },
        { status: 403 }
      );
    }

    const { round, batch, question_link, status } = await req.json();

    if (!round || !batch) {
      return NextResponse.json(
        { success: false, error: "Round and batch are required" },
        { status: 400 }
      );
    }

    // Check if round already exists
    const existingRound = await prisma.aIRound.findFirst({
      where: {
        round: round,
        batch: batch,
      }
    });

    if (existingRound) {
      return NextResponse.json(
        { success: false, error: "Round with this number and batch already exists" },
        { status: 400 }
      );
    }

    const newRound = await prisma.aIRound.create({
      data: {
        round,
        batch,
        question_link: question_link || null,
        status: status || 'not_started',
      },
    });

    return NextResponse.json({
      success: true,
      data: newRound
    });
  } catch (error) {
    console.error("Error creating round:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create round" },
      { status: 500 }
    );
  }
}