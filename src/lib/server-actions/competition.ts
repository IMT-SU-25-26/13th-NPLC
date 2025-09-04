// src/lib/server-actions.ts
"use server";

import { registerForACompetition as registerServerSide } from "@/lib/user";
import { z } from "zod";

// Define validation schema
const registrationSchema = z.object({
  success: z.boolean(),
  errorMessage: z.string().optional(),
});

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
    for (let i = 1; i <= 3; i++) {
      const name = formData.get(`fullname${i}`) as string;
      const nisn = formData.get(`nisn${i}`) as string;
      
      if (name && nisn) {
        newFormData.append("fullname", name);
        newFormData.append("nisn", nisn);
      }
    }
    
    const result = await registerServerSide({}, newFormData, competitionId);
    
    // Validate result using Zod
    const validatedResult = registrationSchema.safeParse(result);
    
    if (!validatedResult.success || (validatedResult.data && !validatedResult.data.success)) {
      return {
        success: false,
        errorMessage: validatedResult.success 
          ? validatedResult.data.errorMessage || "Registration failed" 
          : "Invalid registration response"
      };
    }
    
    // 3. Return success response
    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { 
      success: false, 
      errorMessage: error instanceof Error ? error.message : "An unexpected error occurred" 
    };
  }
}
