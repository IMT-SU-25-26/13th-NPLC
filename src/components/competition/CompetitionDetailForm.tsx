"use client";

import React from "react";
import "@/styles/competitive-programming-multiple-regis.css";
import { Team } from "@/types/competition";
import { updateIsPaid, cancelRegistration } from "@/lib/competition";
import { useSession } from "@/lib/auth/auth_client";

// Interface baru untuk props, berisi semua data yang akan ditampilkan

export default function CompetitionDetailsDisplay({
  teams,
  competitionTitle,
  is_paid,
}: {
  teams: Team;
  competitionTitle: string;
  is_paid: boolean;
}) {
  const { data: session } = useSession();
  const isLoggedIn = !!session;

  if (!isLoggedIn) {
    return (
      <div className="text-red-500 text-center mb-4">
        You must be logged in to view this content.
      </div>
    );
  }

  if (!teams) {
    return (
      <div className="text-red-500 text-center mb-4">
        No team data available.
      </div>
    );
  }

  const handlePay = () => {
    if (window.snap === undefined) {
      return;
    }
    if (teams.members[0].registration_midtrans_token === null) {
      return;
    }
    // Panggil snap.pay dengan callbacks
    window.snap.pay(teams.members[0].registration_midtrans_token, {
      onSuccess: async function () {
        /* Anda dapat menambahkan logika di sini, misalnya redirect atau menampilkan pesan sukses */
        await updateIsPaid(
          teams.members[0].competition_id,
          teams.members[0].team_name,
          true
        );
      },
      onPending: function () {
        /* Logika untuk status pembayaran pending */
      },
      onError: async function () {
        /* Logika jika terjadi error */
        await updateIsPaid(
          teams.members[0].competition_id,
          teams.members[0].team_name,
          false
        );
      },
      onClose: async function () {},
    });
  };

  const deleteRegistration = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to cancel this team's registration? This action cannot be undone."
    );

    if (!isConfirmed) {
      return; // Batalkan jika pengguna tidak setuju
    }

    try {
      // Panggil fungsi server dengan argumen yang benar
      if (!teams.members[0].id) {
        return;
      }

      for (let i = 0; i < teams.members.length; i++) {
        if (teams.members[i].user.id === session.user.id) {
          await cancelRegistration(
            teams.members[i].competition_id,
            teams.members[i].user.id
          );
        }
      }

      // Berikan feedback ke pengguna dan refresh halaman
      alert("Registration cancelled successfully!");
      window.location.reload(); // Ini akan me-refresh data server dan me-render ulang komponen
    } catch (error) {
      console.error(error);
      alert("Failed to cancel registration. Please try again.");
    }
  };
  // useState dan handler tidak diperlukan lagi karena komponen ini hanya untuk menampilkan data
  return (
    <>
      <div className="mt-[5%] mb-[10%] relative z-[10] backdrop-blur-2xl flex w-[45%] flex-col items-center justify-center gap-1.5 sm:gap-2 md:gap-2 lg:gap-6 p-12 rounded-xl shadow-lg border-[8px] border-[#FCE551]">
        <h2 className="font-RopoSans-Regular text-lg md:text-3xl lg:text-3xl font-bold text-center text-white">
          {competitionTitle}
        </h2>
        <div className="w-[35%] flex flex-col">
          {/* <label className="text-left w-full font-ropasans-regular text-2xl">
            Registration Stauts
          </label> */}
          <div
            className={`px-[2.5%] rounded-2xl text-2xl py-2 bg-[#18182a]/80 border-2 text-center
              ${
                is_paid
                  ? "border-[#4ADE80] text-[#4ADE80]" // green for success
                  : teams.members[0].registration_midtrans_token
                  ? "border-[#FBBF24] text-[#FBBF24]" // yellow for pending
                  : "border-[#EF4444] text-[#EF4444]" // red for not paid
              }
              [text-shadow:_0_0_20px_rgba(0,255,255,0.5)] 
              overflow-x-auto whitespace-nowrap`}
          >
            {is_paid
              ? "Registration Success"
              : teams.members[0].registration_midtrans_token
              ? "Registration Pending"
              : "Not Paid"}
          </div>
        </div>

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

          <div className="details-button-container flex gap-4 w-[95%]">
            {is_paid ? (
              <></>
            ) : (
              <>
                <svg
                  width="332"
                  height="81"
                  viewBox="0 0 332 81"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="cursor-target group"
                  onClick={handlePay}
                >
                  <path
                    d="M0 68.3936H32.8861L0 56.6147V68.3936Z"
                    fill="#661109"
                  />
                  <path
                    opacity="0.25"
                    d="M322.577 2.5V43.8066L246.309 65.8936H51.6289L2.5 48.293V24.585L78.7686 2.5H322.577Z"
                    fill="#D9D9D9"
                    stroke="#661109"
                    strokeWidth="5"
                  />
                  <path
                    d="M6.92285 73.7244H39.8089L6.92285 61.9414V73.7244Z"
                    fill="#FCF551"
                  />
                  <path
                    d="M330.5 6.83105V49.8896L253.371 72.2246H58.3789L8.42285 54.3281V29.1611L85.542 6.83105H330.5Z"
                    fill="#2F2E2E"
                    fillOpacity="1"
                    stroke="#FCF551"
                    strokeWidth="3"
                    className="group-hover:fill-[#FCF551]"
                  />
                  <text
                    x="172.5"
                    y="42.5"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="currentColor"
                    fontSize="18"
                    fontWeight="500"
                    className="text-[#D787DF] text-5xl sm:text-5xl md:text-5xl lg:text-4xl font-rubik-glitch group-hover:text-[#D787DF]"
                  >
                    Pay_
                  </text>
                  <text
                    x="175"
                    y="40"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="currentColor"
                    fontSize="18"
                    fontWeight="500"
                    className="text-[#FCF551] text-5xl sm:text-5xl md:text-5xl lg:text-4xl font-rubik-glitch group-hover:text-[#D787DF]"
                  >
                    Pay_
                  </text>
                  <path
                    d="M57.833 77.3337H216.509V80.1763H57.833"
                    fill="#FCF551"
                  />
                  <path
                    d="M6.81738 77.3337H39.7035V80.1763H6.81738"
                    fill="#FCF551"
                  />
                  <path
                    d="M328.036 5.33105V50.8877V52.1631L332 51.0169V50.8877V5.33105H328.036Z"
                    fill="#75E8F0"
                  />
                </svg>

                <svg
                  width="332"
                  height="81"
                  viewBox="0 0 332 81"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="cursor-target group"
                  onClick={deleteRegistration}
                >
                  <path
                    d="M0 68.3936H32.8861L0 56.6147V68.3936Z"
                    fill="#661109"
                  />
                  <path
                    opacity="0.25"
                    d="M322.577 2.5V43.8066L246.309 65.8936H51.6289L2.5 48.293V24.585L78.7686 2.5H322.577Z"
                    fill="#D9D9D9"
                    stroke="#661109"
                    strokeWidth="5"
                  />
                  <path
                    d="M6.92285 73.7244H39.8089L6.92285 61.9414V73.7244Z"
                    fill="#FCF551"
                  />
                  <path
                    d="M330.5 6.83105V49.8896L253.371 72.2246H58.3789L8.42285 54.3281V29.1611L85.542 6.83105H330.5Z"
                    fill="#2F2E2E"
                    fillOpacity="1"
                    stroke="#FCF551"
                    strokeWidth="3"
                    className="group-hover:fill-[#FCF551]"
                  />
                  <text
                    x="172.5"
                    y="42.5"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="currentColor"
                    fontSize="18"
                    fontWeight="500"
                    className="text-[#D787DF] text-5xl sm:text-5xl md:text-5xl lg:text-4xl font-rubik-glitch group-hover:text-[#D787DF]"
                  >
                    Cancel_
                  </text>
                  <text
                    x="175"
                    y="40"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="currentColor"
                    fontSize="18"
                    fontWeight="500"
                    className="text-[#FCF551] text-5xl sm:text-5xl md:text-5xl lg:text-4xl font-rubik-glitch group-hover:text-[#D787DF]"
                  >
                    Cancel_
                  </text>
                  <path
                    d="M57.833 77.3337H216.509V80.1763H57.833"
                    fill="#FCF551"
                  />
                  <path
                    d="M6.81738 77.3337H39.7035V80.1763H6.81738"
                    fill="#FCF551"
                  />
                  <path
                    d="M328.036 5.33105V50.8877V52.1631L332 51.0169V50.8877V5.33105H328.036Z"
                    fill="#75E8F0"
                  />
                </svg>
              </>
            )}
          </div>

          {/* Tombol submit dihapus karena tidak diperlukan lagi */}
        </div>
      </div>
    </>
  );
}
