/*
  Warnings:

  - Added the required column `round_id` to the `AIPromptSubmission` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."RoundStatus" AS ENUM ('not_started', 'ongoing', 'finished');

-- AlterTable
ALTER TABLE "public"."AIPromptSubmission" ADD COLUMN     "round_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."AIRound" (
    "id" TEXT NOT NULL,
    "round" INTEGER NOT NULL,
    "batch" INTEGER NOT NULL,
    "status" "public"."RoundStatus" NOT NULL DEFAULT 'not_started',

    CONSTRAINT "AIRound_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."AIPromptSubmission" ADD CONSTRAINT "AIPromptSubmission_round_id_fkey" FOREIGN KEY ("round_id") REFERENCES "public"."AIRound"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
