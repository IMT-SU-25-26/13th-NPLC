import React from 'react'
import { auth } from "@/lib/auth/auth";
import { headers } from 'next/headers';
import { checkCompetitionPageAccess } from '@/lib/user';
import { getCompetitionById } from '@/lib/competition';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import ClientPageSubmission from '@/components/businessPlan/ClientPageSubmission';

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  if(!session) {
    return (
      <div>You must make an account to access this page!</div>
    )
  }

  const hasAccess = await checkCompetitionPageAccess(session.user.id, "cmegpbi5m0001hke9buhvhrw4");

  if (!hasAccess) {
    redirect("/not-registered");
  }

  const competitionData = await getCompetitionById("cmegpbi5m0001hke9buhvhrw4");
  if(!competitionData){
    redirect("/not-found");
  }
  
  if(competitionData.is_started == false) {
     redirect("/page-restricted");
  }

  return(
    <>
      <div className="cp-regis-main-wrapper-container overflow-hidden max-h-dvh">
            <div className="cp-regis-background-img-container w-full overflow-hidden bg-gradient-to-b from-[#111114] to-[#090A1E] relative">
              <Image
                className="cp-regis-gradient-light-bg absolute z-[1] w-full bottom-[40%%] sm:bottom-[40%] lg:bottom-[-30%] h-[35rem] sm:h-auto"
                src={"/backgrounds/GradientLightBG.webp"}
                width={1000}
                height={1000}
                alt="background-gradient"
              />
              <Image
                className="cp-regis-light-middle  absolute z-[2] w-full bottom-[40%] sm:bottom-[35%] lg:bottom-[20%] h-auto"
                src={"/backgrounds/LightTengah.webp"}
                width={1000}
                height={1000}
                alt="light-tengah"
              />
              <Image
                className="cp-regis-blue-building absolute z-[3] bottom-[40%] sm:bottom-[35%] lg:bottom-[-4%] w-screen h-auto"
                src={"/backgrounds/BangunanBelakangBiru.svg"}
                width={100}
                height={100}
                alt="bagunan-biru"
              />
              <Image
                className="cp-regis-purple-building absolute z-[4] bottom-[35%] sm:bottom-[30%] lg:bottom-[-4%] w-screen h-auto"
                src={"/backgrounds/BangunanDepanUngu.svg"}
                width={100}
                height={100}
                alt="bangunan-ungu"
              />
              <Image
                className="cp-regis-front-light-gradient absolute z-[5] bottom-[30%] sm:bottom-[25%] lg:bottom-0 w-screen h-auto"
                src={"/backgrounds/FrontGradientLightBG.svg"}
                width={100}
                height={100}
                alt="front-light"
              />

              <div className="cp-regis-form-container relative mt-30 z-10 flex gap-4 flex-col items-center justify-start min-h-[92vh] sm:min-h-[88vh] w-dvw">
                <div className='w-full flex flex-col items-center justify-center h-[60vh]'>
                  <Image
                    className="cp-competition-text z-[10] w-[60%] sm:w-1/3 h-auto"
                    src={"/submission/submission-text.webp"}
                    width={1000}
                    height={1000}
                    alt="background-gradient"
                  />

                  {/* content */}
                  <div className="relative w-[98vw] sm:w-[90vw] min-w-[250px] max-w-[453px] sm:min-w-[35rem] md:max-w-[50rem] h-auto">
                    {/* The original border PNG on top */}
                    <Image
                      src="submission/bg-submission.svg"
                      className="relative w-full h-auto backdrop-blur-lg hidden md:block"
                      alt="border"
                      width={100}
                      height={100}
                    />
                    <Image
                      src="submission/bg-submission-mobile.svg"
                      className="relative w-full h-auto backdrop-blur-lg hidden sm:block md:hidden"
                      alt="border"
                      width={100}
                      height={100}
                    />
                    <Image
                      src="submission/bg-submission-mobile-small.svg"
                      className="relative w-full h-auto backdrop-blur-lg sm:hidden"
                      alt="border"
                      width={100}
                      height={100}
                    />

                    <ClientPageSubmission />
                  </div>

                </div>
                </div>
            <div className="under-stair bg-[#090A1E] absolute w-dvw h-[20rem] bottom-[-10%] z-[9]"></div>
              <Image
                className="cp-regis-stairs absolute z-[10] w-full bottom-[28%] sm:bottom-[20%] lg:bottom-[-8%] h-auto"
                src={"/backgrounds/Stairs.svg"}
                width={1000}
                height={1000}
                alt="background-gradient"
              />
            </div>
          </div>
    </>
  )
}
