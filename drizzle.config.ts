import type { Config } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE URL not found");
}

export default {
  schema: "./src/lib/supabase/schema.ts",
  out: "./migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || "",
  },
} satisfies Config;
