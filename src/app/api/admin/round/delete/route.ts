import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/auth';
import { checkRoleAccess } from '@/lib/user';
import prisma from '@/lib/prisma';

export async function DELETE(req: NextRequest) {
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

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Round ID is required" },
        { status: 400 }
      );
    }

    // Check if there are any submissions for this round
    const submissions = await prisma.aIPromptSubmission.findMany({
      where: { round_id: id }
    });

    if (submissions.length > 0) {
      return NextResponse.json(
        { success: false, error: "Cannot delete round with existing submissions" },
        { status: 400 }
      );
    }

    await prisma.aIRound.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Round deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting round:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete round" },
      { status: 500 }
    );
  }
}