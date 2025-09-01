"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import TabButton from "@/components/utils/TabButton";
import CompetitionDetailsForm from "./CompetitionDetailForm";
import { Team } from "@/types/competition";
import { Star } from "@/types/misc";
const generateStars = (count: number) => {
  return Array.from({ length: count }, () => ({
    left: `${Math.random() * 98}%`,
    top: `${Math.random() * 35}%`, // Keep stars in upper part
    size: 0.1 + Math.random() * 0.7, // Random size between 0.1% and 0.8%
    opacity: 0.5 + Math.random() * 0.1, // Random opacity
  }));
};

export default function CompetitionDetail({ teams}: { teams: Team[]; }) {
  const [stars, setStars] = useState<Star[]>([]);
  const [activeTab, setActiveTab] = useState("Competitive Programming");

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };
  useEffect(() => {
    // Generate between 15-30 stars
    setStars(generateStars(20 + Math.floor(Math.random() * 10)));
  }, []);

  const activeTeam = teams.find(
    (team) =>
      team.competition_id ===
      (activeTab === "Competitive Programming"
        ? "cmegpb4cl0000hke9j8b2vg3f"
        : activeTab === "Business Plan"
        ? "cmegpbi5m0001hke9buhvhrw4"
        : activeTab === "Prompt GPT"
        ? "cmegpc6sx0002hke9gxo7hd6u"
        : activeTab === "Typeracer"
        ? "cmegpd01h0003hke91ea54m7c"
        : "")
  );
  return (
    <div className="min-h-screen w-screen overflow-hidden bg-gradient-to-b from-[#111114] to-[#090A1E]">
      <div className="top-container relative flex lg:gap-8 flex-col justify-start items-center w-full h-screen">
        {stars.map((star, index) => (
          <Image
            key={`star-${index}`}
            className="star absolute z-[0] h-auto will-change-transform"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}%`,
              opacity: star.opacity,
            }}
            src={"/backgrounds/Star.svg"}
            width={100}
            height={100}
            alt={`star-${index}`}
          />
        ))}
        <div className="z-[5] absolute w-full h-full bg-gradient-to-b from-[0%] from-[#2a0335]/50 via-[43%] via-[#6258D1]/50 to-[100%] to-[#00CBC1]/50 blue-light-top"></div>
        <div className="competition-detail-purple-light-middle absolute bottom-[-5rem] bg-[#97156A] w-[1100px] h-[900px] rounded-full blur-[100px] z-[0]"></div>
        <Image
          src={"backgrounds/BangunanBelakangBiru.svg"}
          alt="Background"
          width={100}
          height={100}
          className="z-[1] details-blue-building absolute w-screen h-auto bottom-[0rem]"
        />
        <Image
          src={"backgrounds/BangunanDepanUngu.svg"}
          alt="Background"
          width={100}
          height={100}
          className="z-[2] details-purple-building absolute w-screen h-auto bottom-[0rem]"
        />
        <Image
          src={"backgrounds/Stairs.svg"}
          alt="Stairs"
          width={100}
          height={100}
          className="z-[10] details-stairs absolute w-screen h-auto bottom-[-1rem]"
        />
        <Image
          src={"/competition-detail/competition-text.webp"}
          alt="Stairs"
          width={700}
          height={700}
          className="z-[10] mt-[10%] competition-glitch-text w-1/2 h-auto"
        />
        <div className="details-tab-button-container relative backdrop-blur-lg z-[11] w-[45%] grid grid-cols-4 place-items-center justify-items-center gap-8 border-[8px] border-[#FCE551] rounded-lg p-[4rem]">
          <TabButton
            buttonName="Competitive Programming"
            isActive={activeTab === "Competitive Programming"}
            onClick={() => handleTabClick("Competitive Programming")}
            compeittion_id="cmegpb4cl0000hke9j8b2vg3f"
          />
          <TabButton
            buttonName="Business Plan"
            isActive={activeTab === "Business Plan"}
            onClick={() => handleTabClick("Business Plan")}
            compeittion_id="cmegpbi5m0001hke9buhvhrw4"
          />
          <TabButton
            buttonName="Prompt GPT"
            isActive={activeTab === "Prompt GPT"}
            onClick={() => handleTabClick("Prompt GPT")}
            compeittion_id="cmegpc6sx0002hke9gxo7hd6u"
          />
          <TabButton
            buttonName="Typeracer"
            isActive={activeTab === "Typeracer"}
            onClick={() => handleTabClick("Typeracer")}
            compeittion_id="cmegpd01h0003hke91ea54m7c"
          />
        </div>
      </div>
      <div className="relative overflow-hidden bottom-container  bg-[#090A1E] w-screen flex flex-col justify-center items-center">
        <Image
          className="upmost-ground absolute w-screen z-[11] bottom-[0rem] h-auto"
          src={"/backgrounds/UpmostGround.svg"}
          width={1000}
          height={1000}
          alt="background-gradient"
        />
        <Image
          className="competition-detail-waves absolute w-screen z-[9] bottom-[0rem] h-auto will-change-transform"
          src={"/home/bg-waves.webp"}
          width={1000}
          height={1000}
          alt="background-gradient"
        />
        <Image
          className="hidden competition-detail-waves2 absolute w-screen z-[9] bottom-[0rem] h-auto"
          src={"/home/bg-waves.webp"}
          width={1000}
          height={1000}
          alt="background-gradient"
        />
        <Image
          className="competition-detail-light-waves absolute w-screen z-[8] bottom-[0rem] h-auto will-change-transform"
          src={"/home/Lights.svg"}
          width={1000}
          height={1000}
          alt="background-gradient"
        />
        <Image
          className="hidden competition-detail-light-waves2 absolute w-screen z-[8] bottom-[0rem] h-auto"
          src={"/home/Lights2.svg"}
          width={1000}
          height={1000}
          alt="background-gradient"
        />
        <Image
          className="competition-detail-stairs absolute z-[0] w-full top-[-26%] h-auto will-change-transform"
          src={"/backgrounds/Stairs.svg"}
          width={1000}
          height={1000}
          alt="background-gradient"
        />
         {activeTeam ? (
        // Jika tim untuk tab ini ada, render form dengan data tim tersebut
        <CompetitionDetailsForm
          competition_id={activeTeam.competition_id}
          competitionTitle={activeTab}
          teams={activeTeam} // <-- Kirim satu objek `team` dalam array `teams`
          // is_paid={is_paid}
        />
      ) : (
        // Jika tidak ada tim (pengguna tidak terdaftar), tampilkan pesan
        <div className="mt-[7.5%] mb-[10%] relative z-10 backdrop-blur-2xl flex w-[80%] sm:w-[45%] flex-col items-center justify-center gap-6 p-12 rounded-xl shadow-lg border-[4px] md:border-[8px] border-[#FCE551]">
          <h2 className="font-RopoSans-Regular text-3xl font-bold text-center text-white">
            {activeTab}
          </h2>
          <p className="text-white text-xl text-center">
            You are not registered for this competition.
          </p>
        </div>
      )}
      </div>
    </div>
  );
}
