import { db } from "@/db";
import migrations from "@/drizzle/migrations";
import { useMigrations as _useMigrations } from "drizzle-orm/expo-sqlite/migrator";

export const useMigrations = () => {
	return _useMigrations(db, migrations);
};
