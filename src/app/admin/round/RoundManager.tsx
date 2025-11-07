"use client";

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface Round {
  id: string;
  round: number;
  batch: number;
  status: string;
  question_link: string | null;
}

interface RoundManagerProps {
  initialRounds: Round[];
}

type RoundStatus = 'not_started' | 'ongoing' | 'finished';

export default function RoundManager({ initialRounds }: RoundManagerProps) {
  const router = useRouter();
  const [rounds] = useState<Round[]>(initialRounds);
  const [isCreating, setIsCreating] = useState(false);
  const [editingRound, setEditingRound] = useState<Round | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form state for create/edit
  const [formData, setFormData] = useState<{
    round: number;
    batch: number;
    question_link: string;
    status: RoundStatus;
  }>({
    round: 1,
    batch: 1,
    question_link: '',
    status: 'not_started',
  });

  const resetForm = () => {
    setFormData({
      round: 1,
      batch: 1,
      question_link: '',
      status: 'not_started',
    });
    setIsCreating(false);
    setEditingRound(null);
  };

  const handleEdit = (round: Round) => {
    setEditingRound(round);
    setFormData({
      round: round.round,
      batch: round.batch,
      question_link: round.question_link || '',
      status: round.status as RoundStatus,
    });
    setIsCreating(false);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/round/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Round created successfully!');
        resetForm();
        router.refresh();
      } else {
        toast.error(result.error || 'Failed to create round');
      }
    } catch (error) {
      console.error('Error creating round:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRound) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/round/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingRound.id,
          ...formData,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Round updated successfully!');
        resetForm();
        router.refresh();
      } else {
        toast.error(result.error || 'Failed to update round');
      }
    } catch (error) {
      console.error('Error updating round:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (roundId: string) => {
    if (!confirm('Are you sure you want to delete this round? This action cannot be undone.')) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/round/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: roundId }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Round deleted successfully!');
        router.refresh();
      } else {
        toast.error(result.error || 'Failed to delete round');
      }
    } catch (error) {
      console.error('Error deleting round:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Existing Rounds Table */}
      <div className="bg-[#18182a]/80 border-2 border-[#FCF551] rounded-lg p-6">
        <h2 className="text-xl font-semibold text-[#FCF551] mb-4">Existing Rounds</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#FCF551]/20">
                <th className="px-4 py-3 text-left text-[#FCF551]">Round</th>
                <th className="px-4 py-3 text-left text-[#FCF551]">Batch</th>
                <th className="px-4 py-3 text-left text-[#FCF551]">Status</th>
                <th className="px-4 py-3 text-left text-[#FCF551]">Question Link</th>
                <th className="px-4 py-3 text-left text-[#FCF551]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rounds.map((round) => (
                <tr key={round.id} className="border-b border-[#FCF551]/10">
                  <td className="px-4 py-3 text-[#75E8F0]">{round.round}</td>
                  <td className="px-4 py-3 text-[#75E8F0]">{round.batch}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      round.status === 'ongoing' 
                        ? 'bg-green-500/20 text-green-400' 
                        : round.status === 'finished'
                        ? 'bg-gray-500/20 text-gray-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {round.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#75E8F0]">
                    {round.question_link ? (
                      <a 
                        href={round.question_link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="underline hover:text-[#FCF551]"
                      >
                        View Link
                      </a>
                    ) : (
                      <span className="text-gray-500">No link</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(round)}
                        disabled={isLoading}
                        className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500 text-blue-400 rounded text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(round.id)}
                        disabled={isLoading}
                        className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 border border-red-500 text-red-400 rounded text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Form */}
      <div className="bg-[#18182a]/80 border-2 border-[#FCF551] rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#FCF551]">
            {editingRound ? 'Edit Round' : isCreating ? 'Create New Round' : 'Round Actions'}
          </h2>
          {!isCreating && !editingRound && (
            <button
              onClick={() => setIsCreating(true)}
              className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border-2 border-green-500 text-green-400 rounded-lg font-semibold"
            >
              + Create New Round
            </button>
          )}
        </div>

        {(isCreating || editingRound) && (
          <form onSubmit={editingRound ? handleUpdate : handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Round Number
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.round}
                  onChange={(e) => setFormData({ ...formData, round: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 bg-[#18182a]/80 border-2 border-[#FCF551] rounded-md text-[#75E8F0] focus:outline-none focus:border-[#75E8F0]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Batch Number
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.batch}
                  onChange={(e) => setFormData({ ...formData, batch: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 bg-[#18182a]/80 border-2 border-[#FCF551] rounded-md text-[#75E8F0] focus:outline-none focus:border-[#75E8F0]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as RoundStatus })}
                className="w-full px-4 py-2 bg-[#18182a]/80 border-2 border-[#FCF551] rounded-md text-[#75E8F0] focus:outline-none focus:border-[#75E8F0]"
                required
              >
                <option value="not_started">Not Started</option>
                <option value="ongoing">Ongoing</option>
                <option value="finished">Finished</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Question Link (Google Docs URL)
              </label>
              <input
                type="url"
                value={formData.question_link}
                onChange={(e) => setFormData({ ...formData, question_link: e.target.value })}
                placeholder="https://docs.google.com/document/..."
                className="w-full px-4 py-2 bg-[#18182a]/80 border-2 border-[#FCF551] rounded-md text-[#75E8F0] focus:outline-none focus:border-[#75E8F0]"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-green-500/20 hover:bg-green-500/30 border-2 border-green-500 text-green-400 rounded-lg font-semibold transition-all disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : editingRound ? 'Update Round' : 'Create Round'}
              </button>
              
              <button
                type="button"
                onClick={resetForm}
                disabled={isLoading}
                className="px-6 py-2 bg-gray-500/20 hover:bg-gray-500/30 border-2 border-gray-500 text-gray-400 rounded-lg font-semibold transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}