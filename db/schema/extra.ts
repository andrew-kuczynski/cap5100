import { relations } from "drizzle-orm";
import {
	int,
	integer,
	primaryKey,
	sqliteTable,
	text,
} from "drizzle-orm/sqlite-core";
import { recipesTable, storesTable } from "./base";

export const ingredientsTable = sqliteTable("ingredients", {
	id: int().primaryKey({ autoIncrement: true }),
	name: text().notNull().unique(),
	preferredStoreKey: text().references(() => storesTable.key),
});

export const recipeIngredientsTable = sqliteTable(
	"recipe_ingredients",
	{
		recipeId: int()
			.notNull()
			.references(() => recipesTable.id),
		ingredientId: int()
			.notNull()
			.references(() => ingredientsTable.id),
		amount: text(),
	},
	(t) => ({
		pk: primaryKey({ columns: [t.recipeId, t.ingredientId] }),
	}),
);

export const recipeIngredientsRelations = relations(
	recipeIngredientsTable,
	({ one }) => ({
		recipe: one(recipesTable, {
			fields: [recipeIngredientsTable.recipeId],
			references: [recipesTable.id],
		}),
		ingredient: one(ingredientsTable, {
			fields: [recipeIngredientsTable.ingredientId],
			references: [ingredientsTable.id],
		}),
	}),
);

export const mealsTable = sqliteTable("meals", {
	date: integer({ mode: "timestamp" }).primaryKey(),
	recipeId: int()
		.notNull()
		.references(() => recipesTable.id),
});

export const ingredientsRelations = relations(
	ingredientsTable,
	({ many, one }) => ({
		ingredientsToRecipes: many(recipeIngredientsTable),
		preferredStore: one(storesTable, {
			fields: [ingredientsTable.preferredStoreKey],
			references: [storesTable.key],
		}),
	}),
);

export const recipesRelations = relations(recipesTable, ({ many }) => ({
	recipesToIngredients: many(recipeIngredientsTable),
	meals: many(mealsTable),
}));

export const mealsRelations = relations(mealsTable, ({ one }) => ({
	recipe: one(recipesTable, {
		fields: [mealsTable.recipeId],
		references: [recipesTable.id],
	}),
}));

export const storesRelations = relations(storesTable, ({ many }) => ({
	storesToIngredients: many(ingredientsTable),
}));
