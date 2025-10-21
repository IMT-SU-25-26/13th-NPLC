"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AdvanceUserButtonProps {
  userId: string;
  availableRounds: {
    id: string;
    round: number;
    batch: number;
    status: string;
  }[];
}

export default function AdvanceUserButton({ userId, availableRounds }: AdvanceUserButtonProps) {
  const [selectedRoundId, setSelectedRoundId] = useState<string>(
    availableRounds.length > 0 ? availableRounds[0].id : ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAdvanceUser = async () => {
    if (!selectedRoundId) {
      toast.error("Please select a round first");
      return;
    }

    if (confirm(`Are you sure you want to advance this user to the selected round?`)) {
      setIsLoading(true);
      
      try {
        const response = await fetch("/api/admin/advance-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            roundId: selectedRoundId,
          }),
        });

        const data = await response.json();
        
        if (data.success) {
          toast.success("User advanced to selected round successfully!");
          router.refresh();
        } else {
          toast.error(data.errorMessage || "Failed to advance user");
        }
      } catch (error) {
        console.error("Error advancing user:", error);
        toast.error("An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">
          Select Target Round
        </label>
        <select
          value={selectedRoundId}
          onChange={(e) => setSelectedRoundId(e.target.value)}
          disabled={isLoading || availableRounds.length === 0}
          className="w-full px-4 py-2 bg-[#18182a]/80 border-2 border-[#FCF551] rounded-md
            text-[#75E8F0] focus:outline-none focus:border-[#75E8F0]"
        >
          {availableRounds.map((round) => (
            <option key={round.id} value={round.id}>
              Round {round.round} (Batch {round.batch}) - {round.status}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleAdvanceUser}
        disabled={isLoading || !selectedRoundId}
        className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300
          bg-green-500/20 hover:bg-green-500/30 border-2 border-green-500 text-green-400
          ${(isLoading || !selectedRoundId) ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </div>
        ) : (
          "Advance User to Selected Round"
        )}
      </button>
    </div>
  );
}