"use client";

import { resetPassword } from "@/lib/actions";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import "@/styles/login.css";

interface ResetPasswordFormProps {
  token: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const initialState = { errorMessage: "", success: false };
  const [state, formAction, pending] = useActionState(resetPassword, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.errorMessage) {
      toast.error(state.errorMessage);
    }
    if (state.success && state.message) {
      toast.success(state.message);
      // Redirect to login after successful reset
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  }, [state.errorMessage, state.success, state.message, router]);

  return (
    <div className="flex flex-col items-center justify-center w-full pb-20 sm:pb-12 gap-2">
        <form
          action={formAction}
          className="relative z-[10] backdrop-blur-2xl flex w-[80%] md:w-[70%] lg:w-[70%] xl:w-[45%] flex-col items-center justify-center gap-4 lg:gap-6 p-6 lg:p-12 rounded-xl shadow-lg border-[8px] border-[#FCE551]"
        >
          <input type="hidden" name="token" value={token} />
          <h1 className="flex text-xl md:text-2xl justify-center font-bold text-white mb-4 sm:mb-6">
              Set New Password
            </h1>

            {/* New Password Input */}
            <div className="mb-2 sm:mb-4 w-full">
              <label
                htmlFor="password"
                className="all-text password-text block text-white font-medium mb-1 text-sm sm:text-base font-RopaSans-Regular"
              >
                New Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                required
                minLength={6}
                className="cursor-target all-input w-full bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none 
              px-3 py-2 sm:px-4 sm:py-3 md:px-4 md:py-3 lg:px-4 lg:py-3
              text-sm sm:text-base md:text-base lg:text-base
              text-[#75E8F0] placeholder-[#75E8F0] [text-shadow:_0_0_20px_rgba(0,255,255,1)] 
              placeholder:[text-shadow:_0_0_8px_rgba(0,255,255,0.8)] focus:outline-none focus:border-yellow-300 transition-colors"
                placeholder="Enter new password (min 6 characters)"
              />
            </div>

            {/* Submit Button */}
            <div className="flex w-full justify-center">
              <button
                type="submit"
                className="cursor-target group flex 
              w-[70%] sm:w-[43%] lg:w-[40%] sm:mt-[-1rem] lg:mt-[0rem]"
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
                    {`${pending ? "Pending_" : "Confirm_"}`}
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
                    {`${pending ? "Pending_" : "Confirm_"}`}
                  </text>
                </svg>
              </button>
            </div>
        </form>
    </div>
  );
}