import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema/index.js";

function createDb() {
  const url = process.env.DATABASE_URL;

  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }

  const sql = neon(url);
  return drizzle(sql, { schema });
}

export type Database = ReturnType<typeof createDb>;

let _db: Database | undefined;

export function getDb(): Database {
  if (!_db) {
    _db = createDb();
  }
  return _db;
}

/** Lazy proxy so importing `@zauti/db` does not require DATABASE_URL until first use. */
export const db = new Proxy({} as Database, {
  get(_target, prop, receiver) {
    return Reflect.get(getDb(), prop, receiver);
  },
});
