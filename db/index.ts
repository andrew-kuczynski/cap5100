import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite/next";

const expo = openDatabaseSync("db8.db");
import * as schema from "./schema";
export const db = drizzle(expo, { schema });
