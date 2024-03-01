"use server";

import { validate } from "uuid";
import { folders, users, workspaces } from "../../migrations/schema"
import { Folder, workspace } from "@/lib/supabase/supabase.types";

import { and, eq, notExists } from "drizzle-orm";
import { collaborators } from "@/lib/supabase/schema";
import db from "@/lib/supabase/db";

export const getSubscriptionStatus = async (userId: string) => {
  try {
    const data = await db.query.subscriptions.findFirst({
      where: (subscription, { eq }) => eq(subscription.userId, userId),
    });

    if (!data) {
      return { data: null, error: null };
    }

    return { data: data, error: null };
  } catch (error) {
    return { data: null, error: null };
  }
};

export const createWorkspace = async (workspace: workspace) => {
  try {
    const response = await db.insert(workspaces).values(workspace);
    return { data: null, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: "Error" };
  }
};

export const getFolders = async (workspaceId: string) => {
  const isvalidUUID = validate(workspaceId);

  if (!isvalidUUID) {
    return {
      data: null,
      error: "Error",
    };
  }

  try {
    const myFolders: Folder[] | [] = await db
      .select()
      .from(folders)
      .orderBy(folders.createdAt)
      .where(eq(folders.workspaceId, workspaceId));

    return { data: myFolders, error: null };
  } catch (error) {
    return { data: null, error: "Error" };
  }
};

export const getPrivateWorkspaces = async (userId: string) => {
  if (!userId) {
    return [];
  }

  //No collaborators are included
  const privateWorkspaces = await db
    .select({
      id: workspaces.id,
      createdAt: workspaces.createdAt,
      workspaceOwner: workspaces.workspaceOwner,
      title: workspaces.title,
      iconId: workspaces.iconId,
      data: workspaces.data,
      inTrash: workspaces.inTrash,
      logo: workspaces.logo,
      bannerUrl: workspaces.bannerUrl,
    })
    .from(workspaces)
    .where(
      and(
        notExists(
          db
            .select()
            .from(collaborators)
            .where(eq(collaborators.workspaceId, workspaces.id))
        ),
        eq(workspaces.workspaceOwner, userId)
      )
    ) as workspace[];

  return privateWorkspaces;
};
export const getCollaboratingWorkspaces = async (userId: string) => {
  if (!userId) {
    return [];
  }

  const collaboratingWorkspaces = await db
    .select({
      id: workspaces.id,
      createdAt: workspaces.createdAt,
      workspaceOwner: workspaces.workspaceOwner,
      title: workspaces.title,
      iconId: workspaces.iconId,
      data: workspaces.data,
      inTrash: workspaces.inTrash,
      logo: workspaces.logo,
      bannerUrl: workspaces.bannerUrl,
    })
    .from(users)
    .innerJoin(collaborators, eq(users.id, collaborators.userId))
    .innerJoin(workspaces, eq(collaborators.workspaceId, workspaces.id))
    .where(eq(users.id, userId)) as workspace[];

  return collaboratingWorkspaces ;
};

export const getSharedWorkspaces = async (userId: string) => {
  if (!userId) {
    return [];
  }

  const sharedWorkspaces = await db
    .select({
      id: workspaces.id,
      createdAt: workspaces.createdAt,
      workspaceOwner: workspaces.workspaceOwner,
      title: workspaces.title,
      iconId: workspaces.iconId,
      data: workspaces.data,
      inTrash: workspaces.inTrash,
      logo: workspaces.logo,
      bannerUrl: workspaces.bannerUrl,
    })
    .from(workspaces)
    .orderBy(workspaces.createdAt)
    .innerJoin(collaborators, eq(workspaces.id, collaborators.workspaceId))
    .where(eq(workspaces.workspaceOwner, userId)) as workspace[];

  return sharedWorkspaces;
};
