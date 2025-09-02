"use client";

import { CldUploadWidget } from "next-cloudinary";
import { twMerge } from "tailwind-merge";

interface UploadWidgetProps {
  onUploadSuccess: (url: string, publicId?: string) => void;
  folder: string;
  allowedFormats: string[];
  label?: string;
  name?: string;
  required?: boolean;
  useDefaultClass?: boolean;
}

export function UploadWidget({
  onUploadSuccess,
  folder,
  allowedFormats,
  label = "Upload Payment Proof",
  name = "bukti_transfer",
  useDefaultClass = true,
}: UploadWidgetProps) {
  return (
    <div className="flex flex-col w-full">
      <label
        className="regis-label text-left w-full font-ropasans-regular text-2xl"
        htmlFor={name}
      >
        {label}
      </label>
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
            onClick={() => open()}
            className={twMerge(`cursor-target px-[2.5%] w-full h-0 bg-[#18182a]/80 border-2 border-[#FCF551] rounded-none 
                text-sm sm:text-base md:text-base lg:text-base
                text-[#75E8F0] placeholder-[#75E8F0] [text-shadow:_0_0_20px_rgba(0,255,255,1)] 
                placeholder:[text-shadow:_0_0_8px_rgba(0,255,255,0.8)] focus:outline-none focus:border-yellow-300 transition-colors
                py-[0.95em] flex items-center justify-center gap-2 hover:bg-[#18182a]/90`, useDefaultClass && "multiple-all-input" )}
          >
            <svg
              className="w-5 h-5 text-[#75E8F0]"
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
            <span className={twMerge(!useDefaultClass&&"text-sm sm:text-base")}>Choose File to Upload (PNG, JPG, JPEG)</span>
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
}
