import { getServerClient } from "../supabase/server";

export const getServerAuth = async () => {
  const supabase = getServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return null;

  return session.user;
};
