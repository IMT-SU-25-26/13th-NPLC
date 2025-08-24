// deploy
"use client";

import Link from "next/link";
import { signUp } from "@/lib/actions";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import "@/styles/registeraccount.css";
export default function SignUpForm() {
  const initialState = { errorMessage: "" };
  const [state, formAction, pending] = useActionState(signUp, initialState);

  useEffect(() => {
    if (state.errorMessage) {
      toast.error(state.errorMessage);
    }
    if (state.success) {
      toast.success("Registration successful!");
      // Force router refresh to update server components
      window.location.href = "/"; // Redirect to home page
    }
  }, [state.errorMessage, state.success]);

  return (
    <div
      className="form-register-container overflow-hidden bg-contain bg-center backdrop-blur-lg bg-[url('/register/MobileAccountRegistration.svg')] sm:bg-[url('/register/AccountRegistrationBG.svg')] 
      w-full
      flex items-center justify-center z-[8] bg-no-repeat"
    >
      <form
        action={formAction}
        className="w-full form-register relative flex flex-col justify-center items-center"
      >
         <h1 className="register-title-text flex text-xl md:text-2xl justify-center font-bold text-white mb-2 mt-5">
              Register
            </h1>
        <div className="input-container gap-4 flex flex-col justify-center items-center">
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="fullname">Fullname</label>
            <input
              id="fullname"
              type="text"
              name="fullname"
              required
              className="cursor-target input-field w-full  bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none 
              text-sm sm:text-base md:text-base lg:text-base
              text-[#75E8F0] placeholder-[#75E8F0]     [text-shadow:_0_0_20px_rgba(0,255,255,1)] 
                            placeholder:[text-shadow:_0_0_8px_rgba(0,255,255,0.8)] focus:outline-none focus:border-yellow-300 transition-colors"
              placeholder="Fullname"
            />
          </div>
           <div className="flex flex-col gap-1 w-full">
            <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            required
            className="cursor-target input-field w-full  bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none 
              text-sm sm:text-base md:text-base lg:text-base
              text-[#75E8F0] placeholder-[#75E8F0]     [text-shadow:_0_0_20px_rgba(0,255,255,1)] 
                            placeholder:[text-shadow:_0_0_8px_rgba(0,255,255,0.8)] focus:outline-none focus:border-yellow-300 transition-colors"
            placeholder="Email"
          />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              required
              className="cursor-target input-field w-full bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none 
              text-sm sm:text-base md:text-base lg:text-base
              text-[#75E8F0]     [text-shadow:_0_0_20px_rgba(0,255,255,1)] 
                            placeholder:[text-shadow:_0_0_8px_rgba(0,255,255,0.8)] placeholder-[#75E8F0] focus:outline-none focus:border-yellow-300 transition-colors"
            placeholder="Password"
          />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="nisn">NISN</label>
            <input
              id="nisn"
              type="number"
              name="nisn"
            required
            className="cursor-target input-field w-full bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none 
              text-sm sm:text-base md:text-base lg:text-base
              text-[#75E8F0]     [text-shadow:_0_0_20px_rgba(0,255,255,1)] 
                    placeholder:[text-shadow:_0_0_8px_rgba(0,255,255,0.8)] placeholder-[#75E8F0] focus:outline-none focus:border-yellow-300 transition-colors
              [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="NISN"
          />
          </div>

          {/* Login Button */}
          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="registeraccount-button group flex w-full"
              disabled={pending}
              aria-disabled={pending}
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 417 138"
                fill="none"
                className="cursor-target"
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
                  className="svg-text text-[#D787DF] text-3xl sm:text-2xl md:text-4xl lg:text-5xl font-rubik-glitch group-hover:text-[#D787DF]"
                >
                  {`${pending ? "Pending_" : "Register_"}`}
                </text>
                <text
                  x="210"
                  y="70"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="currentColor"
                  fontSize="18"
                  fontWeight="500"
                  className="svg-text text-[#75E7F0] text-3xl sm:text-2xl md:text-4xl lg:text-5xl font-rubik-glitch group-hover:text-[#75E7F0]"
                >
                  {`${pending ? "Pending_" : "Register_"}`}
                </text>
              </svg>
            </button>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <Link
              href="/login"
              className="cursor-target question-text text-[#75E8F0] hover:underline font-semibold text-sm sm:text-base [text-shadow:_0_0_20px_rgba(0,255,255,1)] "
            >
              {"Already have an account? Login"}
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
