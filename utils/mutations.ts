import { db } from "@/db";
import * as schema from "@/db/schema";
import type { IngredientInsert, MealInsert, RecipeInsert } from "@/db/types";

const recipes = {
	create: (data: RecipeInsert) =>
		db.insert(schema.recipesTable).values(data).returning(),
	deleteAll: () => db.delete(schema.recipesTable),
};

const ingredients = {
	create: (data: IngredientInsert) =>
		db.insert(schema.ingredientsTable).values(data).returning(),
	deleteAll: () => db.delete(schema.ingredientsTable),
};

const meals = {
	create: (data: MealInsert) =>
		db.insert(schema.mealsTable).values(data).returning(),
	deleteAll: () => db.delete(schema.mealsTable),
};

export default {
	recipes,
	ingredients,
	meals,
};
