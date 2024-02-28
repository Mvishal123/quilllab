"use server";

import { getServerClient } from "@/lib/supabase/server";
import { loginSchema } from "@/lib/zod-schema";
import { z } from "zod";

export const registerAction = async ({
  email,
  password,
}: z.infer<typeof loginSchema>) => {
  const supabase = getServerClient();

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email);

  if (data?.length) {
    return { error: { message: "User already exists", data } };
  }

  const response = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/confirm`,
    },
  });

  return response;
};
