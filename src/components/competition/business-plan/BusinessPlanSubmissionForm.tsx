"use client";
import { BusinessPlanFileSubmit } from "@/components/utils/BusinessPlanFileSubmit";
import { twMerge } from "tailwind-merge";
import "@/styles/business-plan-submission.css";
import { useSession } from "@/lib/auth/auth_client";
import { FormEvent, useState, useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import {
  checkBPSubmission,
  findTeam,
  submitBusinessPlan,
  getBusinessPlanSubmission,
} from "@/lib/competition";

// Define a proper type for the submission data

interface BusinessPlanSubmissionData {
  success: boolean;
  errorMessage?: string;
  data: {
    id?: string;
    user_id?: string;
    team_name?: string;
    competition_id?: string;
    proposal?: string;
    surat_pernyataan_orisinalitas?: string;
    figma_link?: string;
    submittedAt?: Date;
  } | null;
}

export default function BusinessPlanSubmissionForm() {
  const [pending, setPending] = useState(false);
  const [team, setTeam] = useState<string>("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submissionData, setSubmissionData] = useState<BusinessPlanSubmissionData | null>(null);
  const [uploadedProposalFileUrl, setProposalUploadedFileUrl] =
    useState<string>("");
  const [uploadedSuratFileUrl, setSuratUploadedFileUrl] = useState<string>("");
  const [figmaLink, setFigmaLink] = useState<string>("");

  const { data: session } = useSession();

  // Check if user has already submitted when component mounts or session changes
  useEffect(() => {
    const checkUserSubmission = async () => {
      if (!session?.user?.id) return;
      const team = await findTeam(session.user.id, "cmegpbi5m0001hke9buhvhrw4");
      setTeam(team);
      
      try {
        const submissionStatus = await checkBPSubmission(
          team,
          "cmegpbi5m0001hke9buhvhrw4"
        );
        setHasSubmitted(submissionStatus);
        
        // If submitted, get submission data
        if (submissionStatus) {
          const data = await getBusinessPlanSubmission(team, "cmegpbi5m0001hke9buhvhrw4");
          setSubmissionData(data as BusinessPlanSubmissionData);
          
          // Set the submission data to display the files
          if (data && data.success && data.data) {
            setProposalUploadedFileUrl(data.data.proposal || "");
            setSuratUploadedFileUrl(data.data.surat_pernyataan_orisinalitas || "");
            setFigmaLink(data.data.figma_link || "");
          }
        }
      } catch (error) {
        console.error("Error checking submission status:", error);
      }
    };

    checkUserSubmission();
  }, [session]);

  // Early return after all hooks have been called
  if (!session) {
    return <div className="text-white">You are not logged in!</div>;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);

    try {
      const formData = new FormData(event.currentTarget);
      const link = formData.get("figma_link") as string;

      if (!session?.user?.id) {
        toast.error("You are not logged in!");
        return;
      }

      if (!link || !link.trim()) {
        toast.error("Please provide a valid Figma chat link");
        return;
      }

      if (!uploadedProposalFileUrl) {
        toast.error("Please upload your proposal");
        setPending(false);
        return;
      }

      if (!uploadedSuratFileUrl) {
        toast.error("Please upload your Surat Pernyataan Orisinalitas");
        setPending(false);
        return;
      }
      const result = await submitBusinessPlan(
        session.user.id,
        team,
        "cmegpbi5m0001hke9buhvhrw4",
        uploadedProposalFileUrl,
        uploadedSuratFileUrl,
        link
      );

      if (result && result.success !== false) {
        toast.success("Submission successful!", {
          description: "You have successfully submitted the required documents for this competition.",
          duration: 4000,
        });
        setHasSubmitted(true);
        setSubmissionData(result as BusinessPlanSubmissionData);
      } else {
        toast.error("Submission failed due to", {
          description: result?.errorMessage || "Please try again later.",
          duration: 4000,
        });
      }
    } catch (error) {
      console.error("Failed to submit:", error);
      toast.error("Submission failed due to connection issues", {
        description: "Please check your internet connection and try again.",
        duration: 4000,
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} method="POST" className="form-wrapper relative backdrop-blur-2xl z-[11] w-[90%] sm:w-[80%] lg:w-[45%] flex flex-col gap-1 sm:gap-4 place-items-center justify-items-center border-[8px] border-[#FCE551] rounded-lg p-[1rem] sm:p-[2rem] lg:p-[4rem]">
      {/* Business Plan Header */}
      <div className="w-full text-center mb-6">
        <h1 className="text-white business-plan text-3xl sm:text-5xl lg:text-7xl font-bold mb-4">
          Business Plan
        </h1>
        <div className="text-white time text-sm sm:text-base lg:text-2xl">
          <p>
            <span className="font-semibold">Opened:</span> Monday, 13 October 2025
          </p>
          <p>
            <span className="font-semibold">Due:</span> Monday, 20 October 2025
          </p>
        </div>
      </div>

      <div className="w-full">
        <label className="submission-label text-left w-full font-ropasans-regular text-sm sm:text-xl lg:text-2xl">
          Proposal
        </label>
        
        {/* Display uploaded proposal file if exists */}
        {uploadedProposalFileUrl && (
          <div  className={twMerge(
          `cursor-target px-[3%] w-full min-h-[40px] bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none 
                text-sm sm:text-base md:text-lg lg:text-lg
                text-[#75E8F0] placeholder-[#75E8F0] [text-shadow:_0_0_20px_rgba(0,255,255,1)] 
                placeholder:[text-shadow:_0_0_8px_rgba(0,255,255,0.8)] focus:outline-none focus:border-yellow-300 transition-colors submission-widget
                py-[0.1rem] sm:py-[1rem] flex items-center justify-start gap-2 hover:bg-[#18182a]/90`,
          "single-all-input multiple-all-input"
        )}>
            <div className="flex gap-1 sm:gap-2 text-sm sm:text-lg">
              Upload Success.{" "}
              <Link
                href={uploadedProposalFileUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="underline hover:text-[#FCF551]"
              >
                View file
              </Link>
            </div>
          </div>
        )}
        
        {/* Show the BusinessPlanFileSubmit only if not submitted */}
        {!hasSubmitted && (
          <BusinessPlanFileSubmit
            onUploadSuccess={(url, publicId) => {
              setProposalUploadedFileUrl(url);
              toast.success("Proposal uploaded successfully!");
            }}
            folder="business-plan"
            allowedFormats={["pdf"]}
            label=""
            name="proposal"
            disabled={hasSubmitted}
          />
        )}
      </div>
      
      <div className="w-full">
        <label className="submission-label text-left w-full font-ropasans-regular text-sm sm:text-xl lg:text-2xl">
          Surat Pernyataan Orisinalitas <Link className="regis-label underline" target="_blank" href="https://docs.google.com/document/d/1JWcw_uA8RxkQjusjkJedLu1SQ47blBcSNvZ4L_4il_0/edit?usp=sharing">{`[Link template]`}</Link>
        </label>
        
        {/* Display uploaded surat file if exists */}
        {uploadedSuratFileUrl && (
          <div className={twMerge(
          `cursor-target px-[3%] w-full min-h-[40px] bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none 
                text-sm sm:text-base md:text-lg lg:text-lg
                text-[#75E8F0] placeholder-[#75E8F0] [text-shadow:_0_0_20px_rgba(0,255,255,1)] 
                placeholder:[text-shadow:_0_0_8px_rgba(0,255,255,0.8)] focus:outline-none focus:border-yellow-300 transition-colors submission-widget
                py-[0.1rem] sm:py-[1rem] flex items-center justify-start gap-2 hover:bg-[#18182a]/90`,
          "single-all-input multiple-all-input"
        )}>
            <div className="flex gap-1 sm:gap-2 text-sm sm:text-lg">
              Upload Success{" "}
              <Link 
                href={uploadedSuratFileUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="underline hover:text-[#FCF551]"
              >
                View file
              </Link>
            </div>
          </div>
        )}
        
        {/* Show the BusinessPlanFileSubmit only if not submitted */}
        {!hasSubmitted && (
          <BusinessPlanFileSubmit
            onUploadSuccess={(url, publicId) => {
              setSuratUploadedFileUrl(url);
              toast.success("Surat Pernyataan Orisinalitas proof uploaded successfully!");
              console.log("File uploaded:", url, publicId);
            }}
            folder="business-plan"
            allowedFormats={["pdf"]}
            label=""
            name="surat_pernyataan_orisinalitas"
            disabled={hasSubmitted}
          />
        )}
      </div>
      
      <label
        className="submission-label text-left w-full font-ropasans-regular text-sm sm:text-xl lg:text-2xl"
        htmlFor="figma_link"
      >
        Figma Link
      </label>
      <input
        id="figma_link"
        type="url"
        name="figma_link"
        value={figmaLink}
        onChange={(e) => setFigmaLink(e.target.value)}
        className={twMerge(
          `cursor-target px-[3%] w-full min-h-[40px] bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none 
                text-sm sm:text-base md:text-lg lg:text-lg
                text-[#75E8F0] placeholder-[#75E8F0] [text-shadow:_0_0_20px_rgba(0,255,255,1)] 
                placeholder:[text-shadow:_0_0_8px_rgba(0,255,255,0.8)] focus:outline-none focus:border-yellow-300 transition-colors submission-widget
                py-[0.1rem] sm:py-[1rem] flex items-center justify-center gap-2 hover:bg-[#18182a]/90`,
          "single-all-input multiple-all-input"
        )}
        placeholder="Enter Figma Link"
        required
        disabled={hasSubmitted}
      />
      
      {/* Submit Button */}
      <div className="flex justify-center mt-3">
        <button
          type="submit"
          className="all-button cursor-target group flex 
              w-[70%] sm:w-[85%] lg:w-full sm:mt-[-1rem] lg:mt-[0rem]"
          disabled={pending || hasSubmitted}
          aria-disabled={pending || hasSubmitted}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 417 138"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 117.09H41.3058L0 96.9246V117.09Z"
              fill="#661109"
              className={`${
                pending || hasSubmitted
                  ? "fill-zinc-800"
                  : "group-hover:fill-[#000000] "
              } transition-colors duration-200`}
            />
            <path
              d="M98.49 0L0 38.8754V85.6927L64.3021 117.09H309.815L408.305 78.2145V0H98.49Z"
              fill="#661109"
              className={`${
                pending || hasSubmitted
                  ? "fill-zinc-800"
                  : "group-hover:fill-[#000000] "
              } transition-colors duration-200`}
            />
            <path
              d="M8.69482 126.217H50.0006L8.69482 106.044V126.217Z"
              fill={`${pending || hasSubmitted ? "#822020" : "#FCF551"}`}
              className={`${
                pending || hasSubmitted
                  ? "fill-zinc-600"
                  : "group-hover:fill-[#c651fc] "
              } transition-colors duration-200`}
            />
            <path
              d="M107.177 9.12653L8.69482 47.9947V94.8193L72.9969 126.216H318.51L417 87.341V9.12653H107.177Z"
              fill={`${pending || hasSubmitted ? "#822020" : "#FCF551"}`}
              className={`${
                pending || hasSubmitted
                  ? "fill-zinc-600"
                  : "group-hover:fill-[#c651fc] "
              } transition-colors duration-200`}
            />
            <path
              d="M72.6392 132.396H271.941V137.262H72.6392"
              fill={`${pending || hasSubmitted ? "#822020" : "#FCF551"}`}
              className={`${
                pending || hasSubmitted
                  ? "fill-zinc-800"
                  : "group-hover:fill-[#c651fc] "
              } transition-colors duration-200`}
            />
            <path
              d="M8.56348 132.396H49.8693V137.262H8.56348"
              fill={`${pending || hasSubmitted ? "#822020" : "#FCF551"}`}
              className={`${
                pending || hasSubmitted
                  ? "fill-zinc-800"
                  : "group-hover:fill-[#c651fc] "
              } transition-colors duration-200`}
            />
            <path
              d="M412.021 9.12653V87.1198V89.3034L417 87.341V87.1198V9.12653H412.021Z"
              fill="#75E8F0"
            />
            <text
              x="200"
              y="75"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="currentColor"
              fontSize="18"
              fontWeight="500"
              className="text-[#D787DF] text-5xl sm:text-2xl md:text-4xl lg:text-5xl font-rubik-glitch group-hover:text-[#D787DF]"
            >
              {hasSubmitted
                ? "Submitted_"
                : `${pending ? "Pending_" : "Submit_"}`}
            </text>
            <text
              x="210"
              y="70"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="currentColor"
              fontSize="18"
              fontWeight="500"
              className="text-[#75E7F0] text-5xl sm:text-2xl md:text-4xl lg:text-5xl font-rubik-glitch group-hover:text-[#75E7F0]"
            >
              {hasSubmitted
                ? "Submitted_"
                : `${pending ? "Pending_" : "Submit_"}`}
            </text>
          </svg>
        </button>
      </div>
    </form>
  );
}
