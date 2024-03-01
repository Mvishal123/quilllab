import { getServerAuth } from "@/lib/helpers/get-server-session";
import {
  getCollaboratingWorkspaces,
  getPrivateWorkspaces,
  getSharedWorkspaces,
  getSubscriptionStatus,
} from "@/server-actions/queries";
import { redirect } from "next/navigation";
import React from "react";
import { twMerge } from "tailwind-merge";
import WorkspaceDropdown from "./workspace-dropdown";

interface SidebarProps {
  params: { workspaceId: string };
  children?: React.ReactNode;
  className?: string;
}

const Sidebar = async ({ params, children, className }: SidebarProps) => {
  const user = await getServerAuth();
  if (!user) {
    redirect("/dashboard");
  }

  const { data: subscription, error: subscriptionError } =
    await getSubscriptionStatus(user.id);

  const [privateWorkspaces, collaboratingWorkspaces, sharedWorkspaces] =
    await Promise.all([
      getPrivateWorkspaces(user.id),
      getCollaboratingWorkspaces(user.id),
      getSharedWorkspaces(user.id),
    ]);

  return (
    <aside
      className={twMerge(
        "hidden sm:flex sm:flex-col w-[280px] shrink-0 p-4 md:gap-4 justify-between",
        className
      )}
    >
      <div>
        <WorkspaceDropdown 
            privateWorkspaces={privateWorkspaces}
            collaboratingWorkspaces={collaboratingWorkspaces}
            sharedWorkspaces={sharedWorkspaces}
            defaultvalue={[...privateWorkspaces, ...collaboratingWorkspaces, ...sharedWorkspaces].find((workspace) => workspace.id === params.workspaceId)}
            />
      </div>
    </aside>
  );
};

export default Sidebar;
