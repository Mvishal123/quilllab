"use client";

import { useAppState } from "@/lib/providers/state-providers";
import { workspace } from "@/lib/supabase/supabase.types";
import React, { useEffect, useState } from "react";

interface WorkspaceProps {
  privateWorkspaces: workspace[] | [];
  sharedWorkspaces: workspace[] | [];
  collaboratingWorkspaces: workspace[] | [];
  defaultvalue: workspace | undefined;
}
const WorkspaceDropdown = ({
  privateWorkspaces,
  sharedWorkspaces,
  defaultvalue,
  collaboratingWorkspaces,
}: WorkspaceProps) => {
  const [selectedOption, setSelectedOption] = useState(defaultvalue);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { dispatch, state } = useAppState();

  useEffect(() => {
    if (!state.workspaces.length) {
      dispatch({
        type: "SET_WORKSPACES",
        payload: {
          workspaces: [
            ...privateWorkspaces,
            ...sharedWorkspaces,
            ...collaboratingWorkspaces,
          ].map((workspace) => ({...workspace, folders: []})),
        },
      });
    }
  }, [privateWorkspaces, collaboratingWorkspaces, sharedWorkspaces]);

  return <div>WorkspaceDropdown</div>;
};

export default WorkspaceDropdown;
