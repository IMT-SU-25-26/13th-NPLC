import React from "react";
import "@/styles/competition-detail.css";
import Restrictions from "@/components/utils/Restrictions";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { checkCompetitionPageAccess } from '@/lib/user';
import { getCompetitionById } from '@/lib/competition';
import { redirect } from 'next/navigation';
import Image from "next/image";
import SubmissionForm from "@/components/competition/business-plan/SubmissionForm";




export default async function Page() {
    // Get current session
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user?.id) {
        return (
            <Restrictions restrictionDescription="You are not logged in into an account!" />
        );
    }

    const hasAccess = await checkCompetitionPageAccess(session.user.id, "cmegpbi5m0001hke9buhvhrw4");

    if (!hasAccess) {
        redirect("/not-registered");
    }

    const competitionData = await getCompetitionById("cmegpbi5m0001hke9buhvhrw4");
    if (!competitionData) {
        redirect("/not-found");
    }

    // if (competitionData.is_started == false) {
    //     redirect("/page-restricted");
    // }

    return (
        <div className="min-h-screen w-screen overflow-hidden bg-gradient-to-b from-[#111114] to-[#090A1E]">
            <div className=" restriction-top-container relative flex lg:gap-8 flex-col justify-center items-center w-full h-screen">
                <div className="z-[5] absolute w-full h-full bg-gradient-to-b from-[0%] from-[#2a0335]/50 via-[43%] via-[#6258D1]/50 to-[100%] to-[#00CBC1]/50 blue-light-top"></div>
                <div className="restriction-detail-purple-light-middle absolute bottom-[-5rem] bg-[#97156A] w-[1100px] h-[900px] rounded-full blur-[100px] z-[0]"></div>
                <Image
                    src={"/backgrounds/BangunanBelakangBiru.svg"}
                    alt="Background"
                    width={100}
                    height={100}
                    className="z-[1] restriction-blue-building absolute w-screen h-auto bottom-[0rem]"
                />
                <Image
                    src={"/backgrounds/BangunanDepanUngu.svg"}
                    alt="Background"
                    width={100}
                    height={100}
                    className="z-[2] restriction-purple-building absolute w-screen h-auto bottom-[0rem]"
                />
                <Image
                    src={"/backgrounds/Stairs.svg"}
                    alt="Stairs"
                    width={100}
                    height={100}
                    className="z-[10] restriction-stairs absolute w-screen h-auto bottom-[-1rem]"
                />
                <Image
                    className="account-text z-[6] sm:w-[30rem] w-[20rem] lg:w-[40rem] mb-3 lg:-mb-5 h-auto"
                    src={"/submission/Soal.svg"}
                    width={100}
                    height={100}
                    alt="account-text"
                />
                <SubmissionForm />
            </div>
            <div className="bg-[#090A1E] absolute bottom-0 w-full h-full"></div>
        </div>
    );


}

