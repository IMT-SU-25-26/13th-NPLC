/*
  Warnings:

  - You are about to drop the column `registration_midtrans_token` on the `CompetitionRegistration` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."CompetitionRegistration" DROP COLUMN "registration_midtrans_token";
