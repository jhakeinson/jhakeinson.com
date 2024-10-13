import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

config(); // or .env.local

const sql = neon(process.env.DB_URL!);

export const db = drizzle(sql);
