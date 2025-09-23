-- CreateTable
CREATE TABLE "public"."AIPromptSubmission" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "team_name" TEXT NOT NULL,
    "competition_id" TEXT NOT NULL,
    "ai_chat_link" TEXT NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AIPromptSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BusinessPlanSubmission" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "team_name" TEXT NOT NULL,
    "competition_id" TEXT NOT NULL,
    "proposal" TEXT NOT NULL,
    "surat_pernyataan_orisinalitas" TEXT NOT NULL,
    "figma_link" TEXT NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BusinessPlanSubmission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."AIPromptSubmission" ADD CONSTRAINT "AIPromptSubmission_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AIPromptSubmission" ADD CONSTRAINT "AIPromptSubmission_competition_id_fkey" FOREIGN KEY ("competition_id") REFERENCES "public"."Competition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BusinessPlanSubmission" ADD CONSTRAINT "BusinessPlanSubmission_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BusinessPlanSubmission" ADD CONSTRAINT "BusinessPlanSubmission_competition_id_fkey" FOREIGN KEY ("competition_id") REFERENCES "public"."Competition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
