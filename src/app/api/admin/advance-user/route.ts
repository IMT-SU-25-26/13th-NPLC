import { NextRequest, NextResponse } from "next/server";
import { advanceUserToNextAIRound } from "@/lib/admin";
import { auth } from "@/lib/auth/auth";
import { checkRoleAccess } from "@/lib/user";

export async function POST(request: NextRequest) {
  try {
    // Check auth - pass the request headers
    const session = await auth.api.getSession({
      headers: request.headers
    });
    
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, errorMessage: "Not authenticated" }, { status: 401 });
    }

    // Check if admin
    const hasAccess = await checkRoleAccess(session.user.id, "admin");
    if (!hasAccess) {
      return NextResponse.json({ success: false, errorMessage: "Not authorized" }, { status: 403 });
    }

    // Get body data
    const body = await request.json();
    const { userId, roundId } = body;

    if (!userId || !roundId) {
      return NextResponse.json(
        { success: false, errorMessage: "Missing userId or roundId" },
        { status: 400 }
      );
    }

    // Call the admin function to advance the user
    const result = await advanceUserToNextAIRound(userId, roundId);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error advancing user:", error);
    return NextResponse.json(
      { success: false, errorMessage: "Failed to advance user" },
      { status: 500 }
    );
  }
}