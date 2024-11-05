import { db } from "@/db";
import { recipesTable } from "@/db/schema/base";
import {
	ingredientsTable,
	mealsTable,
	recipeIngredientsTable,
} from "@/db/schema/extra";
import type { IngredientInsert, MealInsert, RecipeInsert } from "@/db/types";
import { set } from "date-fns";
import { eq, inArray, sql } from "drizzle-orm";

const recipes = {
	create: async (data: RecipeInsert & { ingredients: string[] }) => {
		const [{ id }] = await db.insert(recipesTable).values(data).returning();

		if (data.ingredients.length === 0) return;

		const createdIngredients = await db
			.insert(ingredientsTable)
			.values(
				data.ingredients.map((ingredient) => ({
					name: ingredient,
				})),
			)
			.onConflictDoNothing()
			.returning();

		let existingIngredients: Array<(typeof createdIngredients)[number]> = [];

		if (createdIngredients.length !== data.ingredients.length) {
			const notCreated = data.ingredients.filter(
				(ingredient) =>
					!createdIngredients.find(({ name }) => name === ingredient),
			);
			existingIngredients = await db
				.select()
				.from(ingredientsTable)
				.where(inArray(ingredientsTable.name, notCreated));
		}

		const ingredients = createdIngredients.concat(existingIngredients);

		if (ingredients.length > 0) {
			await db.insert(recipeIngredientsTable).values(
				ingredients.map((ingredient) => ({
					recipeId: id,
					ingredientId: ingredient.id,
				})),
			);
		}
	},
	deleteAll: () => db.delete(recipesTable),
};

const ingredients = {
	create: (data: IngredientInsert) =>
		db.insert(ingredientsTable).values(data).returning(),
	setPreferredStore: async (params: {
		id: number;
		storeKey: string | null | undefined;
	}) => {
		await db
			.update(ingredientsTable)
			.set({
				preferredStoreKey: params.storeKey ?? null,
			})
			.where(eq(ingredientsTable.id, params.id));

		return true;
	},
	updateName: async (params: {
		id: number;
		name: string;
	}) => {
		await db
			.update(ingredientsTable)
			.set({
				name: params.name,
			})
			.where(eq(ingredientsTable.id, params.id));

		return true;
	},
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
	createRandom: async (dates: Date[]) => {
		if (dates.length === 0) return;

		const allRecipes = await db
			.select({ id: recipesTable.id })
			.from(recipesTable)
			.orderBy(sql`RANDOM()`)
			.limit(dates.length);

		if (allRecipes.length < dates.length) {
			const neededRecipes = dates.length - allRecipes.length;
			for (let i = 0; i < neededRecipes; i++) {
				const randIndex = Math.floor(Math.random() * allRecipes.length);
				const recipe = allRecipes[randIndex];
				allRecipes.push(recipe);
			}
		}

		await db
			.insert(mealsTable)
			.values(
				dates.map((date, i) => ({
					date,
					recipeId: allRecipes[i].id,
				})),
			)
			.onConflictDoUpdate({
				target: mealsTable.date,
				set: { recipeId: sql.raw(`excluded.${mealsTable.recipeId.name}`) },
			});
	},
};

export default {
	recipes,
	ingredients,
	meals,
};
