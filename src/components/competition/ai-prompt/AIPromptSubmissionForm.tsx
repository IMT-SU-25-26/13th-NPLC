"use client";
import { BusinessPlanFileSubmit } from "@/components/utils/BusinessPlanFileSubmit";
import { useState } from "react";

export default function AIPromptSubmissionForm() {
  const [pending, setPending] = useState(false);
  return (
    <form className="form-wrapper relative backdrop-blur-2xl z-[11] w-[90%] sm:w-[80%] lg:w-[45%] flex flex-col gap-1 sm:gap-4 place-items-center justify-items-center border-[8px] border-[#FCE551] rounded-lg p-[1rem] sm:p-[2rem] lg:p-[4rem]">
      {/* Business Plan Header */}
      <div className="w-full text-center mb-6">
        <h1 className="text-white text-3xl sm:text-5xl lg:text-7xl font-bold mb-4">
          AI Prompt
        </h1>
        <div className="text-white text-sm sm:text-base lg:text-2xl">
          <p>
            <span className="font-semibold">Opened:</span> Sunday, 28 September
            2025
          </p>
          <p>
            <span className="font-semibold">Due:</span> Monday, 28 September
            2025
          </p>
        </div>
      </div>

      <div className="w-full"></div>
      <div className="flex flex-col gap-1 sm:gap-2 lg:gap-2 w-full">
        <label
          htmlFor="ai_chat_link"
          className="text-start w-full text-white text-lg sm:text-xl mb-2"
        >
          Link AI Chat
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
      </div>
      {/* Login Button */}
      <div className="flex justify-center mt-3">
        <button
          type="submit"
          className="all-button cursor-target group flex 
              w-[70%] sm:w-[85%] lg:w-full sm:mt-[-1rem] lg:mt-[0rem]"
          disabled={pending}
          aria-disabled={pending}
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
              {`${pending ? "Pending_" : "Submit_"}`}
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
              {`${pending ? "Pending_" : "Submit_"}`}
            </text>
          </svg>
        </button>
      </div>
    </form>
  );
}
