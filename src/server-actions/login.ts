"use server";

import { z } from "zod";
import { loginSchema } from "@/lib/zod-schema";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getServerClient } from "@/lib/supabase/server";

export const loginAction = async ({
  email,
  password,
}: z.infer<typeof loginSchema>) => {
  const cookieStore = cookies();
  const supabase = getServerClient();

  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return JSON.stringify(response);
};
