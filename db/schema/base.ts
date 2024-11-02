import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const storesTable = sqliteTable("stores", {
	key: text().primaryKey(),
	icon: text().notNull(),
	name: text().notNull().unique(),
});

export const recipesTable = sqliteTable("recipes", {
	id: int().primaryKey({ autoIncrement: true }),
	name: text().notNull().unique(),
});
