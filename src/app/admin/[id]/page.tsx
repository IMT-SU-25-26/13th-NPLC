import React from "react";
import Link from "next/link";
import { getCompetitionRegistrationById } from "@/lib/admin";
import { notFound } from "next/navigation";
import Image from "next/image";
import StatusUpdateButton from "@/app/admin/[id]/StatusUpdateButton";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { checkRoleAccess } from "@/lib/user";
import Restrictions from "@/components/utils/Restrictions";

interface RegistrationDetailProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function RegistrationDetail({
  params,
}: RegistrationDetailProps) {
  const session = await auth.api.getSession({
      headers: await headers(),
    });
  
    if (!session?.user?.id) {
      return (
        <Restrictions restrictionDescription="You must be logged in to view this page." />
      );
    }
  
    const hasAccess = await checkRoleAccess(session.user.id, "admin");
    if (!hasAccess) {
      return (
        <Restrictions restrictionDescription="You do not have permission to view this page." />
      );
    }

  const { id } = await params;
  
  const registration = await getCompetitionRegistrationById(id);

  if (!registration) {
    notFound();
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "text-green-400 bg-green-400/20 border-green-400";
      case "failed":
        return "text-red-400 bg-red-400/20 border-red-400";
      default:
        return "text-yellow-400 bg-yellow-400/20 border-yellow-400";
    }
  };

  return (
    <div className="min-h-screen bg-[#090A1E] text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin"
          className="inline-flex items-center text-[#75E8F0] hover:text-[#FCF551] transition-colors mb-4"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Dashboard
        </Link>
        <h1 className="text-4xl font-bold text-[#75E8F0] [text-shadow:_0_0_20px_rgba(117,232,240,1)] font-rubik-glitch mb-2">
          Registration Details
        </h1>
        <p className="text-[#FCF551] text-lg">
          Team: {registration.team_name}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Basic Information */}
        <div className="bg-[#18182a]/80 border-2 border-[#FCF551] rounded-lg p-6">
          <h2 className="text-2xl font-bold text-[#75E8F0] [text-shadow:_0_0_15px_rgba(117,232,240,0.8)] mb-6">
            Basic Information
          </h2>
          
          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="text-[#FCF551] text-sm font-semibold mb-1">
                Team Name
              </label>
              <p className="text-white text-lg">{registration.team_name}</p>
            </div>
            
            <div className="flex flex-col">
              <label className="text-[#FCF551] text-sm font-semibold mb-1">
                Competition
              </label>
              <p className="text-white text-lg">{registration.competition.name}</p>
            </div>
            
            <div className="flex flex-col">
              <label className="text-[#FCF551] text-sm font-semibold mb-1">
                School Name
              </label>
              <p className="text-white text-lg">{registration.school_name}</p>
            </div>
            
            <div className="flex flex-col">
              <label className="text-[#FCF551] text-sm font-semibold mb-1">
                Contact Person
              </label>
              <p className="text-white text-lg">{registration.contact_person_number}</p>
            </div>
            
            <div className="flex flex-col">
              <label className="text-[#FCF551] text-sm font-semibold mb-1">
                Twibon Link
              </label>
              <a
                href={registration.link_twiboon}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#75E8F0] hover:text-[#FCF551] transition-colors break-all"
              >
                {registration.link_twiboon}
              </a>
            </div>
            
            <div className="flex flex-col">
              <label className="text-[#FCF551] text-sm font-semibold mb-1">
                Registration Date
              </label>
              <p className="text-white text-lg">
                {new Date(registration.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Status and Actions */}
        <div className="bg-[#18182a]/80 border-2 border-[#FCF551] rounded-lg p-6">
          <h2 className="text-2xl font-bold text-[#75E8F0] [text-shadow:_0_0_15px_rgba(117,232,240,0.8)] mb-6">
            Status & Actions
          </h2>
          
          <div className="space-y-6">
            <div className="flex flex-col">
              <label className="text-[#FCF551] text-sm font-semibold mb-2">
                Current Status
              </label>
              <span
                className={`inline-flex w-fit px-4 py-2 rounded-lg text-sm font-semibold uppercase border ${getStatusColor(
                  registration.registration_status
                )}`}
              >
                {registration.registration_status}
              </span>
            </div>
            
            <div className="pt-4 border-t border-[#FCF551]/20">
              <label className="text-[#FCF551] text-sm font-semibold mb-3 block">
                Update Status
              </label>
              <div className="space-y-3">
                <StatusUpdateButton
                  registrationId={registration.id}
                  currentStatus={registration.registration_status}
                  newStatus="pending"
                  buttonText="Set as Pending"
                  buttonColor="bg-yellow-500/20 hover:bg-yellow-500/30 border-yellow-500 text-yellow-400"
                />
                <StatusUpdateButton
                  registrationId={registration.id}
                  currentStatus={registration.registration_status}
                  newStatus="accepted"
                  buttonText="Accept Registration"
                  buttonColor="bg-green-500/20 hover:bg-green-500/30 border-green-500 text-green-400"
                />
                <StatusUpdateButton
                  registrationId={registration.id}
                  currentStatus={registration.registration_status}
                  newStatus="failed"
                  buttonText="Reject Registration"
                  buttonColor="bg-red-500/20 hover:bg-red-500/30 border-red-500 text-red-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* User Information */}
        <div className="bg-[#18182a]/80 border-2 border-[#FCF551] rounded-lg p-6">
          <h2 className="text-2xl font-bold text-[#75E8F0] [text-shadow:_0_0_15px_rgba(117,232,240,0.8)] mb-6">
            User Information
          </h2>
          
          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="text-[#FCF551] text-sm font-semibold mb-1">
                Name
              </label>
              <p className="text-white text-lg">{registration.user.name}</p>
            </div>
            
            <div className="flex flex-col">
              <label className="text-[#FCF551] text-sm font-semibold mb-1">
                Email
              </label>
              <p className="text-white text-lg">{registration.user.email}</p>
            </div>
            
            <div className="flex flex-col">
              <label className="text-[#FCF551] text-sm font-semibold mb-1">
                NISN
              </label>
              <p className="text-white text-lg">
                {registration.user.nomor_induk_siswa_nasional || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Proof */}
        {registration.imageUrl && (
          <div className="bg-[#18182a]/80 border-2 border-[#FCF551] rounded-lg p-6">
            <h2 className="text-2xl font-bold text-[#75E8F0] [text-shadow:_0_0_15px_rgba(117,232,240,0.8)] mb-6">
              Payment Proof
            </h2>
            
            <div className="space-y-4">
              <div className="border-2 border-[#FCF551]/30 rounded-lg p-4">
                <Image
                  src={registration.imageUrl}
                  alt="Payment Proof"
                  width={400}
                  height={300}
                  className="w-full max-w-md mx-auto rounded-lg"
                />
              </div>
              <a
                href={registration.imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-[#75E8F0]/20 hover:bg-[#75E8F0]/30 
                         border border-[#75E8F0] text-[#75E8F0] rounded-lg transition-colors"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                View Full Size
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
