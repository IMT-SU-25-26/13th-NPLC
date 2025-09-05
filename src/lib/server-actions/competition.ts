// src/lib/server-actions.ts
"use server";

import { registerForACompetition as registerServerSide } from "@/lib/user";
export async function registerForCompetition(formData: FormData, competitionId: string) {
  try {
    // Convert form fields from fullname1, nisn1 format to arrays
    const newFormData = new FormData();
    
    // Copy regular fields
    newFormData.append("team_name", formData.get("team_name") as string);
    newFormData.append("school_name", formData.get("school_name") as string);
    newFormData.append("contact_person_number", formData.get("contact_person_number") as string);
    newFormData.append("link_twiboon", formData.get("link_twiboon") as string);
    
    // Copy image fields
    const imageUrl = formData.get("imageUrl") as string;
    const imagePublicId = formData.get("imagePublicId") as string;
    if (imageUrl) newFormData.append("imageUrl", imageUrl);
    if (imagePublicId) newFormData.append("imagePublicId", imagePublicId);
    
    // Handle numbered fields
    for (let i = 1; i <= 4; i++) {
      const name = formData.get(`fullname${i}`) as string;
      const nisn = formData.get(`nisn${i}`) as string;
      
      if (name && nisn) {
        newFormData.append("fullname", name);
        newFormData.append("nisn", nisn);
      }
    }
    
    const result =  await registerServerSide({}, newFormData, competitionId);
    if (!result || !result.success) {
      return { success:false,  errorMessage: result?.errorMessage || "Registration failed" };
    }
    // 3. Kembalikan token ke client (PLAIN OBJECT, not NextResponse)
    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { success:false,  errorMessage: error || "Registration failed" };
  }
}