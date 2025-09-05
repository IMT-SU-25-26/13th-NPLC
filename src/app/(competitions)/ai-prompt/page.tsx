import React from "react";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { checkCompetitionPageAccess } from "@/lib/user";
import { redirect } from "next/navigation";
import { getCompetitionById } from "@/lib/competition";

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <div>You must make an account to access this page!</div>;
  }

  const hasAccess = await checkCompetitionPageAccess(session.user.id, "cmegpc6sx0002hke9gxo7hd6u");

  if (!hasAccess) {
    redirect("/not-registered");
  }

  const competitionData = await getCompetitionById("cmegpc6sx0002hke9gxo7hd6u");
  if (!competitionData) {
    redirect("/not-found");
  }

  if (competitionData.is_started == false) {
    redirect("/page-restricted");
  }

  return (
    <div className="flex min-h-screen w-screen bg-white pt-[7vh]">
      Welcome to the AI prompt page!
    </div>
  );
}
