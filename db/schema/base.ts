import { relations } from "drizzle-orm";
import {
	int,
	integer,
	primaryKey,
	sqliteTable,
	text,
} from "drizzle-orm/sqlite-core";

export const storesTable = sqliteTable("stores", {
	id: int().primaryKey({ autoIncrement: true }),
	name: text().notNull(),
});

export const recipesTable = sqliteTable("recipes", {
	id: int().primaryKey({ autoIncrement: true }),
	name: text().notNull(),
});
