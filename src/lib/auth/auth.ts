import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { nextCookies } from "better-auth/next-js";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

// Create transporter for Gmail - Fix: use createTransport instead of createTransporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const auth = betterAuth({
  trustedOrigins: [
    "http://localhost:3000",
    "https://nplc.ciputra.ac.id",
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://nplc.vercel.app"
  ],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    maxPasswordLength: 128,
    autoSignIn: true,
    // Add proper forget password configuration
    forgotPassword: {
      enabled: true,
      resetTokenExpirationMinutes: 15, // 60 minutes
    },
    // Add email sending configuration
    sendResetPassword: async ({ user, url }) => {
      try {
        console.log(`Sending password reset email to: ${user.email}`);
        
        const mailOptions = {
          from: process.env.GMAIL_USER,
          to: user.email,
          subject: 'Reset Your NPLC Password',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">Reset Your Password</h2>
              <p>Hi ${user.name || 'there'},</p>
              <p>You requested to reset your password for your NPLC account. Click the button below to reset your password:</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${url}" style="background-color: #FCF551; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
              </div>
              <p>Or copy and paste this link in your browser:</p>
              <p style="word-break: break-all; color: #666;">${url}</p>
              <p>This link will expire in 15 minutes for security reasons.</p>
              <p>If you didn't request this password reset, you can safely ignore this email.</p>
              <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 12px;">
                Best regards,<br>
                NPLC Team
              </p>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
        console.log('Password reset email sent successfully');
        // Remove the return statement or just return without a value
      } catch (error) {
        console.error('Error sending reset email:', error);
        // Don't return false, just let the function complete
        throw error; // Optionally throw the error to let better-auth handle it
      }
    },
  },
  account: {
    accountLinking: {
      enabled: true,
    },
  },
  plugins: [
    nextCookies(),
  ],
});