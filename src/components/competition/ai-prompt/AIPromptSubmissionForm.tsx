"use client";
import { useSession } from "@/lib/auth/auth_client";
import { submitAIPrompt } from "@/lib/competition";
import { checkAIPromptSubmission } from "@/lib/competition";
import { findTeam } from "@/lib/competition";
import Link from "next/link";
import { FormEvent, useState, useEffect } from "react";
import { toast } from "sonner";

export default function AIPromptSubmissionForm({currentRound, questionLink}: {currentRound: string, questionLink: string}) {
  const [pending, setPending] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  
  const {
    data: session,
  } = useSession();

  // Check if user has already submitted when component mounts or session changes
  useEffect(() => {
    const checkUserSubmission = async () => {
      if (!session?.user?.id) return;
      const team = await findTeam(session.user.id, "cmegpc6sx0002hke9gxo7hd6u");
      try {
        const submissionStatus = await checkAIPromptSubmission(
          team,
          "cmegpc6sx0002hke9gxo7hd6u", 
          currentRound
        );
        setHasSubmitted(submissionStatus);
      } catch (error) {
        console.error("Error checking submission status:", error);
      }
    };
    
    checkUserSubmission();
  }, [session, currentRound]); // Add currentRound here

  // Early return after all hooks have been called
  if (!session) {
    return <div className="text-white">You are not logged in!</div>;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);

    try {
      const formData = new FormData(event.currentTarget);
      const link = formData.get("link_ai_chat") as string;
      const trial_and_error_link = formData.get("link_trial_and_error") as string;

      if (!session?.user?.id) {
        toast.error("You are not logged in!");
        return;
      }

      if (!link || !link.trim()) {
        toast.error("Please provide a valid AI chat link");
        return;
      }

      const result = await submitAIPrompt(session.user.id, "cmegpc6sx0002hke9gxo7hd6u", link,trial_and_error_link, currentRound);
      
      if (result && result.success !== false) {
        toast.success("Submission successful!", {
          description: "Your AI prompt link has been submitted successfully.",
          duration: 4000
        });
        setHasSubmitted(true);
      } else {
        toast.error("Submission failed", {
          description: result?.errorMessage || "Please try again later.",
          duration: 4000
        });
      }
    } catch (error) {
      console.error("Failed to submit AI prompt:", error);
      toast.error("Submission failed due to connection issues", {
        description: "Please check your internet connection and try again.",
        duration: 4000
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} method="POST" className="form-wrapper relative backdrop-blur-2xl z-[11] w-[90%] sm:w-[80%] lg:w-[45%] flex flex-col gap-1 sm:gap-4 place-items-center justify-items-center border-[8px] border-[#FCE551] rounded-lg p-[1rem] sm:p-[2rem] lg:p-[4rem]">
      {/* Business Plan Header */}
      <div className="w-full text-center mb-6">
        <h1 className="text-white text-3xl sm:text-5xl lg:text-7xl font-bold mb-4">
          AI Prompt
        </h1>
        {/* <div className="text-white text-sm sm:text-base lg:text-2xl">
          <p>
            <span className="font-semibold">Opened:</span> {currentRound}
          </p>
          <p>
            <span className="font-semibold">Due:</span> Monday, 28 September
            2025
          </p>
        </div> */}
      </div>

      <div className="w-full text-xl hover:underline"><Link href={questionLink}>Click here to see the question here</Link></div>
      <div className="flex flex-col gap-1 sm:gap-2 lg:gap-2 w-full">
        <label
          htmlFor="trial_and_error_link"
          className="text-start w-full text-white text-lg sm:text-xl mb-2"
        >
          Link Trial & Error
        </label>
        <input
          type="url"
          id="ai_chat_link"
          name="link_ai_chat"
          placeholder="https://example.com/your-ai-chat"
          className="cursor-target px-[2.5%] py-5 w-full bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none 
              text-sm sm:text-base md:text-base lg:text-base
              text-[#75E8F0] placeholder-[#75E8F0]     [text-shadow:_0_0_20px_rgba(0,255,255,1)] 
                            placeholder:[text-shadow:_0_0_8px_rgba(0,255,255,0.8)] focus:outline-none focus:border-yellow-300 transition-colors"
        />
        <label
          htmlFor="trial_and_error_link"
          className="text-start w-full text-white text-lg sm:text-xl mb-2"
        >
          Trial & Error Link
        </label>
        <input
          type="url"
          id="ai_chat_link"
          name="link_trial_and_error"
          placeholder="https://example.com/your-ai-chat"
          className="cursor-target px-[2.5%] py-5 w-full bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none 
              text-sm sm:text-base md:text-base lg:text-base
              text-[#75E8F0] placeholder-[#75E8F0]     [text-shadow:_0_0_20px_rgba(0,255,255,1)] 
                            placeholder:[text-shadow:_0_0_8px_rgba(0,255,255,0.8)] focus:outline-none focus:border-yellow-300 transition-colors"
        />
      </div>
      {/* Login Button */}
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
          pending || hasSubmitted ? "fill-zinc-800" : "group-hover:fill-[#000000] "
              } transition-colors duration-200`}
            />
            <path
              d="M98.49 0L0 38.8754V85.6927L64.3021 117.09H309.815L408.305 78.2145V0H98.49Z"
              fill="#661109"
              className={`${
          pending || hasSubmitted ? "fill-zinc-800" : "group-hover:fill-[#000000] "
              } transition-colors duration-200`}
            />
            <path
              d="M8.69482 126.217H50.0006L8.69482 106.044V126.217Z"
              fill={`${pending || hasSubmitted ? "#822020" : "#FCF551"}`}
              className={`${
          pending || hasSubmitted ? "fill-zinc-600" : "group-hover:fill-[#c651fc] "
              } transition-colors duration-200`}
            />
            <path
              d="M107.177 9.12653L8.69482 47.9947V94.8193L72.9969 126.216H318.51L417 87.341V9.12653H107.177Z"
              fill={`${pending || hasSubmitted ? "#822020" : "#FCF551"}`}
              className={`${
          pending || hasSubmitted ? "fill-zinc-600" : "group-hover:fill-[#c651fc] "
              } transition-colors duration-200`}
            />
            <path
              d="M72.6392 132.396H271.941V137.262H72.6392"
              fill={`${pending || hasSubmitted ? "#822020" : "#FCF551"}`}
              className={`${
          pending || hasSubmitted ? "fill-zinc-800" : "group-hover:fill-[#c651fc] "
              } transition-colors duration-200`}
            />
            <path
              d="M8.56348 132.396H49.8693V137.262H8.56348"
              fill={`${pending || hasSubmitted ? "#822020" : "#FCF551"}`}
              className={`${
          pending || hasSubmitted ? "fill-zinc-800" : "group-hover:fill-[#c651fc] "
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
               {hasSubmitted ? "Submitted_" : `${pending ? "Pending_" : "Submit_"}`}
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
              {hasSubmitted ? "Submitted_" : `${pending ? "Pending_" : "Submit_"}`}
              
            </text>
          </svg>
        </button>
      </div>
    </form>
  );
}
