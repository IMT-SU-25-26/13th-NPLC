-- AlterTable
ALTER TABLE "public"."user" ADD COLUMN     "current_ai_round_id" TEXT;

-- AddForeignKey
ALTER TABLE "public"."user" ADD CONSTRAINT "user_current_ai_round_id_fkey" FOREIGN KEY ("current_ai_round_id") REFERENCES "public"."AIRound"("id") ON DELETE SET NULL ON UPDATE CASCADE;
