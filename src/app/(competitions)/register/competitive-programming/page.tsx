import Image from "next/image";
import CompetitiveProgrammingForm from "@/components/competition/competitive-programming/CompetitiveProgrammingRegistrationForm";
import "@/styles/competitive-programming.css";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { checkCompetitionPageAccess } from "@/lib/user";

export default async function Page() {
  const competitionId = "cmegpb4cl0000hke9j8b2vg3f";
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/register/not-logged-in");
  }

  const alreadyRegistered = await checkCompetitionPageAccess(
    session.user.id,
    competitionId
  );
  const alreadyRegisteredForCompetitiveProgramming =
    await checkCompetitionPageAccess(
      session.user.id,
      "cmegpb4cl0000hke9j8b2vg3f"
    );

  if (alreadyRegisteredForCompetitiveProgramming) {
    redirect("/register/already-registered-at-competitive-programming");
  }

  if (alreadyRegistered) {
    redirect("/register/already-registered");
  }
  return (
    <div className="overflow-hidden">
      <div className="cp-regis-main-wrapper-container overflow-hidden min-h-screen w-full">
        <div className="cp-regis-background-img-container w-full bg-gradient-to-b from-[#111114] to-[#090A1E] relative">
          <Image
            className="cp-regis-gradient-light-bg absolute z-[1] w-full bottom-[40%] sm:bottom-[40%] lg:bottom-[-30%] h-[35rem] sm:h-auto"
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
          <div className="cp-regis-form-container relative z-20 flex gap-4 flex-col items-center justify-center] w-full px-4">
            <Image
              className="cp-competition-text z-[10] w-[60%] sm:w-1/3 h-auto"
              src={"/register/competition-text.webp"}
              width={1000}
              height={1000}
              alt="background-gradient"
            />
            <CompetitiveProgrammingForm
              competitionId={competitionId}
              userId={session.user.id}
              competitionTitle="Competitive Programming"
            />
          </div>
          <div className="under-stair bg-[#090A1E] absolute w-screen h-[20rem] bottom-[-10%] z-[9]"></div>
          <Image
            className="cp-regis-stairs absolute z-[10] w-full bottom-[28%] sm:bottom-[20%] lg:bottom-[-8%] h-auto"
            src={"/backgrounds/Stairs.svg"}
            width={1000}
            height={1000}
            alt="background-gradient"
          />
        </div>
      </div>
    </div>
  );
}
