import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import * as schema from "../../../migrations/schema";

const connectionString = (process.env.DATABASE_URL as string) || "";
const client = postgres(connectionString, { max: 1});
const db = drizzle(client, { schema });

const migrateDb = async () => {
  try {
    await migrate(db, { migrationsFolder: "./migrations" });
    console.log("Migrations successful");
  } catch (error) {
    console.log("ERROR: Migrating database");
  }
};

// migrateDb();

export default db;
