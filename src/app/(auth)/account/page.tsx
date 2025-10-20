import React from "react";
import { getUserData } from "@/lib/user";
import Image from "next/image";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import "@/styles/sinlge-regis-background.css";
import LogoutButton from "@/components/utils/auth/LogoutButton";
import "@/styles/competitive-programming-multiple-regis.css";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userData = await getUserData(session?.user.id || "");

  if (!session) {
    redirect("/not-logged-in");
  }

  return (
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

        <div className="relative z-20 flex flex-col items-center justify-center min-h-screen w-full px-4">
          <Image
            className="account-text z-[6] w-[30rem] h-auto"
            src={"/login/account.svg"}
            width={100}
            height={100}
            alt="account-text"
          />
          <div className="relative z-[10] backdrop-blur-2xl flex w-[90%] md:w-[70%] lg:w-[70%] xl:w-[40%] flex-col items-center justify-center gap-4 lg:gap-6 p-6 lg:p-12 rounded-xl shadow-lg border-[8px] border-[#FCE551]">
            <div className="w-full justify-center items-center space-y-4 md:space-y-6">
              <div className="flex flex-col items-center text-center">
                <div className="flex flex-col w-full">
                  <label className="competition-detail-label text-left w-full font-ropasans-regular text-md md:text-2xl">
                    Full Name
                  </label>
                  <div
                    className="competition-detail-data px-[2.5%] text-md md:text-2xl py-2 bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none 
                  text-[#75E8F0] [text-shadow:_0_0_20px_rgba(0,255,255,1)] 
                    overflow-x-auto whitespace-nowrap"
                  >
                    {session.user.name}
                  </div>
                </div>

                <div className="flex flex-col w-full">
                  <label className="competition-detail-label text-left w-full font-ropasans-regular text-md md:text-2xl">
                    Email
                  </label>
                  <div
                    className="competition-detail-data px-[2.5%] text-md md:text-2xl py-2 bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none 
                  text-[#75E8F0] [text-shadow:_0_0_20px_rgba(0,255,255,1)] 
                    overflow-x-auto whitespace-nowrap"
                  >
                    {session.user.email}
                  </div>
                </div>

                <div className="flex flex-col w-full">
                  <label className="competition-detail-label text-left w-full font-ropasans-regular text-md md:text-2xl">
                    NISN
                  </label>
                  <div
                    className="competition-detail-data px-[2.5%] text-md md:text-2xl py-2 bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none 
                  text-[#75E8F0] [text-shadow:_0_0_20px_rgba(0,255,255,1)] 
                    overflow-x-auto whitespace-nowrap"
                  >
                    {userData?.nomor_induk_siswa_nasional}
                  </div>
                </div>
              </div>
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#090A1E] absolute bottom-0 w-full h-full"></div>
    </div>
  );
}
