import React from "react";
import LoginForm from "@/components/utils/auth/LoginForm";
import Image from "next/image";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import "@/styles/loginpage.css";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/already-logged-in");
  }
  return (
    // <div className="overflow-hidden min-h-screen w-full">
    //   <div className="w-full overflow-hidden bg-gradient-to-b from-[#111114] to-[#090A1E] min-h-screen relative">
    //     <div className="relative w-full min-h-screen">
    //       <Image
    //         className="light-background absolute z-[1] w-full bottom-[40%] sm:bottom-[40%] lg:bottom-[-28%] h-[35rem] sm:h-auto"
    //         src={"/backgrounds/GradientLightBG.webp"}
    //         width={1000}
    //         height={1000}
    //         alt="background-gradient"
    //       />
    //       <Image
    //         className="hollow-purple absolute z-[2] w-full bottom-[40%] sm:bottom-[35%] lg:bottom-[20%] h-auto"
    //         src={"/backgrounds/LightTengah.webp"}
    //         width={1000}
    //         height={1000}
    //         alt="light-tengah"
    //       />
    //       <Image
    //         className="aoi absolute z-[3] bottom-[40%] sm:bottom-[35%] lg:bottom-[-4%] w-screen h-auto"
    //         src={"/backgrounds/BangunanBelakangBiru.svg"}
    //         width={100}
    //         height={100}
    //         alt="bagunan-biru"
    //       />
    //       <Image
    //         className="murasaki absolute z-[4] bottom-[35%] sm:bottom-[30%] lg:bottom-[-4%] w-screen h-auto"
    //         src={"/backgrounds/BangunanDepanUngu.svg"}
    //         width={100}
    //         height={100}
    //         alt="bangunan-ungu"
    //       />
    //       <Image
    //         className="light absolute z-[5] bottom-[28%] sm:bottom-[25%] lg:bottom-0 w-screen h-auto"
    //         src={"/backgrounds/FrontGradientLightBG.svg"}
    //         width={100}
    //         height={100}
    //         alt="front-light"
    //       />
    //       <div className="relative z-20 flex items-center justify-center min-h-screen w-full px-4">
    //         <LoginForm />
    //       </div>
    //       <Image
    //         className="tangga absolute z-[10] w-full bottom-[26%] sm:bottom-[20%] lg:bottom-[-8%] h-auto"
    //         src={"/backgrounds/Stairs.svg"}
    //         width={1000}
    //         height={1000}
    //         alt="tangga background-gradient"
    //       />
    //       <BuildingAnimations />
    //     </div>
    //   </div>
    // </div>
    <div className="min-h-screen w-screen overflow-hidden bg-gradient-to-b from-[#111114] to-[#090A1E]">
      <div className="restriction-top-container relative flex lg:gap-8 flex-col justify-start items-center w-full h-screen">
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

        <div className="relative z-20 flex items-center justify-center min-h-screen w-full px-4">
          <LoginForm />
        </div>
      </div>
      <div className="bg-[#090A1E] absolute bottom-0 w-full h-full"></div>
    </div>
  );
}
