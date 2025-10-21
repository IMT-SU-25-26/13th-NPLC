"use client";

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface Round {
    id: string;
    round: number;
    batch: number;
    status: "not_started" | "ongoing" | "finished";
}

interface RoundStatusManagerProps {
    rounds: Round[];
    changeRoundStatus: (formData: FormData) => Promise<{ success: boolean, error?: string }>;
}

export default function RoundStatusManager({ rounds, changeRoundStatus }: RoundStatusManagerProps) {
    const [selectedRound, setSelectedRound] = useState<string>(rounds.length > 0 ? rounds[0].id : "");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [newStatus, setNewStatus] = useState<"not_started" | "ongoing" | "finished">("ongoing");
    const router = useRouter();
    
    const selectedRoundData = rounds.find(round => round.id === selectedRound);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!selectedRound) {
            toast.error("Please select a round first");
            return;
        }
        
        setIsLoading(true);
        
        try {
            const formData = new FormData();
            formData.append('roundId', selectedRound);
            formData.append('newStatus', newStatus);
            
            const result = await changeRoundStatus(formData);
            
            if (result.success) {
                toast.success(`Round status updated to ${newStatus}`);
                router.refresh();
            } else {
                toast.error(result.error || "Failed to update round status");
            }
        } catch (error) {
            console.error("Error updating round status:", error);
            toast.error("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Select Round</label>
                <select
                    value={selectedRound}
                    onChange={(e) => setSelectedRound(e.target.value)}
                    className="w-full px-4 py-2 bg-[#18182a]/80 border-2 border-[#FCF551] rounded-md text-[#75E8F0] focus:outline-none focus:border-[#75E8F0]"
                    disabled={isLoading}
                >
                    {rounds.map((round) => (
                        <option key={round.id} value={round.id}>
                            Round {round.round} (Batch {round.batch}) - {formatStatus(round.status)}
                        </option>
                    ))}
                </select>
            </div>
            
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Set Status To</label>
                <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as "not_started" | "ongoing" | "finished")}
                    className="w-full px-4 py-2 bg-[#18182a]/80 border-2 border-[#FCF551] rounded-md text-[#75E8F0] focus:outline-none focus:border-[#75E8F0]"
                    disabled={isLoading}
                >
                    <option value="not_started">Not Started</option>
                    <option value="ongoing">Ongoing (Active)</option>
                    <option value="finished">Finished (Completed)</option>
                </select>
            </div>
            
            <div className="flex flex-col mt-4">
                {selectedRoundData?.status === newStatus && (
                    <p className="text-yellow-400 text-sm mb-2">
                        Note: The selected round is already in {formatStatus(newStatus)} state.
                    </p>
                )}
                
                <button
                    type="submit"
                    disabled={isLoading || !selectedRound}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 
                        ${getStatusButtonColor(newStatus)}
                        ${(isLoading || !selectedRound) ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </div>
                    ) : (
                        `Set Round ${selectedRoundData?.round} (Batch ${selectedRoundData?.batch}) to ${formatStatus(newStatus)}`
                    )}
                </button>
            </div>
        </form>
    );
}

function formatStatus(status: string): string {
    switch (status) {
        case 'not_started':
            return 'Not Started';
        case 'ongoing':
            return 'Ongoing (Active)';
        case 'finished':
            return 'Finished (Completed)';
        default:
            return status;
    }
}

function getStatusButtonColor(status: string): string {
    switch (status) {
        case 'not_started':
            return 'bg-yellow-400/20 hover:bg-yellow-400/30 border-2 border-yellow-400 text-yellow-400';
        case 'ongoing':
            return 'bg-green-400/20 hover:bg-green-400/30 border-2 border-green-400 text-green-400';
        case 'finished':
            return 'bg-gray-400/20 hover:bg-gray-400/30 border-2 border-gray-400 text-gray-400';
        default:
            return 'bg-blue-400/20 hover:bg-blue-400/30 border-2 border-blue-400 text-blue-400';
    }
}