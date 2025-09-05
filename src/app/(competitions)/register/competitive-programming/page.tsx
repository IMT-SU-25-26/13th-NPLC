import Image from "next/image";
import CompetitiveProgrammingForm from "@/components/competition/competitive-programming/CompetitiveProgrammingRegistrationForm";
import "@/styles/competitive-programming.css";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { checkCanRegisterForCompetitiveProgramming, checkCompetitionPageAccess } from "@/lib/user";
import Restrictions from "@/components/utils/Restrictions";
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

  const alreadyRegisteredForOtherCompetition = await checkCanRegisterForCompetitiveProgramming(session.user.id);

  if (alreadyRegisteredForOtherCompetition === false && !alreadyRegisteredForCompetitiveProgramming) {
    return(<Restrictions restrictionDescription="You are already registered for another competition!" />)
  }
  
  if (alreadyRegisteredForCompetitiveProgramming) {
    redirect("/register/already-registered-at-competitive-programming");
  }

  if (alreadyRegistered) {
    redirect("/register/already-registered");
  }
  return (
    <div className="overflow-hidden">
      <div className="cp-regis-main-wrapper-container relative flex lg:gap-8 flex-col justify-start items-center w-full min-h-screen">
        <div className="z-[5] absolute w-full h-full bg-gradient-to-b from-[0%] from-[#2a0335]/50 via-[43%] via-[#6258D1]/50 to-[100%] to-[#00CBC1]/50 blue-light-top"></div>
        <div className="home-purple-light-middle absolute bottom-[-5rem] bg-[#97156A] w-[300px] h-[500px] md:w-[600px] md:h-[600px] xl:w-[1100px] xl:h-[900px] rounded-full blur-[100px] z-[0]"></div>
        <Image
          src={"/backgrounds/BangunanBelakangBiru.svg"}
          alt="Background"
          width={100}
          draggable={false}
          height={100}
          className="z-[1] restriction-blue-building will-change-transform absolute w-screen h-auto bottom-[0rem]"
        />
        <Image
          src={"/backgrounds/BangunanDepanUngu.svg"}
          alt="Background"
          width={100}
          draggable={false}
          height={100}
          className="z-[2] restriction-purple-building absolute will-change-transform w-screen h-auto bottom-[-5rem]"
        />
        <div className="relative z-10 flex flex-col gap-12 items-center justify-center w-full h-full">
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
            competitionTitle="Programming"
          />
        </div>
        <Image
          className="z-[8] w-full mb-[-1%] h-auto"
          src={"/backgrounds/Stairs.svg"}
          width={1000}
          height={1000}
          alt="background-gradient"
        />
      </div>
    </div>
  );
}
