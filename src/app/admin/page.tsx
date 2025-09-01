import React from "react";
import Link from "next/link";
import { getAllCompetitionRegistrations } from "@/lib/admin";

export default async function AdminDashboard() {
  const registrations = await getAllCompetitionRegistrations();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "text-green-400 bg-green-400/20";
      case "failed":
        return "text-red-400 bg-red-400/20";
      default:
        return "text-yellow-400 bg-yellow-400/20";
    }
  };

  return (
    <>
    <div className="pt-[7vh] overflow-hidden">
      <div className="min-h-screen bg-[#090A1E] text-white p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#75E8F0] [text-shadow:_0_0_20px_rgba(117,232,240,1)] font-rubik-glitch mb-2">
            Admin Dashboard
          </h1>
          <p className="text-[#FCF551] text-lg">
            Manage competition registrations
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#18182a]/80 border-2 border-[#FCF551] p-6 rounded-lg">
            <h3 className="text-[#FCF551] text-lg font-semibold mb-2">
              Total Registrations
            </h3>
            <p className="text-3xl font-bold text-[#75E8F0] [text-shadow:_0_0_15px_rgba(117,232,240,0.8)]">
              {registrations.length}
            </p>
          </div>
          <div className="bg-[#18182a]/80 border-2 border-green-400 p-6 rounded-lg">
            <h3 className="text-green-400 text-lg font-semibold mb-2">
              Accepted
            </h3>
            <p className="text-3xl font-bold text-green-400 [text-shadow:_0_0_15px_rgba(34,197,94,0.8)]">
              {
                registrations.filter(
                  (r) => r.registration_status === "accepted"
                ).length
              }
            </p>
          </div>
          <div className="bg-[#18182a]/80 border-2 border-red-400 p-6 rounded-lg">
            <h3 className="text-red-400 text-lg font-semibold mb-2">Pending</h3>
            <p className="text-3xl font-bold text-red-400 [text-shadow:_0_0_15px_rgba(248,113,113,0.8)]">
              {
                registrations.filter((r) => r.registration_status === "pending")
                  .length
              }
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#18182a]/80 border-2 border-[#FCF551] rounded-lg overflow-hidden">
          <div className="p-6 border-b border-[#FCF551]/30">
            <h2 className="text-2xl font-bold text-[#75E8F0] [text-shadow:_0_0_15px_rgba(117,232,240,0.8)]">
              Competition Registrations
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#FCF551]/10">
                <tr>
                  <th className="px-6 py-4 text-left text-[#FCF551] font-semibold border-b border-[#FCF551]/20">
                    Team Name
                  </th>
                  <th className="px-6 py-4 text-left text-[#FCF551] font-semibold border-b border-[#FCF551]/20">
                    Competition
                  </th>
                  <th className="px-6 py-4 text-left text-[#FCF551] font-semibold border-b border-[#FCF551]/20">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-[#FCF551] font-semibold border-b border-[#FCF551]/20">
                    Created At
                  </th>
                  <th className="px-6 py-4 text-left text-[#FCF551] font-semibold border-b border-[#FCF551]/20">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((registration) => (
                  <tr
                    key={registration.id}
                    className="hover:bg-[#FCF551]/5 transition-colors border-b border-[#FCF551]/10"
                  >
                    <td className="px-6 py-4 text-[#75E8F0]">
                      {registration.team_name}
                    </td>
                    <td className="px-6 py-4 text-white">
                      {registration.competition.name}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold uppercase ${getStatusColor(
                          registration.registration_status
                        )}`}
                      >
                        {registration.registration_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {new Date(registration.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/${registration.id}`}
                        className="inline-flex items-center px-4 py-2 bg-[#FCF551]/20 hover:bg-[#FCF551]/30 
                               border border-[#FCF551] text-[#FCF551] rounded-lg transition-colors
                               text-sm font-semibold"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {registrations.length === 0 && (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4 text-[#FCF551]/20">📋</div>
              <h3 className="text-xl font-semibold text-[#75E8F0] mb-2">
                No registrations found
              </h3>
              <p className="text-gray-400">
                Competition registrations will appear here once submitted.
              </p>
            </div>
          )}
        </div>
      </div>
      </div>
    </>
  );
}
