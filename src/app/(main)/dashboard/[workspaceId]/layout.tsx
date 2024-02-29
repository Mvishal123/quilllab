import Sidebar from "@/components/sidebar/sidebar";
import React from "react";

interface LayoutProps {
  params: { workspaceId: string };
  children: React.ReactNode;
}
const Layout = ({ children, params }: LayoutProps) => {
  return (
    <div className="flex overflow-hidden h-screen w-screen">
      <Sidebar params={params} />
      <div className="dark:border-Neutrals/neutrals-11 border-l-[1px] w-full relative overflow-scroll">{children}</div>
    </div>
  );
};

export default Layout;
