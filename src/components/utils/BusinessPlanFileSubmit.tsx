"use client";

import { CldUploadWidget } from "next-cloudinary";
import { twMerge } from "tailwind-merge";


interface UploadWidgetProps {
    onUploadSuccess: (url: string, publicId?: string) => void;
    folder: string;
    allowedFormats: string[];
    label?: React.ReactNode;
    name?: string;
    required?: boolean;
    useDefaultClass?: boolean;
    disabled?: boolean;
}

export function BusinessPlanFileSubmit({
    onUploadSuccess,
    folder,
    allowedFormats,
    label,
    name,
    useDefaultClass = true,
    disabled = false,
}: UploadWidgetProps) {
    return (
        <div className="widget-gap flex flex-col gap-1 sm:gap-4 lg:gap-4 w-full">
            <div>
                {label && (
                    <label
                        className="submission-label text-left w-full font-ropasans-regular text-sm sm:text-xl lg:text-2xl"
                        htmlFor={name}
                    >
                        {label}
                    </label>
                )}
            </div>
            <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_UPLOAD_PRESET || "ml_default"}
                options={{
                    folder: folder,
                    clientAllowedFormats: allowedFormats,
                    resourceType: "auto",
                }}
                onSuccess={(result) => {
                    if (
                        result.event === "success" &&
                        result.info &&
                        typeof result.info === "object" &&
                        "secure_url" in result.info &&
                        "public_id" in result.info
                    ) {
                        onUploadSuccess(result.info.secure_url, result.info.public_id);
                    }
                }}
            >
                {({ open }) => (
                    <button
                        type="button"
                        onClick={() => !disabled && open()}
                        disabled={disabled}
                        className={twMerge(`cursor-target px-[3%] w-full min-h-[40px] bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none 
                text-sm sm:text-base md:text-lg lg:text-lg
                text-[#75E8F0] placeholder-[#75E8F0] [text-shadow:_0_0_20px_rgba(0,255,255,1)] 
                placeholder:[text-shadow:_0_0_8px_rgba(0,255,255,0.8)] focus:outline-none focus:border-yellow-300 transition-colors submission-widget
                py-[0.1rem] sm:py-[1rem] flex items-center justify-center gap-2 hover:bg-[#18182a]/90`, 
                useDefaultClass && "single-all-input multiple-all-input",
                disabled && "opacity-50 cursor-not-allowed")}
                    >
                        <svg
                            className="submission-icon w-5 h-5 sm:w-6 lg:w-8 lg:h-8 sm:h-6 text-[#75E8F0]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                        </svg>
                        <p className="submission-widget-text text-sm sm:text-base lg:text-xl">
                            {disabled ? "Already Submitted" : "Choose File to Upload (PDF)"}
                        </p>
                    </button>
                )}
            </CldUploadWidget>
        </div>
    );
}
