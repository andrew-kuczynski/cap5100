import { drizzle } from "drizzle-orm/expo-sqlite";
import * as SQLite from "expo-sqlite";
const expo = SQLite.openDatabaseSync("database.db");

import * as schema from "./schema";
export const db = drizzle(expo, { schema });
