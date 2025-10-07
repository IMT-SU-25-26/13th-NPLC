import React from "react";
import AdminDashboardClient from "@/components/AdminDashboardClient";
import { getAllCompetitionRegistrations } from "@/lib/admin";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { checkRoleAccess } from "@/lib/user";
import Restrictions from "@/components/utils/Restrictions";

export default async function AdminDashboard() {
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

  // Fetch initial data (all registrations)
  const initialRegistrations = await getAllCompetitionRegistrations();

  return (
    <AdminDashboardClient initialRegistrations={{
      success: initialRegistrations.success,
      data: initialRegistrations.success ? initialRegistrations.data : null,
      errorMessage: initialRegistrations.errorMessage
    }} />
  );
}
