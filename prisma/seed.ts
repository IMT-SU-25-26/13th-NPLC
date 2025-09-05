import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function main() {
    console.log("Seeding database...");
    await prisma.competition.createMany({
        data: [
            { id:"cmegpb4cl0000hke9j8b2vg3f", name: "Programming" },
            { id:"cmegpbi5m0001hke9buhvhrw4", name: "Business Plan" },
            { id:"cmegpc6sx0002hke9gxo7hd6u", name: "AI Prompt" },
            { id:"cmegpd01h0003hke91ea54m7c", name: "Type Racer" }
        ]
    });
}

main()
  .then(() => {
    console.log("Seeding finished.");
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error("Seeding error:", e);
    return prisma.$disconnect().then(() => process.exit(1));
  });