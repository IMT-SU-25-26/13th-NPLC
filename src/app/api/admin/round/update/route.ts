import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/auth';
import { checkRoleAccess } from '@/lib/user';
import prisma from '@/lib/prisma';

export async function PUT(req: NextRequest) {
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

    const { id, round, batch, question_link, status } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Round ID is required" },
        { status: 400 }
      );
    }

    const updatedRound = await prisma.aIRound.update({
      where: { id },
      data: {
        round,
        batch,
        question_link: question_link || null,
        status,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedRound
    });
  } catch (error) {
    console.error("Error updating round:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update round" },
      { status: 500 }
    );
  }
}