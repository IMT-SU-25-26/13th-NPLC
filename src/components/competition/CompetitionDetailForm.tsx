"use client";

import React, { useEffect, useState } from "react";
import "@/styles/competitive-programming-multiple-regis.css";
import { Team } from "@/types/competition";
import { updateIsPaid, cancelRegistration } from "@/lib/competition";
import { useSession } from "@/lib/auth/auth_client";
import { toast } from "sonner";

export default function CompetitionDetailsDisplay({
  teams, // Properti 'teams' di sini adalah sebuah objek tunggal (Team), bukan array (Team[]), sesuai desain awal.
  competitionTitle,
  is_paid,
  competition_id,
}: {
  teams: Team; // Tipe data tidak diubah, tetap objek tunggal.
  competitionTitle: string;
  is_paid: boolean;
  competition_id: string;
}) {
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const [registrationStatus, setRegistrationStatus] = useState<string | null>(null);
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(`/api/check_payment_status?competitionId=${competition_id}&t_name=${teams.members[0].team_name}`);
        if (!response.ok) {
          throw new Error("Failed to fetch status");
        }
        const data = await response.json();
        setRegistrationStatus(data.status);
      } catch (error) {
        console.error(error);
        toast.error("Could not check your registration status.");
      }
    };

    fetchStatus();
  }, [competitionTitle])

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
    window.snap.pay(teams.members[0].registration_midtrans_token, {
      onSuccess: async function () {
        await updateIsPaid(
          teams.members[0].competition_id,
          teams.members[0].team_name,
          true
        );

        window.location.href = "/competition-details";
      },
      onPending: function () {},
      onError: async function () {
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
      return;
    }

    try {
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

      alert("Registration cancelled successfully!");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to cancel registration. Please try again.");
    }
  };

  return (
    <>
      <div className="competition-detail-form-container mt-[5%] mb-[10%] relative z-[10] backdrop-blur-2xl flex w-[80%] md:w-[70%] lg:w-[70%] xl:w-[45%] flex-col items-center justify-center gap-4 lg:gap-6 p-6 lg:p-12 rounded-xl shadow-lg border-[8px] border-[#FCE551]">
        <h2 className="competition-detail-competition-title font-RopoSans-Regular text-2xl md:text-3xl font-bold text-center text-white">
          {competitionTitle}
        </h2>
       <div
        className={`px-4 competition-detail-registration-status-border rounded-2xl text-lg md:text-xl py-2 bg-[#18182a]/80 border-2 text-center
          ${
            is_paid
              ? "border-[#4ADE80] text-[#4ADE80]" // Green for Success
              : registrationStatus === "PENDING"
              ? "border-[#FBBF24] text-[#FBBF24]" // Yellow for Pending
              : "border-[#EF4444] text-[#EF4444]" // Red for Expired or Not Paid
          }
          [text-shadow:_0_0_20px_rgba(0,255,255,0.5)] 
          overflow-x-auto whitespace-nowrap`}
      >
        {is_paid
          ? "Registration Success"
          : registrationStatus === "PENDING"
          ? "Registration Pending"
          : registrationStatus === "EXPIRED"
          ? "Registration Expired"
          : "Not Paid"}
      </div>

        <div className="gap-4 flex flex-col justify-center items-center w-full">
          <div className="flex flex-col w-full">
            <label className="competition-detail-label text-left w-full font-ropasans-regular text-md md:text-2xl">
              Team Name
            </label>
            <div
              className="competition-detail-data px-[2.5%] text-md md:text-2xl py-2 bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none 
                text-[#75E8F0] [text-shadow:_0_0_20px_rgba(0,255,255,1)] 
                overflow-x-auto whitespace-nowrap"
            >
              {teams.team_name || "-"}
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label className="competition-detail-label text-left w-full font-ropasans-regular text-md md:text-2xl">
              School Name
            </label>
            <div
              className="competition-detail-data px-[2.5%] text-md md:text-2xl py-2 bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none 
                text-[#75E8F0] [text-shadow:_0_0_20px_rgba(0,255,255,1)] 
                overflow-x-auto whitespace-nowrap"
            >
              {teams.members[0].school_name || "-"}
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label className="competition-detail-label text-left w-full font-ropasans-regular text-md md:text-2xl">
              Contact Person Number
            </label>
            <div
              className="competition-detail-data px-[2.5%] text-md md:text-2xl py-2 bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none 
                text-[#75E8F0] [text-shadow:_0_0_20px_rgba(0,255,255,1)] 
                overflow-x-auto whitespace-nowrap"
            >
              {teams.members[0].contact_person_number || "-"}
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label className="competition-detail-label text-left w-full font-ropasans-regular text-md md:text-2xl">
              Twibon Link
            </label>
            <div
              className="competition-detail-data px-[2.5%] text-md md:text-2xl py-2 bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none 
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

          {teams.members.map((member, index) => (
            <div
              key={index}
              className="flex w-full flex-col sm:flex-row justify-center gap-4"
            >
              <div className="flex flex-col w-full">
                <label className="competition-detail-label text-left w-full font-ropasans-regular text-md md:text-2xl">
                  Full Name {index + 1}
                </label>
                <div
                  className="competition-detail-data px-[2.5%] text-md md:text-2xl py-2 bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none 
                text-[#75E8F0] [text-shadow:_0_0_20px_rgba(0,255,255,1)] 
                  overflow-x-auto whitespace-nowrap"
                >
                  {member.user.name || "-"}
                </div>
              </div>

              <div className="flex flex-col w-full">
                <label className="competition-detail-label text-left w-full font-ropasans-regular text-md md:text-2xl">
                  NISN {index + 1}
                </label>
                <div
                  className="competition-detail-data px-[2.5%] text-md md:text-2xl py-2 bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none 
                text-[#75E8F0] [text-shadow:_0_0_20px_rgba(0,255,255,1)] 
                  overflow-x-auto whitespace-nowrap"
                >
                  {member.user.nomor_induk_siswa_nasional || "-"}
                </div>
              </div>
            </div>
          ))}
          <div className="details-button-container flex flex-col justify-center items-center sm:flex-row items-center sm:gap-4 w-full mt-4">
            {is_paid ? (
              <></>
            ) : (
              <>
              {registrationStatus === "PENDING" && (
                <>
                <svg
                  width="332"
                  height="81"
                  viewBox="0 0 332 81"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="cursor-target group w-full max-w-[332px]"
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
                  className="cursor-target group w-full max-w-[332px]"
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
              {registrationStatus === "EXPIRED" && (
                 <svg
                  width="332"
                  height="81"
                  viewBox="0 0 332 81"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="cursor-target group w-full max-w-[332px]"
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
                    Remove_
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
                    Remove_
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
              )}
             </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}