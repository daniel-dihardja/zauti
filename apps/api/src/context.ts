import { db, type Database } from "@zauti/db";

export type Context = {
  db: Database;
};

export function createContext(): Context {
  return { db };
}
