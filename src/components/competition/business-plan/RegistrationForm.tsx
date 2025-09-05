"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { registerForCompetition } from "@/lib/server-actions/competition";
import "@/styles/multiple-regis.css";
import { useSession } from "@/lib/auth/auth_client";
import {
  getRegistrationIdByCompetitionAndUser,
  // updateRegistrationMidtransToken,
} from "@/lib/competition";
import { UploadWidget } from "@/components/CloudinaryWidget";
import Link from "next/link";

interface CompetitiveProgrammingFormProps {
  competitionId: string;
  competitionTitle: string;
  userId: string;
}

export default function BusinessPlanRegistrationForm({
  competitionId,
  competitionTitle,
  userId,
}: CompetitiveProgrammingFormProps) {
  const [pending, setPending] = useState<boolean>(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string>("");
  const [uploadedFilePublicId, setUploadedFilePublicId] = useState<string>("");
  const { data: session } = useSession(); // 2. Panggil hook useSession

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate that a file has been uploaded
    if (!uploadedFileUrl) {
      toast.error("Please upload a payment proof before submitting.");
      return;
    }

    try {
      setPending(true);
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);

      const regis = await registerForCompetition(formData, competitionId);
      const registration_id = (await getRegistrationIdByCompetitionAndUser(
        competitionId,
        userId
      )) as string;

      if (!registration_id) {
        if (!regis || !regis.success) {
          toast.error(regis?.errorMessage?.toString() || "Registration failed");
          return;
        } else {
          toast.error("Failed to get registration ID.");
          return;
        }
      }

      if (!session?.user?.email) {
        toast.error("You must be logged in to register.");
        return;
      }

      toast.success("Registration Success!", { duration: 5000 });
      setTimeout(() => {
        window.location.href = "/competition-details";
      }, 3000);
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
        className="w-[21rem] sm:w-[30rem] md:w-[40rem] lg:w-[40rem] xl:w-[35rem] 2xl:w-[40rem] md:mb-30 lg:mb-40 p-2 py-16 md:py-[6rem] sm:py-auto sm:p-5 md:p-5 lg:p-10 xl:p-10 flex backdrop-blur-lg flex-col items-center justify-center gap-1.5 sm:gap-2 md:gap-2 lg:gap-6 rounded-xl shadow-lg bg-[url('/register/MultipleformBG2-extraSmall.svg')] sm:bg-[url('/register/MultipleformBG2-small.svg')] md:bg-[url('/register/MultipleformBG2.svg')] lg:bg-[url('/register/MultipleformBG2.svg')] bg-contain bg-center bg-no-repeat
        "
      >
        <h2 className="font-RopoSans-Regular text-lg md:text-3xl lg:text-3xl font-bold text-center text-white">
          {competitionTitle}
        </h2>

        <div className="gap-2 sm:gap-4 flex flex-col justify-center items-center w-[85%]">
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
              className="cursor-target px-[2.5%] w-full bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none 
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
              className="cursor-target px-[2.5%] w-full  bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none 
              text-sm sm:text-base md:text-base lg:text-base
              text-[#75E8F0] placeholder-[#75E8F0]     [text-shadow:_0_0_20px_rgba(0,255,255,1)] 
                            placeholder:[text-shadow:_0_0_8px_rgba(0,255,255,0.8)] focus:outline-none focus:border-yellow-300 transition-colors"
              placeholder="Enter your school name"
              required
            />
          </div>
          <div className="multiple-regis-name-nisn-container flex w-full justify-center gap-1 sm:gap-4">
            <div className="flex flex-col w-full">
              <label
                className="regis-label text-left w-full font-ropasans-regular text-2xl"
                htmlFor="contact_person_number"
              >
                Contact Person Line ID
              </label>
              <input
                id="contact_person_number"
                type="text"
                name="contact_person_number"
                className="cursor-target px-[2.5%] w-full bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none 
              text-sm sm:text-base md:text-base lg:text-base
              text-[#75E8F0] placeholder-[#75E8F0]     [text-shadow:_0_0_20px_rgba(0,255,255,1)] 
                            placeholder:[text-shadow:_0_0_8px_rgba(0,255,255,0.8)] focus:outline-none focus:border-yellow-300 transition-colors"
                placeholder="Enter contact person line ID"
                required
              />
            </div>
            <div className="flex flex-col w-full">
              <label
                className="regis-label text-left w-full font-ropasans-regular text-2xl"
                htmlFor="link_twiboon"
              >
                Twibon Link <Link className="underline" target="_blank" href="https://drive.google.com/drive/u/1/folders/18KHSP5Na7wal4sr-HEPvAtCPSvQ3LG8m">Link template</Link>
              </label>
              <input
                id="link_twiboon"
                type="url"
                name="link_twiboon"
                className="cursor-target px-[2.5%] w-full bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none 
                  text-sm sm:text-base md:text-base lg:text-base
                  text-[#75E8F0] placeholder-[#75E8F0]     [text-shadow:_0_0_20px_rgba(0,255,255,1)] 
                                placeholder:[text-shadow:_0_0_8px_rgba(0,255,255,0.8)] focus:outline-none focus:border-yellow-300 transition-colors"
                placeholder="Enter Twibon link"
                required
              />
            </div>
          </div>
          {[1, 2, 3, 4].map((i) => (
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
                  className="cursor-target px-[2.5%] bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none 
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
                  inputMode="numeric"
                  onWheel={(e) => (e.target as HTMLInputElement).blur()}
                  name={`nisn${i}`}
                  className="cursor-target px-[2.5%] bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none 
                  text-sm w-full sm:text-base md:text-base lg:text-base
                  text-[#75E8F0] placeholder-[#75E8F0]     [text-shadow:_0_0_20px_rgba(0,255,255,1)] 
                                placeholder:[text-shadow:_0_0_8px_rgba(0,255,255,0.8)] focus:outline-none focus:border-yellow-300 transition-colors"
                  placeholder={`Enter NISN ${i}`}
                  required={i === 1} // Only first member is required
                  onKeyDown={(e) => {
                    if (
                      e.key === "e" ||
                      e.key === "E" ||
                      e.key === "+" ||
                      e.key === "-"
                    ) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
            </div>
          ))}

          {/* Hidden inputs for file upload data */}
          <input type="hidden" name="imageUrl" value={uploadedFileUrl} />
          <input
            type="hidden"
            name="imagePublicId"
            value={uploadedFilePublicId}
          />

          <UploadWidget
            useDefaultClass={false}
            onUploadSuccess={(url, publicId) => {
              setUploadedFileUrl(url);
              setUploadedFilePublicId(publicId || "");
              toast.success("Payment proof uploaded successfully!", { duration: 4000 });
              console.log("File uploaded:", url, publicId);
            }}
            folder="payment-proofs"
            allowedFormats={["jpg", "jpeg", "png"]}
            label={
              <>
                Price: Rp 40.000
                <br />
                Transfer to 008674351649 (Blu by BCA)
                <br />
                a/n Chrisensia Abigail Gani
                <br />
                Berita: (Team Name_CompetitionName)
              </>
            }
            name="bukti_transfer"
            required={true}
          />

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
