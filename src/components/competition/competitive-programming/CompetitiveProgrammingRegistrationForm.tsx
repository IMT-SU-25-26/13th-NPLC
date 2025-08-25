"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { registerForCompetition } from "@/lib/server-actions/competition";
import "@/styles/competitive-programming-multiple-regis.css";
import { updateIsPaid } from "@/lib/competition";
import {
  getRegistrationIdByCompetitionAndUser,
  updateRegistrationMidtransToken,
} from "@/lib/competition";

interface CompetitiveProgrammingFormProps {
  competitionId: string;
  competitionTitle: string;
  userId: string;
}

export default function CompetitiveProgrammingForm({
  competitionId,
  competitionTitle,
  userId,
}: CompetitiveProgrammingFormProps) {
  const [pending, setPending] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setPending(true);
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);

      await registerForCompetition(formData, competitionId);
      const registration_id = (await getRegistrationIdByCompetitionAndUser(
        competitionId,
        userId
      )) as string;

      if (!registration_id) {
        toast.error("Failed to get registration ID.");
        return;
      }

      const team_name = formData.get("team_name") as string;
      
      const data = {
        id: registration_id,
        productName: competitionTitle + "Registration",
        price: 10000,
        quantity: 1,
      };

      const response = await fetch(`/api/tokenizer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const requestData = await response.json();
      const token = requestData.token as string;
      if (!token) {
        toast.error("Failed to get payment token.");
        setPending(false); // Matikan status pending
        return;
      }
       await updateRegistrationMidtransToken(team_name ,competitionId, token);
      if (window.snap === undefined) {
        toast.error("Payment gateway is not loaded. Please try again later.");
        setPending(false);
        return;
      }
      // Panggil snap.pay dengan callbacks
      window.snap.pay(requestData.token, {
        onSuccess: async function () {
            /* Anda dapat menambahkan logika di sini, misalnya redirect atau menampilkan pesan sukses */
            await updateIsPaid(competitionId, team_name, true);
            toast.success("Payment successful!");
            form.reset(); // Reset form setelah pembayaran berhasil
            window.location.href = "/competition-details"
            // Contoh: window.location.href = '/dashboard/payment/success';
        },
        onPending: function () {
          /* Logika untuk status pembayaran pending */
          toast.info("Waiting for your payment...");
          form.reset(); // Reset form karena pembayaran sudah diproses
        },
        onError: async function () {
          /* Logika jika terjadi error */
          await updateIsPaid(competitionId, team_name, false);

          toast.error("Payment failed. Please try again.");
          form.reset(); // Reset form karena pembayaran sudah diproses
        },
        onClose: async function () {
          toast.warning(
            "Payment pending please complete your payment within 24 hours"
          );
          form.reset(); // Reset form karena pembayaran sudah diproses
          window.location.href = "/competition-details"
        },
      });
    } catch (error) {
      console.error(error);

      // Display the specific error message
      if (error instanceof Error) {
        toast.error(error.message, {
          duration: 5000,
          description: "Please check your registration details and try again.",
        });
      } else {
        toast.error("Registration failed. Please try again.", {
          duration: 5000,
        });
      }
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="multiple-regis-form flex backdrop-blur-lg flex-col items-center justify-center gap-1.5 sm:gap-2 md:gap-2 lg:gap-6 rounded-xl shadow-lg bg-[url('/register/MultipleformBG.svg')] sm:bg-[url('/register/MultipleformBG.svg')] bg-contain bg-center bg-no-repeat"
      >
        <h2 className="font-RopoSans-Regular multiple-regis-title text-lg md:text-3xl lg:text-3xl font-bold text-center text-white">
          {competitionTitle}
        </h2>

        <div className="multiple-regis-input-container gap-2 sm:gap-4 flex flex-col justify-center items-center w-[85%]">
          <div className="flex flex-col w-full">
            <label
              className="regis-label text-left w-full font-ropasans-regular text-2xl"
              htmlFor="team_name"
            >
              Team Name
            </label>
            <input
              id="team_name"
              type="text"
              name="team_name"
              className="cursor-target px-[2.5%] w-full multiple-all-input bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none 
              text-sm sm:text-base md:text-base lg:text-base
              text-[#75E8F0] placeholder-[#75E8F0]     [text-shadow:_0_0_20px_rgba(0,255,255,1)] 
                            placeholder:[text-shadow:_0_0_8px_rgba(0,255,255,0.8)] focus:outline-none focus:border-yellow-300 transition-colors"
              placeholder="Enter your team name"
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label
              className="regis-label text-left w-full font-ropasans-regular text-2xl"
              htmlFor="school_name"
            >
              School Name
            </label>
            <input
              id="school_name"
              type="text"
              name="school_name"
              className="cursor-target px-[2.5%] w-full multiple-all-input  bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none 
              text-sm sm:text-base md:text-base lg:text-base
              text-[#75E8F0] placeholder-[#75E8F0]     [text-shadow:_0_0_20px_rgba(0,255,255,1)] 
                            placeholder:[text-shadow:_0_0_8px_rgba(0,255,255,0.8)] focus:outline-none focus:border-yellow-300 transition-colors"
              placeholder="Enter your school name"
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label
              className="regis-label text-left w-full font-ropasans-regular text-2xl"
              htmlFor="contact_person_number"
            >
              Contact Person Number
            </label>
            <input
              id="contact_person_number"
              type="text"
              name="contact_person_number"
              className="cursor-target px-[2.5%] w-full multiple-all-input bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none 
              text-sm sm:text-base md:text-base lg:text-base
              text-[#75E8F0] placeholder-[#75E8F0]     [text-shadow:_0_0_20px_rgba(0,255,255,1)] 
                            placeholder:[text-shadow:_0_0_8px_rgba(0,255,255,0.8)] focus:outline-none focus:border-yellow-300 transition-colors"
              placeholder="Enter contact person line ID"
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label
              className="regis-label text-left w-full font-ropasans-regular tefxt-2xl"
              htmlFor="link_twiboon"
            >
              Twibon Link
            </label>
            <input
              id="link_twiboon"
              type="url"
              name="link_twiboon"
              className="cursor-target px-[2.5%] w-full multiple-all-input bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none 
                  text-sm sm:text-base md:text-base lg:text-base
                  text-[#75E8F0] placeholder-[#75E8F0]     [text-shadow:_0_0_20px_rgba(0,255,255,1)] 
                                placeholder:[text-shadow:_0_0_8px_rgba(0,255,255,0.8)] focus:outline-none focus:border-yellow-300 transition-colors"
              placeholder="Enter Twibon link"
              required
            />
          </div>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="multiple-regis-name-nisn-container flex w-full justify-center gap-1 sm:gap-4"
            >
              <div className="flex flex-col w-full">
                <label
                  className="regis-label text-left w-full font-ropasans-regular text-2xl"
                  htmlFor={`fullname${i}`}
                >
                  Full Name
                </label>
                <input
                  id={`fullname${i}`}
                  type="text"
                  name={`fullname${i}`}
                  className="cursor-target px-[2.5%] multiple-all-input bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none 
                  text-sm w-full sm:text-base md:text-base lg:text-base
                  text-[#75E8F0] placeholder-[#75E8F0]     [text-shadow:_0_0_20px_rgba(0,255,255,1)] 
                                placeholder:[text-shadow:_0_0_8px_rgba(0,255,255,0.8)] focus:outline-none focus:border-yellow-300 transition-colors"
                  placeholder={`Enter full name ${i}`}
                  required={i === 1} // Only first member is required
                />
              </div>

              <div className="flex flex-col w-full">
                <label
                  className="regis-label text-left w-full font-ropasans-regular text-2xl"
                  htmlFor={`nisn${i}`}
                >
                  NISN
                </label>
                <input
                  id={`nisn${i}`}
                  type="number"
                  name={`nisn${i}`}
                  className="cursor-target px-[2.5%] multiple-all-input bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none 
                  text-sm w-full sm:text-base md:text-base lg:text-base
                  text-[#75E8F0] placeholder-[#75E8F0]     [text-shadow:_0_0_20px_rgba(0,255,255,1)] 
                                placeholder:[text-shadow:_0_0_8px_rgba(0,255,255,0.8)] focus:outline-none focus:border-yellow-300 transition-colors"
                  placeholder={`Enter NISN ${i}`}
                  required={i === 1} // Only first member is required
                   onKeyDown={(e) => {
                  if (
                    e.key === 'e' ||
                    e.key === 'E' ||
                    e.key === '+' ||
                    e.key === '-'
                  ) {
                    e.preventDefault();
                  }
                }}
                />
              </div>
            </div>
          ))}
          <button
            type="submit"
            className="multiple-regis-button group flex 
              w-[60%] sm:w-[45%] lg:w-[40%] sm:mt-[-1rem] md:mt-[0rem] lg:mt-[0rem]"
            disabled={pending}
            aria-disabled={pending}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 417 138"
              className="cursor-target"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 117.09H41.3058L0 96.9246V117.09Z"
                fill="#661109"
                className={`${
                  pending ? "" : "group-hover:fill-[#000000] "
                } transition-colors duration-200`}
              />
              <path
                d="M98.49 0L0 38.8754V85.6927L64.3021 117.09H309.815L408.305 78.2145V0H98.49Z"
                fill="#661109"
                className={`${
                  pending ? "" : "group-hover:fill-[#000000] "
                } transition-colors duration-200`}
              />
              <path
                d="M8.69482 126.217H50.0006L8.69482 106.044V126.217Z"
                fill={`${pending ? "#822020" : "#FCF551"}`}
                className={`${
                  pending ? "" : "group-hover:fill-[#c651fc] "
                } transition-colors duration-200`}
              />
              <path
                d="M107.177 9.12653L8.69482 47.9947V94.8193L72.9969 126.216H318.51L417 87.341V9.12653H107.177Z"
                fill={`${pending ? "#822020" : "#FCF551"}`}
                className={`${
                  pending ? "" : "group-hover:fill-[#c651fc] "
                } transition-colors duration-200`}
              />
              <path
                d="M72.6392 132.396H271.941V137.262H72.6392"
                fill={`${pending ? "#822020" : "#FCF551"}`}
                className={`${
                  pending ? "" : "group-hover:fill-[#c651fc] "
                } transition-colors duration-200`}
              />
              <path
                d="M8.56348 132.396H49.8693V137.262H8.56348"
                fill={`${pending ? "#822020" : "#FCF551"}`}
                className={`${
                  pending ? "" : "group-hover:fill-[#c651fc] "
                } transition-colors duration-200`}
              />
              <text
                x="200"
                y="75"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="currentColor"
                fontSize="18"
                fontWeight="500"
                className="text-[#D787DF] text-5xl sm:text-5xl md:text-5xl lg:text-5xl font-rubik-glitch group-hover:text-[#D787DF]"
              >
                Register_
              </text>
              <text
                x="210"
                y="70"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="currentColor"
                fontSize="18"
                fontWeight="500"
                className="text-[#75E7F0] text-5xl sm:text-5xl md:text-5xl lg:text-5xl font-rubik-glitch group-hover:text-[#75E7F0]"
              >
                Register_
              </text>
            </svg>
          </button>
        </div>
      </form>
    </>
  );
}
