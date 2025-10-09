"use client";

import Link from "next/link";
import { signIn } from "@/lib/actions";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import "@/styles/login.css";
import Image from "next/image";

export default function LoginForm() {
  const initialState = { errorMessage: "" };
  const [state, formAction, pending] = useActionState(signIn, initialState);
  useEffect(() => {
    if (state.errorMessage) {
      toast.error(state.errorMessage);
    } // Check for successful login
    if (state.success) {
      toast.success("Login successful!");
      // Force router refresh to update server components
      window.location.href = "/"; // Redirect to home page
    }
  }, [state.errorMessage, state.success]);

  return (
    <div className="flex flex-col items-center justify-center w-full pb-20 sm:pb-12 gap-2">
      <Image
        className="account-text z-[6] w-[30rem] h-auto"
        src={"/login/account.svg"}
        width={100}
        height={100}
        alt="account-text"
      />
      <div
        className="form-login overflow-hidden backdrop-blur-lg bg-[url('/login/loginpanelphone2.svg')] sm:bg-[url('/login/loginpanel.svg')] 
      w-full max-w-[20rem] sm:max-w-[45rem] lg:max-w-[50rem] h-[18rem] 
      sm:h-[24.5rem] lg:h-[27rem]
      flex items-center justify-center z-[8] bg-no-repeat bg-center mx-auto"
        style={{
          backgroundSize: "contain",
        }}
      >
        <form
          action={formAction}
          style={{
            backgroundImage: 'url("/login/loginpanel.svg")',
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          className="relative w-[90%] sm:w-[85%] md:w-[85%] lg:w-[85%] 
        -mt-[4rem] sm:-mt-[6rem] md:-mt-[6rem] lg:-mt-[6rem]"
        >
          <div className="absolute inset-0 flex flex-col justify-center 
        py-4 sm:py-20 md:py-20 lg:py-20 
        px-3 sm:px-8 md:px-12 lg:px-16">
            {/* Mobile Title */}
            <h1 className="flex sm:hidden text-lg md:text-2xl justify-center font-bold text-white mb-1 mt-4 sm:mt-5">
              Login
            </h1>

            {/* Email Input */}
            <div className="mb-1 sm:mb-1.5 w-full">
              <label
                htmlFor="email"
                className="all-text email-text block text-white font-medium mb-1 text-xs sm:text-base font-RopaSans-Regular"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                className="cursor-target all-input w-full  bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none 
              px-2 py-1.5 sm:px-4 sm:py-3 md:px-4 md:py-3 lg:px-4 lg:py-3
              text-xs sm:text-base md:text-base lg:text-base
              text-[#75E8F0] placeholder-[#75E8F0]     [text-shadow:_0_0_20px_rgba(0,255,255,1)] 
                            placeholder:[text-shadow:_0_0_8px_rgba(0,255,255,0.8)] focus:outline-none focus:border-yellow-300 transition-colors"
                placeholder="Email"
              />
            </div>

            {/* Password Input */}
            <div className="mb-2 sm:mb-8 w-full">
              <label
                htmlFor="password"
                className="all-text password-text block text-white font-medium mb-1 text-xs sm:text-base font-RopaSans-Regular"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                required
                className="cursor-target all-input w-full bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none 
              px-2 py-1.5 sm:px-4 sm:py-3 md:px-4 md:py-3 lg:px-4 lg:py-3
              text-xs sm:text-base md:text-base lg:text-base
              text-[#75E8F0]     [text-shadow:_0_0_20px_rgba(0,255,255,1)] 
                            placeholder:[text-shadow:_0_0_8px_rgba(0,255,255,0.8)] placeholder-[#75E8F0] focus:outline-none focus:border-yellow-300 transition-colors"
                placeholder="Password"
              />
            </div>

            {/* Login Button */}
            <div className="flex justify-center mt-2 sm:mt-0">
              <button
                type="submit"
                className="all-button cursor-target group flex 
              w-[50%] sm:w-[43%] lg:w-[40%] sm:mt-[-1rem] lg:mt-[0rem]"
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
                    className="text-[#D787DF] text-4xl sm:text-2xl md:text-4xl lg:text-5xl font-rubik-glitch group-hover:text-[#D787DF]"
                  >
                    {`${pending ? "Pending_" : "Login_"}`}
                  </text>
                  <text
                    x="210"
                    y="70"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="currentColor"
                    fontSize="18"
                    fontWeight="500"
                    className="text-[#75E7F0] text-2xl sm:text-2xl md:text-4xl lg:text-5xl font-rubik-glitch group-hover:text-[#75E7F0]"
                  >
                    {`${pending ? "Pending_" : "Login_"}`}
                  </text>
                </svg>
              </button>
            </div>

            {/* Add Forgot Password Link */}
            <div className="text-center mt-1">
              <Link
                href="/forget-password"
                className="cursor-target text-[#75E8F0] hover:underline password font-semibold text-xs sm:text-base [text-shadow:_0_0_20px_rgba(0,255,255,1)]"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Register Link */}
            <div className="text-center mt-1">
              <Link
                href="/register"
                className="cursor-target text-[#75E8F0] mb-0 password hover:underline font-semibold text-xs sm:text-base [text-shadow:_0_0_20px_rgba(0,255,255,1)]"
              >
                {"Don't have an account? Register"}
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
