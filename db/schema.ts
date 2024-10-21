import { relations } from "drizzle-orm";
import {
	index,
	int,
	primaryKey,
	sqliteTable,
	text,
} from "drizzle-orm/sqlite-core";

export const ingredientsTable = sqliteTable("ingredients", {
	id: int().primaryKey({ autoIncrement: true }),
	name: text().notNull(),
	preferredStoreId: int().references(() => storesTable.id),
});

export const ingredientsRelations = relations(
	ingredientsTable,
	({ many, one }) => ({
		ingredientsToRecipes: many(recipeIngredientsTable),
		preferredStore: one(storesTable, {
			fields: [ingredientsTable.preferredStoreId],
			references: [storesTable.id],
		}),
	}),
);

export const recipesTable = sqliteTable("recipes", {
	id: int().primaryKey({ autoIncrement: true }),
	name: text().notNull(),
});

export const recipesRelations = relations(recipesTable, ({ many }) => ({
	recipesToIngredients: many(recipeIngredientsTable),
	meals: many(mealsTable),
}));

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

export const mealsTable = sqliteTable(
	"meals",
	{
		year: int().notNull(),
		week: int().notNull(),
		day: int().notNull(),
		recipeId: int()
			.notNull()
			.references(() => recipesTable.id),
	},
	(t) => ({
		pk: primaryKey({ columns: [t.year, t.week, t.day] }),
		idx: index("week_index").on(t.year, t.week),
	}),
);

export const mealsRelations = relations(mealsTable, ({ one }) => ({
	recipe: one(recipesTable, {
		fields: [mealsTable.recipeId],
		references: [recipesTable.id],
	}),
}));

export const storesTable = sqliteTable("stores", {
	id: int().primaryKey({ autoIncrement: true }),
	name: text().notNull(),
});

export const storesRelations = relations(storesTable, ({ many }) => ({
	storesToIngredients: many(ingredientsTable),
}));
