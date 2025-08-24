"use client";

import React from "react";
import "@/styles/competitive-programming-multiple-regis.css";
import { Team } from "@/types/competition";

// Interface baru untuk props, berisi semua data yang akan ditampilkan

export default function CompetitionDetailsDisplay({
  teams,
  competitionTitle,
}: {
  teams: Team;
  competitionTitle: string;
}) {
  if (!teams) {
    return (
      <div className="text-red-500 text-center mb-4">
        No team data available.
      </div>
    );
  }
  // useState dan handler tidak diperlukan lagi karena komponen ini hanya untuk menampilkan data
  return (
    <>
      <div className="mt-[5%] mb-[10%] relative z-[10] backdrop-blur-2xl flex w-[45%] flex-col items-center justify-center gap-1.5 sm:gap-2 md:gap-2 lg:gap-6 p-12 rounded-xl shadow-lg border-[8px] border-[#FCE551]">
        <h2 className="font-RopoSans-Regular text-lg md:text-3xl lg:text-3xl font-bold text-center text-white">
          {competitionTitle}
        </h2>

        <div className="gap-2 sm:gap-4 flex flex-col justify-center items-center w-[90%]">
          {/* Setiap pasangan label-input diubah menjadi label-div */}
          <div className="flex flex-col w-full">
            <label className="text-left w-full font-ropasans-regular text-2xl">
              Team Name
            </label>
            {/* <input> diubah menjadi <div> untuk menampilkan data */}
            <div
              className="px-[2.5%] text-2xl py-2 bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none 
                text-[#75E8F0] [text-shadow:_0_0_20px_rgba(0,255,255,1)] 
                overflow-x-auto whitespace-nowrap"
            >
              {teams.team_name || "-"}
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label className="text-left w-full font-ropasans-regular text-2xl">
              School Name
            </label>
            <div
               className="px-[2.5%] text-2xl py-2 bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none 
                text-[#75E8F0] [text-shadow:_0_0_20px_rgba(0,255,255,1)] 
                overflow-x-auto whitespace-nowrap"
            >
              {teams.members[0].school_name || "-"}
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label className="text-left w-full font-ropasans-regular text-2xl">
              Contact Person Number
            </label>
            <div
               className="px-[2.5%] text-2xl py-2 bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none 
                text-[#75E8F0] [text-shadow:_0_0_20px_rgba(0,255,255,1)] 
                overflow-x-auto whitespace-nowrap"
            >
              {teams.members[0].contact_person_number || "-"}
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label className="text-left w-full font-ropasans-regular text-2xl">
              Twibon Link
            </label>
            <div
              className="px-[2.5%] text-2xl py-2 bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none 
                text-[#75E8F0] [text-shadow:_0_0_20px_rgba(0,255,255,1)] 
                overflow-x-auto whitespace-nowrap"
            >
              <a
                href={teams.members[0].link_twiboon}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {teams.members[0].link_twiboon || "-"}
              </a>
            </div>
          </div>

          {/* Melakukan mapping pada data 'members' yang diterima dari props */}
          {teams.members.map((member, index) => (
            <div
              key={index}
              className="flex w-full justify-center gap-1 sm:gap-4"
            >
              <div className="flex flex-col w-full">
                <label className="text-left w-full font-ropasans-regular text-2xl">
                  Full Name {index + 1}
                </label>
                <div
                  className="px-[2.5%] text-2xl py-2 bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none 
                text-[#75E8F0] [text-shadow:_0_0_20px_rgba(0,255,255,1)] 
                  overflow-x-auto whitespace-nowrap"
                >
                  {member.user.name || "-"}
                </div>
              </div>

              <div className="flex flex-col w-full">
                <label className="text-left w-full font-ropasans-regular text-2xl">
                  NISN {index + 1}
                </label>
                <div
                   className="px-[2.5%] text-2xl py-2 bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none 
                text-[#75E8F0] [text-shadow:_0_0_20px_rgba(0,255,255,1)] 
                  overflow-x-auto whitespace-nowrap"
                >
                  {member.user.nomor_induk_siswa_nasional || "-"}
                </div>
              </div>
            </div>
          ))}

          {/* Tombol submit dihapus karena tidak diperlukan lagi */}
        </div>
      </div>
    </>
  );
}
