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
  // Trim and remove spaces from email, password, fullname, and nisn
  const trimmedEmail = email.replace(/\s+/g, "");
  const trimmedPassword = password.replace(/\s+/g, "");
  const trimmedFullname = fullname.replace(/\s+/g, "");
  const trimmedNisn = nisn.replace(/\s+/g, "");

  if (trimmedPassword.length < 6) {
    return { errorMessage: "Password must be at least 6 characters long" };
  }

  const existingUser = await prisma.user.findUnique({
    where: { nomor_induk_siswa_nasional: trimmedNisn },
  });

  if (existingUser) {
    return { errorMessage: "User already exists" };
  }

  try {
    // Signup user
    const result = await auth.api.signUpEmail({
      body: {
        name: `${trimmedFullname}`,
        email: `${trimmedEmail}`,
        password: `${trimmedPassword}`,
      },
    });

    // Ambil userId dari result (pastikan result mengandung userId)
    const user_id = result?.user?.id;
    const user_email = result?.user?.email;
    if (user_email) {
      if (
        user_email === "bfernando@student.ciputra.ac.id" ||
        user_email === "ozuriel01@student.ciputra.ac.id"
      ) {
        updateUserRole(user_id, "admin");
      }

      if (nisn) {
        await updateNisn(user_id, nisn);
      }
      return { success: true, redirect: "/" };
    }
  } catch (error) {
    console.log(error);
    if (error instanceof APIError) {
      switch (error.status) {
        case "UNPROCESSABLE_ENTITY":
          return {
            errorMessage:
              "User already with the same email or fullname or NISN already exist!",
            success: false,
          };
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

  const { email, password } = rawFormData;
  const trimmedEmail = email.replace(/\s+/g, "");
  const trimmedPassword = password.replace(/\s+/g, "");

  try {
    // Signup user
    await auth.api.signInEmail({
      body: {
        email: `${trimmedEmail}`,
        password: `${trimmedPassword}`,
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

    const errorMsg =
      error instanceof Error ? error.message : "Error signing in";
    if (
      errorMsg.includes("User not found") ||
      (typeof error === "object" &&
        error &&
        "message" in error &&
        String(error.message).includes("User not found"))
    ) {
      return { errorMessage: "User not found" };
    }

    // Generic error
    console.error("Error signing in:", error);
    return {
      errorMessage:
        "Error signing in due to connection issues. Please try again.",
    };
  }
}

export async function forgetPassword(prevState: State, formData: FormData) {
  const rawFormData = {
    email: formData.get("email") as string,
  };

  const { email } = rawFormData;
  const trimmedEmail = email.replace(/\s+/g, "");

  // Add validation logging
  console.log("Original email:", email);
  console.log("Trimmed email:", trimmedEmail);
  console.log("Email validation:", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail));

  // Basic email format validation
  if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    return { errorMessage: "Please enter a valid email address", success: false };
  }

  try {
    console.log("Attempting to send reset email to:", trimmedEmail);
    
    await auth.api.forgetPassword({
      body: {
        email: trimmedEmail,
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
      },
    });

    return {
      success: true,
      message: "If an account with that email exists, we've sent a password reset link.",
    };
  } catch (error) {
    console.error("Detailed error:", error);
    
    if (error instanceof APIError) {
      console.error("API Error status:", error.status);
      console.error("API Error message:", error.message);
      
      switch (error.status) {
        case "BAD_REQUEST":
          return { errorMessage: "Invalid email address format", success: false };
        case "NOT_FOUND":
          // Don't reveal if user exists or not for security
          return {
            success: true,
            message: "If an account with that email exists, we've sent a password reset link.",
          };
        default:
          return { errorMessage: "Something went wrong. Please try again.", success: false };
      }
    }
    return { errorMessage: "Failed to send reset email. Please try again.", success: false };
  }
}

export async function resetPassword(prevState: State, formData: FormData) {
  const rawFormData = {
    token: formData.get("token") as string,
    password: formData.get("password") as string,
  };

  const { token, password } = rawFormData;
  const trimmedPassword = password.replace(/\s+/g, "");

  if (trimmedPassword.length < 6) {
    return { errorMessage: "Password must be at least 6 characters long", success: false };
  }

  try {
    await auth.api.resetPassword({
      body: {
        token,
        newPassword: trimmedPassword,
      },
    });

    return {
      success: true,
      message: "Password reset successfully! You can now log in with your new password.",
    };
  } catch (error) {
    console.error("Error resetting password:", error);
    if (error instanceof APIError) {
      switch (error.status) {
        case "BAD_REQUEST":
          return { errorMessage: "Invalid or expired reset token", success: false };
        case "NOT_FOUND":
          return { errorMessage: "Invalid or expired reset token", success: false };
        default:
          return { errorMessage: "Something went wrong", success: false };
      }
    }
    return { errorMessage: "Failed to reset password. Please try again.", success: false };
  }
}
