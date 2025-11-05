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

    await prisma.aIRound.createMany({
        data: [{
            id: "1",
            round: 1,
            batch: 1,
            question_link:"https://docs.google.com/document/d/1WSOBKKxo-rE0VrSgsjiLlGyd78pHgA8L1sEeDwNLIi4/edit?usp=sharing"
        },
        {
            id: "2",
            round: 2,
            batch: 1,
            question_link:"https://docs.google.com/document/d/1x--9QvjTHw4mRRIk_6K0Z_2Y43pzrqro0PTJrqDyiNk/edit?usp=sharing"
        },
        {
            id: "3",
            round: 3,
            batch: 1,
            question_link:"https://docs.google.com/document/d/1dZRXS2KZSwHs8wt2s0AyI4Cmf3I016FtMak8s64s14c/edit?usp=sharing"
        },
        {
            id: "4",
            round: 4,
            batch: 1,
            question_link:"https://docs.google.com/document/d/1A8thI6DYw_fMAm_e44vrBvrTzWuyKr3SuIIgxvA_lOc/edit?usp=sharing"
        }]
    })
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