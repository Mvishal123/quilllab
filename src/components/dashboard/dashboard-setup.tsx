"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { AuthUser } from "@supabase/supabase-js";
import EmojiPicker from "../global/emoji-picker";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { workspaceSchema } from "@/lib/zod-schema";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { v4 } from "uuid";

import { createWorkspace } from "@/server-actions/queries";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { Subscription, workspace } from "@/lib/supabase/supabase.types";
import { useAppState } from "@/lib/providers/state-providers";
import { getClient } from "@/lib/supabase/client";

interface DashboardSetupProps {
  user: AuthUser;
  subcription?: any;
}

const DashboardSetup = ({ user, subcription }: DashboardSetupProps) => {
  const [selectedEmoji, setSelectedEmoji] = useState<string>("🪶");

  const router = useRouter();
  const supabase = getClient();
  const { dispatch } = useAppState();

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<z.infer<typeof workspaceSchema>>({
    mode: "onChange",
    defaultValues: { logo: "", workspaceName: "" },
  });

  const onSubmit: SubmitHandler<z.infer<typeof workspaceSchema>> = async (
    value
  ) => {
    console.log({value});
    
    const file = value.logo?.[0];
    let filePath = null;
    const workspaceUUID = v4();

    if (file) {
      try {
        //uploading to buckets
        const { data, error } = await supabase.storage
          .from("workspace-logos")
          .upload(`workspaceLogo.${workspaceUUID}`, file, {
            //1 minute
            cacheControl: "3600",
            //overwrite if exists
            upsert: true,
          });
        if (error) throw new Error();
        //set new file path
        filePath = data.path;
      } catch (error) {
        console.log("Error", error);
        toast({
          variant: "destructive",
          title: "Error! Could not upload workspace logo",
        });
      }

      try {
        //constructing workspace to add
        const newWorkspace: workspace = {
          data: null,
          createdAt: new Date().toISOString(),
          iconId: selectedEmoji,
          id: workspaceUUID,
          inTrash: "",
          title: value.workspaceName,
          workspaceOwner: user.id,
          logo: filePath || null,
          bannerUrl: "",
        };

        //Calling db function
        const { data, error: createError } = await createWorkspace(
          newWorkspace
        );

        //handle error
        if (createError) {
          throw new Error();
        }

        //this will add a new workspace to the state, with no folders created yet.
        dispatch({
          type: "ADD_WORKSPACE",
          payload: { ...newWorkspace, folders: [] },
        });

        toast({
          title: "Workspace Created",
          description: `${newWorkspace.title} has been created successfully.`,
        });

        router.replace(`/dahsboard/${newWorkspace.id}`);
      } finally {
        //reset the form
        reset();
      }
    }
  };
  return (
    <Card className="flex flex-col w-[500px] h-screen sm:h-auto gap-4 px-4">
      <CardHeader className="text-3xl font-bold">
        Create a workspace
        <CardDescription className="font-normal">
          Let's create a private workspace to get you started. You can add
          collaborators later from the workspace settings tab.
        </CardDescription>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <EmojiPicker getValue={(emoji) => setSelectedEmoji(emoji)}>
                  {selectedEmoji}
                </EmojiPicker>
                <div className="w-full flex flex-col items-start">
                  <label
                    htmlFor="workspaceName"
                    className="text-xs font-normal"
                  >
                    Name
                  </label>
                  <Input type="text" {...register("workspaceName")} />
                </div>
              </div>
              <div>
                <label htmlFor="logo" className="text-xs font-normal">
                  Logo{" "}
                  {subcription?.status !== "active" && (
                    <span className="ml-2">
                      (Upgrade to pro to upload photo)
                    </span>
                  )}
                </label>
                <Input
                  type="file"
                  accept="image/*"
                  {...register("logo")}
                  disabled={isSubmitting}
                />
              </div>
              <div className="flex justify-end">
                <Button>Create workspace</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default DashboardSetup;
