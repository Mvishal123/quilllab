import { getServerAuth } from "@/lib/helpers/get-server-session";
import { getServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

interface SidebarProps {
  params: { workspaceId: string };
  children?: React.ReactNode;
}

const Sidebar = async ({ params, children }: SidebarProps) => {
  const user = await getServerAuth();

  if(!user) {
    redirect("/");
  }
  
  
  return <div>
    Sidebar
  </div>;
};

export default Sidebar;
