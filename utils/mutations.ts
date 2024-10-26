import { db } from "@/db";
import { recipesTable } from "@/db/schema/base";
import { ingredientsTable, mealsTable } from "@/db/schema/extra";
import type { IngredientInsert, MealInsert, RecipeInsert } from "@/db/types";
import { eq } from "drizzle-orm";

const recipes = {
	create: (data: RecipeInsert) =>
		db.insert(recipesTable).values(data).returning(),
	deleteAll: () => db.delete(recipesTable),
};

const ingredients = {
	create: (data: IngredientInsert) =>
		db.insert(ingredientsTable).values(data).returning(),
	deleteAll: () => db.delete(ingredientsTable),
};

const meals = {
	create: (data: MealInsert) =>
		db
			.insert(mealsTable)
			.values(data)
			.onConflictDoUpdate({
				target: mealsTable.date,
				set: { recipeId: data.recipeId },
			})
			.returning(),
	delete: (date: Date) =>
		db.delete(mealsTable).where(eq(mealsTable.date, date)),
	deleteAll: () => db.delete(mealsTable),
};

export default {
	recipes,
	ingredients,
	meals,
};
