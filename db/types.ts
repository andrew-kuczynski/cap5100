import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type {
	ingredientsTable,
	mealsTable,
	recipeIngredientsTable,
	recipesTable,
	storesTable,
} from "./schema";

export type Recipe = InferSelectModel<typeof recipesTable>;
export type RecipeInsert = InferInsertModel<typeof recipesTable>;

export type Ingredient = InferSelectModel<typeof ingredientsTable>;
export type IngredientInsert = InferInsertModel<typeof ingredientsTable>;

export type Meal = InferSelectModel<typeof mealsTable>;
export type MealInsert = InferInsertModel<typeof mealsTable>;

export type Store = InferSelectModel<typeof storesTable>;
export type StoreInsert = InferInsertModel<typeof storesTable>;

export type RecipeIngredient = InferSelectModel<typeof recipeIngredientsTable>;
export type RecipeIngredientInsert = InferInsertModel<
	typeof recipeIngredientsTable
>;
