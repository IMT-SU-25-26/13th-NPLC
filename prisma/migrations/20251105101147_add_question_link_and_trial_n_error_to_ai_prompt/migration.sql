/*
  Warnings:

  - Added the required column `trial_and_error_link` to the `AIPromptSubmission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."AIPromptSubmission" ADD COLUMN     "trial_and_error_link" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."AIRound" ADD COLUMN     "question_link" TEXT NOT NULL DEFAULT '';
