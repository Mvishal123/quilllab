import AppStateProvider from "@/lib/providers/state-providers";
import React, { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <AppStateProvider>{children}</AppStateProvider>
    </div>
  );
};

export default Layout;
