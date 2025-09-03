import React from "react";
import SignUpForm from "@/components/utils/auth/SignUpForm";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import "@/styles/registeraccount-bg.css";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/already-logged-in");
  }
  return (
    <div className="overflow-hidden">
      <div className="rg-regis-main-wrapper-container relative min-h-screen w-screen overflow-hidden bg-gradient-to-b from-[#111114] to-[#090A1E]">
        <div className="z-[5] absolute w-full h-full bg-gradient-to-b from-[0%] from-[#2a0335]/50 via-[43%] via-[#6258D1]/50 to-[100%] to-[#00CBC1]/50 blue-light-top"></div>
        <div className="rg-regis-detail-purple-light-middle absolute bottom-[-5rem] bg-[#97156A] w-[1100px] h-[900px] rounded-full blur-[100px] z-[0]"></div>
        <Image
          src={"/backgrounds/BangunanBelakangBiru.svg"}
          alt="Background"
          width={100}
          height={100}
          className="z-[1] rg-regis-blue-building absolute w-screen h-auto bottom-0"
        />
        <Image
          src={"/backgrounds/BangunanDepanUngu.svg"}
          alt="Background"
          width={100}
          height={100}
          className="z-[2] rg-regis-purple-building absolute w-screen h-auto bottom-0"
        />
        <Image
          src={"/backgrounds/Stairs.svg"}
          alt="Stairs"
          width={100}
          height={100}
          className="z-[10] rg-regis-stairs absolute w-screen h-auto bottom-[-1rem]"
        />

        <div className="relative z-20 flex flex-col items-center justify-center min-h-screen w-full px-4">
          <Image
            className="rg-competition-text z-[10] w-[60%] sm:w-1/3 h-auto"
            src={"/register/AccountTitle.svg"}
            width={1000}
            height={1000}
            alt="background-gradient"
          />
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
