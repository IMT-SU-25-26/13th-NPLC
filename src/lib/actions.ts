"use server";

import { APIError } from "better-auth/api";
import { auth } from "./auth/auth";
import { redirect } from "next/navigation";
import { updateNisn, updateUserRole } from "./user";
import { State } from "@/types/form";
import { PrismaClient } from "@prisma/client";

export async function signUp(prevState: State, formData: FormData) {
  const prisma = new PrismaClient();
  const rawFormData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    fullname: formData.get("fullname") as string,
    nisn: formData.get("nisn") as string,
  };

  const { email, password, fullname, nisn } = rawFormData;

  if(password.length < 6){
    return { errorMessage: "Password must be at least 6 characters long" };
  }

  const existingUser = await prisma.user.findUnique({
    where: { nomor_induk_siswa_nasional: nisn },
  });

  if (existingUser) {
    return { errorMessage: "User already exists"};
  }

  try {
    // Signup user
    const result = await auth.api.signUpEmail({
      body: {
        name: `${fullname}`,
        email: `${email}`,
        password: `${password}`,
      },
    });

    // Ambil userId dari result (pastikan result mengandung userId)
    const user_id = result?.user?.id;
    const user_email = result?.user?.email;
    if (user_email) {
      if(user_email === "bfernando@student.ciputra.ac.id" || user_email === "ozuriel01@student.ciputra.ac.id"){
        updateUserRole(user_id, "admin");
      }
      
      if (nisn) {
        await updateNisn(user_id, nisn);
      }
      return { success: true, redirect: "/" };
    }
  } catch (error) {
    console.log(error)
    if (error instanceof APIError) {
      switch (error.status) {
        case "UNPROCESSABLE_ENTITY":
          return { errorMessage: "User already exists!", success: false };
        case "BAD_REQUEST":
          return { errorMessage: "Invalid Email", success: false };
        default:
          return { errorMessage: "Something went wrong", success: false };
      }
    }
    console.error("Error signing up:", error);

  }
  redirect("/");
}

export async function signIn(prevState: State, formData: FormData) {
  const rawFormData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { email, password} = rawFormData;

  try {
    // Signup user
    await auth.api.signInEmail({
      body: {
        email: `${email}`,
        password: `${password}`,
      },
    });
    return { success: true, redirect: "/" };
  } catch (error) {
    // Cek apakah ini sinyal redirect, jika iya, biarkan Next.js menanganinya
    if (error instanceof APIError) {
      switch (error.status) {
        case "UNAUTHORIZED":
          console.error("Invalid email or password");
          return { errorMessage: "Invalid email or password" };
        case "BAD_REQUEST":
          console.error("Invalid Email");
          return { errorMessage: "Invalid Email" };
        default:
          console.error("Something went wrong");
          return { errorMessage: "Something went wrong" };
      }
    }

    const errorMsg = error instanceof Error ? error.message : "Error signing in";
    if (errorMsg.includes("User not found") || 
        (typeof error === 'object' && error && 'message' in error && 
         String(error.message).includes("User not found"))) {
      return { errorMessage: "User not found" };
    }
    
    // Generic error
    console.error("Error signing in:", error);
    return { errorMessage: "Error signing in due to connection issues. Please try again." };
  }
}
