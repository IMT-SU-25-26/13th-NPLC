"use client";

import { useState } from "react";
import { toast } from "sonner";
import { updateRegistrationStatusAction } from "./actions";
import { useRouter } from "next/navigation";

interface StatusUpdateButtonProps {
  registrationId: string;
  currentStatus: string;
  newStatus: "pending" | "accepted" | "failed";
  buttonText: string;
  buttonColor: string;
}

export default function StatusUpdateButton({
  registrationId,
  currentStatus,
  newStatus,
  buttonText,
  buttonColor,
}: StatusUpdateButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleStatusUpdate = async () => {
    if (currentStatus === newStatus) {
      toast.info(`Registration is already ${newStatus}`);
      return;
    }

    setIsLoading(true);
    try {
      await updateRegistrationStatusAction(registrationId, newStatus);
      toast.success(`Registration status updated to ${newStatus}`);
      router.refresh();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update registration status");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleStatusUpdate}
      disabled={isLoading || currentStatus === newStatus}
      className={`w-full px-4 py-2 rounded-lg border transition-colors text-sm font-semibold
        ${currentStatus === newStatus 
          ? "bg-gray-500/20 border-gray-500 text-gray-500 cursor-not-allowed" 
          : buttonColor
        }
        ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {isLoading ? "Updating..." : buttonText}
      {currentStatus === newStatus && " (Current)"}
    </button>
  );
}
