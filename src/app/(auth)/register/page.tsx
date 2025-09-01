import React from "react";
import SignUpForm from "@/components/utils/auth/SignUpForm";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import "@/styles/registeraccount-bg.css";
import MobileWaves from "@/components/MobileWaves";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/already-logged-in");
  }
  return (
    <div className="rg-regis-main-wrapper-container overflow-hidden min-h-screen">
      <MobileWaves className="top-0 w-screen h-auto z-[3]"/>
      <div className="rg-regis-background-img-container w-full bg-gradient-to-b from-[#111114] to-[#090A1E] relative">
        <Image
          className="rg-regis-gradient-light-bg absolute z-[1] w-full bottom-[40%] sm:bottom-[40%] lg:bottom-[-30%] h-[35rem] sm:h-auto"
          src={"/backgrounds/GradientLightBG.webp"}
          width={1000}
          height={1000}
          alt="background-gradient"
        />
        <Image
          className="rg-regis-light-middle  absolute z-[2] w-full bottom-[40%] sm:bottom-[35%] lg:bottom-[20%] h-auto"
          src={"/backgrounds/LightTengah.webp"}
          width={1000}
          height={1000}
          alt="light-tengah"
        />
        <Image
          className="rg-regis-blue-building absolute z-[3] bottom-[40%] sm:bottom-[35%] lg:bottom-[-4%] w-screen h-auto"
          src={"/backgrounds/BangunanBelakangBiru.svg"}
          width={100}
          height={100}
          alt="bagunan-biru"
        />
        <Image
          className="rg-regis-purple-building absolute z-[4] bottom-[35%] sm:bottom-[30%] lg:bottom-[-4%] w-screen h-auto"
          src={"/backgrounds/BangunanDepanUngu.svg"}
          width={100}
          height={100}
          alt="bangunan-ungu"
        />
        <Image
          className="rg-regis-front-light-gradient absolute z-[5] bottom-[30%] sm:bottom-[25%] lg:bottom-0 w-screen h-auto"
          src={"/backgrounds/FrontGradientLightBG.svg"}
          width={100}
          height={100}
          alt="front-light"
        />
        <div className="rg-regis-form-container relative z-20 flex gap-4 flex-col items-center justify-center min-h-screen w-full px-4">
          <Image
            className="rg-competition-text z-[10] w-[60%] sm:w-1/3 h-auto"
            src={"/register/AccountTitle.svg"}
            width={1000}
            height={1000}
            alt="background-gradient"
          />
          <SignUpForm />
        </div>
        <div className="rg-under-stair bg-[#090A1E] absolute w-screen h-[20rem] bottom-[-10%] z-[9]"></div>
        <Image
          className="rg-regis-stairs absolute z-[10] w-full bottom-[28%] sm:bottom-[20%] lg:bottom-[-8%] h-auto"
          src={"/backgrounds/Stairs.svg"}
          width={1000}
          height={1000}
          alt="background-gradient"
        />
      </div>
    </div>
  );
}
