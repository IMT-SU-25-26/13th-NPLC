"use client";
import React, { useState } from "react";
import Link from "next/link";
import { AdminDashboardClientProps } from "@/types/competition";

export default function AdminDashboardClient({ initialRegistrations }: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [registrations, setRegistrations] = useState(initialRegistrations);
  const [loading, setLoading] = useState(false);

  const tabs = [
    { name: "All", label: "All Competitions" },
    { name: "Programming", label: "Programming" },
    { name: "Business Plan", label: "Business Plan" },
    { name: "AI Prompt", label: "AI Prompt" },
    { name: "Typeracer", label: "Type Racer" }
  ];

  const fetchRegistrations = async (tabName: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (tabName !== "All") {
        params.append("competition", tabName);
      }
      
      const response = await fetch(`/api/AdminRegis?${params.toString()}`);
      const result = await response.json();
      
      setRegistrations(result);
    } catch (error) {
      console.error("Error fetching registrations:", error);
      setRegistrations({ success: false, data: null, errorMessage: "Failed to fetch registrations" });
    } finally {
      setLoading(false);
    }
  };

  const handleTabClick = async (tabName: string) => {
    setActiveTab(tabName);
    await fetchRegistrations(tabName);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "accepted":
        return "text-green-400 bg-green-400/20";
      case "failed":
        return "text-red-400 bg-red-400/20";
      case "pending":
      default:
        return "text-yellow-400 bg-yellow-400/20";
    }
  };

  // Function to count unique teams
  const getUniqueTeamsCount = (data: typeof registrations.data) => {
    if (!data || !Array.isArray(data)) return 0;
    
    const uniqueTeams = new Set(data.map(registration => registration.team_name));
    return uniqueTeams.size;
  };

  // Function to count unique teams by status
  const getUniqueTeamsByStatus = (data: typeof registrations.data, status: string) => {
    if (!data || !Array.isArray(data)) return 0;
    
    const filteredData = data.filter(r => r.registration_status === status);
    const uniqueTeams = new Set(filteredData.map(registration => registration.team_name));
    return uniqueTeams.size;
  };

  return (
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

        {/* Competition Filter Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 sm:gap-4 justify-center sm:justify-start">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => handleTabClick(tab.name)}
                disabled={loading}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === tab.name
                    ? "bg-[#FCF551] text-[#090A1E] shadow-lg"
                    : "bg-[#18182a]/80 border-2 border-[#FCF551] text-[#FCF551] hover:bg-[#FCF551]/20"
                } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {loading && activeTab === tab.name ? "Loading..." : tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#18182a]/80 border-2 border-[#FCF551] p-6 rounded-lg">
            <h3 className="text-[#FCF551] text-lg font-semibold mb-2">
              Total Registrations
            </h3>
            <p className="text-3xl font-bold text-[#75E8F0] [text-shadow:_0_0_15px_rgba(117,232,240,0.8)]">
              {registrations.data?.length || 0}
            </p>
          </div>
          <div className="bg-[#18182a]/80 border-2 border-[#FCF551] p-6 rounded-lg">
            <h3 className="text-[#FCF551] text-lg font-semibold mb-2">
              Total Teams
            </h3>
            <p className="text-3xl font-bold text-[#75E8F0] [text-shadow:_0_0_15px_rgba(117,232,240,0.8)]">
              {getUniqueTeamsCount(registrations.data)}
            </p>
          </div>
          <div className="bg-[#18182a]/80 border-2 border-green-400 p-6 rounded-lg">
            <h3 className="text-green-400 text-lg font-semibold mb-2">
              Accepted Teams
            </h3>
            <p className="text-3xl font-bold text-green-400 [text-shadow:_0_0_15px_rgba(34,197,94,0.8)]">
              {getUniqueTeamsByStatus(registrations.data, "accepted")}
            </p>
          </div>
          <div className="bg-[#18182a]/80 border-2 border-yellow-400 p-6 rounded-lg">
            <h3 className="text-yellow-400 text-lg font-semibold mb-2">Pending Teams</h3>
            <p className="text-3xl font-bold text-yellow-400 [text-shadow:_0_0_15px_rgba(234,179,8,0.8)]">
              {getUniqueTeamsByStatus(registrations.data, "pending")}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#18182a]/80 border-2 border-[#FCF551] rounded-lg overflow-hidden">
          <div className="p-6 border-b border-[#FCF551]/30">
            <h2 className="text-2xl font-bold text-[#75E8F0] [text-shadow:_0_0_15px_rgba(117,232,240,0.8)]">
              {activeTab === "All" ? "All Competition Registrations" : `${activeTab} Registrations`}
            </h2>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-12 text-center">
                <div className="text-4xl mb-4 text-[#FCF551]">⏳</div>
                <p className="text-[#75E8F0] text-lg">Loading registrations...</p>
              </div>
            ) : (
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
                  {registrations.data?.map((registration) => (
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
            )}
          </div>

          {!loading && registrations.data?.length === 0 && (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4 text-[#FCF551]/20">📋</div>
              <h3 className="text-xl font-semibold text-[#75E8F0] mb-2">
                No registrations found
              </h3>
              <p className="text-gray-400">
                {activeTab === "All" 
                  ? "Competition registrations will appear here once submitted."
                  : `No ${activeTab} registrations found.`
                }
              </p>
            </div>
          )}

          {!loading && !registrations.success && registrations.errorMessage && (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4 text-red-400/20">❌</div>
              <h3 className="text-xl font-semibold text-red-400 mb-2">
                Error Loading Data
              </h3>
              <p className="text-gray-400">
                {registrations.errorMessage}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}