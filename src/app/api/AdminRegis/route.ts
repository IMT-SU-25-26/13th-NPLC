import { NextRequest, NextResponse } from 'next/server';
import {
  getAllCompetitionRegistrations,
  getAllAIRegistrations,
  getAllBPRegistrations,
  getAllProgrammingRegistrations,
  getAllTypeRacerRegistrations
} from '@/lib/admin';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const competition = searchParams.get('competition');

    let result;
    
    switch (competition) {
      case "Programming":
        result = await getAllProgrammingRegistrations();
        break;
      case "Business Plan":
        result = await getAllBPRegistrations();
        break;
      case "AI Prompt":
        result = await getAllAIRegistrations();
        break;
      case "Typeracer":
        result = await getAllTypeRacerRegistrations();
        break;
      default:
        result = await getAllCompetitionRegistrations();
        break;
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return NextResponse.json(
      { success: false, data: null, errorMessage: "Failed to fetch registrations" },
      { status: 500 }
    );
  }
}