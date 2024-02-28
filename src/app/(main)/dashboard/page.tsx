import DashboardSetup from "@/components/dashboard/dashboard-setup";
import { getSubscriptionStatus } from "@/server-actions/queries";
import db from "@/lib/supabase/db";
import { getServerClient } from "@/lib/supabase/server";

import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const supabase = getServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/")
  }

  const workspace = await db.query.workspaces.findFirst({
    where: (workspace, { eq }) =>
      eq(workspace.workspaceOwner, user?.id ?? randomUUID()),
  });

  const { data: subscriptionStatus, error: subscriptionStatusError } =
    await getSubscriptionStatus(user?.id ?? randomUUID());

  if (!workspace) {
    return (
      <div className="h-screen w-screen bg-brand/brand-neutral flex justify-center items-center">
        <DashboardSetup user={user!} subcription={subscriptionStatus} />
      </div>
    );
  }

  return <div>Hey</div>;
};

export default DashboardPage;
