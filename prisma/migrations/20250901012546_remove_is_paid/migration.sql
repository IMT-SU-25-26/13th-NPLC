/*
  Warnings:

  - You are about to drop the column `is_paid` on the `CompetitionRegistration` table. All the data in the column will be lost.
  - Made the column `imagePublicId` on table `CompetitionRegistration` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imageUrl` on table `CompetitionRegistration` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."CompetitionRegistration" DROP COLUMN "is_paid",
ALTER COLUMN "imagePublicId" SET NOT NULL,
ALTER COLUMN "imageUrl" SET NOT NULL;
