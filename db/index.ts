import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";

const expo = openDatabaseSync("db10.db");
import * as schema from "./schema";
export const db = drizzle(expo, { schema });
