import { db } from "@/db";
import * as schema from "@/db/schema";
import type { IngredientInsert, RecipeInsert } from "@/db/types";

const recipes = {
	create: (data: RecipeInsert) =>
		db.insert(schema.recipesTable).values(data).returning(),
};

const ingredients = {
	create: (data: IngredientInsert) =>
		db.insert(schema.ingredientsTable).values(data).returning(),
};

export default {
	recipes,
	ingredients,
};
