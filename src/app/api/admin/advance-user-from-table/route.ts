import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/auth';
import { checkRoleAccess } from '@/lib/user';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    // Verify admin authentication - passing headers is critical
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

    // Extract user ID and next round ID from request
    const { userId, nextRoundId } = await req.json();

    if (!userId || !nextRoundId) {
      return NextResponse.json(
        { success: false, error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Update the user's current round
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { current_ai_round_id: nextRoundId },
    });

    return NextResponse.json({
      success: true,
      data: {
        id: updatedUser.id,
        name: updatedUser.name,
        current_ai_round_id: updatedUser.current_ai_round_id
      }
    });
  } catch (error) {
    console.error("Error advancing user:", error);
    return NextResponse.json(
      { success: false, error: "Failed to advance user" },
      { status: 500 }
    );
  }
}