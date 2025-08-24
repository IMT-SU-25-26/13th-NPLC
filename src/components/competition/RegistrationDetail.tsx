"use client";
import React from "react";
import { updateIsPaid } from "@/lib/competition";

interface RegistrationDetailProps {
registration_id: string;
  registrationStatus: string;
  token: string;
}

export default function RegistrationDetail({
    registration_id,
  registrationStatus,
  token,
}: RegistrationDetailProps) {
  const handleShowPayment = () => {
    if (token && typeof window !== "undefined" && window.snap) {
      window.snap.pay(token, {
        onSuccess: async function () {
          /* Anda dapat menambahkan logika di sini, misalnya redirect atau menampilkan pesan sukses */
          await updateIsPaid(registration_id, true);
        },
        onError: async function () {
          /* Logika jika terjadi error */
          await updateIsPaid(registration_id, false);
        },
      });
    }
  };

  // Status color mapping
  const statusColor = {
    accepted: "bg-green-100 text-green-700",
    failed: "bg-red-100 text-red-700",
    pending: "bg-yellow-100 text-yellow-700",
    unknown: "bg-gray-100 text-gray-700",
  };

  const paymentStatus =
    registrationStatus === "accepted"
      ? "Paid"
      : registrationStatus === "failed"
      ? "Failed"
      : registrationStatus === "pending"
      ? "Pending"
      : "Unknown";

  return (
    <div className="max-w-md mx-auto p-8 rounded-2xl shadow-xl bg-gradient-to-br from-white via-blue-50 to-blue-100 border border-blue-200">
      <h2 className="mb-6 text-3xl font-bold text-blue-900 text-center tracking-tight">
        Registration Detail
      </h2>
      <div className="mb-4 flex items-center justify-between">
        <span className="font-medium text-blue-800">Registration Status:</span>
        <span
          className={`px-4 py-1 rounded-full font-semibold text-sm capitalize ${
            statusColor[registrationStatus as keyof typeof statusColor] ||
            statusColor.unknown
          }`}
        >
          {registrationStatus}
        </span>
      </div>
      <div className="mb-8 flex items-center justify-between">
        <span className="font-medium text-blue-800">Payment Status:</span>
        <span
          className={`px-4 py-1 rounded-full font-semibold text-sm capitalize ${
            statusColor[
              paymentStatus.toLowerCase() as keyof typeof statusColor
            ] || statusColor.unknown
          }`}
        >
          {paymentStatus}
        </span>
      </div>
      <button
        onClick={handleShowPayment}
        disabled={!token || registrationStatus === "accepted"}
        className={`w-full py-3 rounded-lg font-bold text-white transition 
                    ${
                      registrationStatus === "accepted"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 shadow-lg"
                    }
                `}
      >
        Show Payment
      </button>
    </div>
  );
}
