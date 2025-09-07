"use client";

import React, { useEffect, useState } from "react";
import "@/styles/competitive-programming-multiple-regis.css";
import { Team } from "@/types/competition";
import { cancelRegistration } from "@/lib/competition";
import { useSession } from "@/lib/auth/auth_client";
import { toast } from "sonner";
import { getRegistrationStatus } from "@/lib/competition";
import { UploadWidget } from "@/components/CloudinaryWidget";
import { updatePaymentProof } from "@/lib/competition";

export default function CompetitionDetailsDisplay({
  teams,
  competitionTitle,
  competition_id,
}: {
  teams: Team;
  competitionTitle: string;
  competition_id: string;
}) {
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string>("");
  const [uploadedFilePublicId, setUploadedFilePublicId] = useState<string>("");
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  // State untuk status registrasi, diharapkan bernilai: 'accepted', 'pending', atau 'failed'
  const [registrationStatus, setRegistrationStatus] = useState<
    "accepted" | "pending" | "failed" | null
  >(null);

  useEffect(() => {
    if (!teams?.members?.[0]?.team_name) return;

    const fetchStatus = async () => {
      try {
        const response = await getRegistrationStatus(
          competition_id,
          teams.members[0].team_name
        );
        if (
          response === "accepted" ||
          response === "pending" ||
          response === "failed"
        ) {
          setRegistrationStatus(response);
        }
      } catch (error) {
        console.error(error);
        toast.error("Could not check your registration status.");
        setRegistrationStatus("failed"); // Set status ke failed jika fetch gagal
      }
    };

    fetchStatus();
  }, [competition_id, teams]);

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

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate that a file has been uploaded
    if (!uploadedFileUrl) {
      toast.error("Please upload a payment proof before submitting.");
      return;
    }

    try {
      await updatePaymentProof(
        competition_id,
        teams.members[0].team_name,
        uploadedFileUrl
      );
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
      window.location.reload();
    }
  };

  const deleteRegistration = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to cancel this team's registration? This action cannot be undone."
    );
    if (!isConfirmed) return;

    try {
      // Loop untuk memastikan anggota tim yang benar yang membatalkan
      for (const member of teams.members) {
        if (member.user.id === session.user.id) {
          await cancelRegistration(member.competition_id, member.team_name);
          break; // Keluar dari loop setelah pembatalan berhasil
        }
      }
      toast.success("Registration cancelled successfully!");
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel registration. Please try again.");
    }
  };

  // Helper untuk menentukan teks dan style status
  const getStatusProps = () => {
    switch (registrationStatus) {
      case "accepted":
        return {
          text: "Registration Accepted",
          className: "border-[#4ADE80] text-[#4ADE80]", // Green
        };
      case "pending":
        return {
          text: "Registration Pending",
          className: "border-[#FBBF24] text-[#FBBF24]", // Yellow
        };
      case "failed":
        return {
          text: "Registration Failed",
          className: "border-[#EF4444] text-[#EF4444]", // Red
        };
      default:
        return {
          text: "Checking status...",
          className: "border-gray-500 text-gray-500",
        };
    }
  };

  const { text: statusText, className: statusClassName } = getStatusProps();

  return (
    <>
      <form
        onSubmit={handlePay}
        className="competition-detail-form-container mt-[5%] mb-[10%] relative z-[10] backdrop-blur-2xl flex w-[80%] md:w-[70%] lg:w-[70%] xl:w-[45%] flex-col items-center justify-center gap-4 lg:gap-6 p-6 lg:p-12 rounded-xl shadow-lg border-[8px] border-[#FCE551]"
      >
        <h2 className="competition-detail-competition-title font-RopoSans-Regular text-2xl md:text-3xl font-bold text-center text-white">
          {competitionTitle}
        </h2>
        <div
          className={`px-4 competition-detail-registration-status-border rounded-2xl text-lg md:text-xl py-2 bg-[#18182a]/80 border-2 text-center ${statusClassName} [text-shadow:_0_0_20px_rgba(0,255,255,0.5)] overflow-x-auto whitespace-nowrap`}
        >
          {statusText}
        </div>

        <div className="gap-4 flex flex-col justify-center items-center w-full">
          {/* ... Tampilan detail tim lainnya tetap sama ... */}
          <div className="flex flex-col w-full">
            <label className="competition-detail-label text-left w-full font-ropasans-regular text-md md:text-2xl">
              Team Name
            </label>
            <div className="competition-detail-data px-[2.5%] text-md md:text-2xl py-2 bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none text-[#75E8F0] [text-shadow:_0_0_20px_rgba(0,255,255,1)] overflow-x-auto whitespace-nowrap">
              {teams.team_name || "-"}
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label className="competition-detail-label text-left w-full font-ropasans-regular text-md md:text-2xl">
              School Name
            </label>
            <div className="competition-detail-data px-[2.5%] text-md md:text-2xl py-2 bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none text-[#75E8F0] [text-shadow:_0_0_20px_rgba(0,255,255,1)] overflow-x-auto whitespace-nowrap">
              {teams.school_name || "-"}
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label className="competition-detail-label text-left w-full font-ropasans-regular text-md md:text-2xl">
              Contact Person Line ID
            </label>
            <div className="competition-detail-data px-[2.5%] text-md md:text-2xl py-2 bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none text-[#75E8F0] [text-shadow:_0_0_20px_rgba(0,255,255,1)] overflow-x-auto whitespace-nowrap">
              {teams.members[0]?.contact_person_number || "-"}
            </div>
          </div>
          {/* ... Fields lainnya seperti School Name, Contact, etc. */}
          {teams.members.map((member, index) => (
            <div
              key={index}
              className="flex w-full flex-col justify-center gap-4"
            >
              <div className="flex w-full flex-col sm:flex-row justify-center gap-4">
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
              <div className="flex flex-col w-full">
                <label className="competition-detail-label text-left w-full font-ropasans-regular text-md md:text-2xl">
                  Link Twibbon
                </label>
                <div
                  className="competition-detail-data px-[2.5%] text-md md:text-2xl py-2 bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none 
                text-[#75E8F0] [text-shadow:_0_0_20px_rgba(0,255,255,1)] 
                  overflow-x-auto whitespace-nowrap"
                >
                  {member.link_twiboon || "-"}
                </div>
              </div>
            </div>
          ))}
          {/* Container untuk tombol aksi */}
          <div className="details-button-container flex flex-col justify-center items-center sm:flex-row sm:gap-4 w-full mt-4">
            {registrationStatus === "pending" && <></>}
            {registrationStatus === "failed" && (
              // Tombol "Remove" untuk status failed/expired
              <div className="flex flex-col gap-8 justify-center w-full">
                {/* Hidden inputs for file upload data */}
                <input type="hidden" name="imageUrl" value={uploadedFileUrl} />
                <input
                  type="hidden"
                  name="imagePublicId"
                  value={uploadedFilePublicId}
                />

                <UploadWidget
                  onUploadSuccess={(url, publicId) => {
                    setUploadedFileUrl(url);
                    setUploadedFilePublicId(publicId || "");
                    toast.success("Payment proof uploaded successfully!");
                    console.log("File uploaded:", url, publicId);
                  }}
                  folder="payment-proofs"
                  allowedFormats={["jpg", "jpeg", "png"]}
                  label="Upload Payment Proof"
                  name="bukti_transfer"
                  required={true}
                />
                <div className="flex gap-4 justify-center items-center w-full">
                  <button
                    type="submit"
                    className="multiple-regis-button group flex 
              w-[60%] sm:w-[45%] lg:w-[40%] sm:mt-[-1rem] md:mt-[0rem] lg:mt-[0rem]"
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
                        className={`${"group-hover:fill-[#000000]"} transition-colors duration-200`}
                      />
                      <path
                        d="M98.49 0L0 38.8754V85.6927L64.3021 117.09H309.815L408.305 78.2145V0H98.49Z"
                        fill="#661109"
                        className={`${"group-hover:fill-[#000000] "} transition-colors duration-200`}
                      />
                      <path
                        d="M8.69482 126.217H50.0006L8.69482 106.044V126.217Z"
                        fill={`#FCF551`}
                        className={`${"group-hover:fill-[#c651fc]"} transition-colors duration-200`}
                      />
                      <path
                        d="M107.177 9.12653L8.69482 47.9947V94.8193L72.9969 126.216H318.51L417 87.341V9.12653H107.177Z"
                        fill={`#FCF551`}
                        className={`${"group-hover:fill-[#c651fc] "} transition-colors duration-200`}
                      />
                      <path
                        d="M72.6392 132.396H271.941V137.262H72.6392"
                        fill={`#FCF551`}
                        className={`${"group-hover:fill-[#c651fc] "} transition-colors duration-200`}
                      />
                      <path
                        d="M8.56348 132.396H49.8693V137.262H8.56348"
                        fill={`#FCF551`}
                        className={`${"group-hover:fill-[#c651fc] "} transition-colors duration-200`}
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
                        Pay now_
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
                        Pay now_
                      </text>
                    </svg>
                  </button>
                  <button
                    onClick={deleteRegistration}
                    className="multiple-regis-button group flex 
              w-[60%] sm:w-[45%] lg:w-[40%] sm:mt-[-1rem] md:mt-[0rem] lg:mt-[0rem]"
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
                        className={`${"group-hover:fill-[#000000]"} transition-colors duration-200`}
                      />
                      <path
                        d="M98.49 0L0 38.8754V85.6927L64.3021 117.09H309.815L408.305 78.2145V0H98.49Z"
                        fill="#661109"
                        className={`${"group-hover:fill-[#000000] "} transition-colors duration-200`}
                      />
                      <path
                        d="M8.69482 126.217H50.0006L8.69482 106.044V126.217Z"
                        fill={`#FCF551`}
                        className={`${"group-hover:fill-[#c651fc]"} transition-colors duration-200`}
                      />
                      <path
                        d="M107.177 9.12653L8.69482 47.9947V94.8193L72.9969 126.216H318.51L417 87.341V9.12653H107.177Z"
                        fill={`#FCF551`}
                        className={`${"group-hover:fill-[#c651fc] "} transition-colors duration-200`}
                      />
                      <path
                        d="M72.6392 132.396H271.941V137.262H72.6392"
                        fill={`#FCF551`}
                        className={`${"group-hover:fill-[#c651fc] "} transition-colors duration-200`}
                      />
                      <path
                        d="M8.56348 132.396H49.8693V137.262H8.56348"
                        fill={`#FCF551`}
                        className={`${"group-hover:fill-[#c651fc] "} transition-colors duration-200`}
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
                        Cancel_
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
                        Cancel_
                      </text>
                    </svg>
                  </button>
                </div>
                <h1 className="text-center text-xl sm:text-2xl font-bold text-[#75E8F0] [text-shadow:_0_0_15px_rgba(117,232,240,0.8)] mb-2">
                  Click pay now to update your payment proof
                </h1>
              </div>
            )}
          </div>
        </div>
      </form>
    </>
  );
}
