import { db } from "@/db";
import {
	createQueryKeys,
	mergeQueryKeys,
} from "@lukemorales/query-key-factory";
import { endOfWeek, startOfDay, startOfWeek } from "date-fns";

const ingredients = createQueryKeys("ingredients", {
	list: {
		queryKey: null,
		queryFn: () => db.query.ingredientsTable.findMany(),
	},
	detail: (id: number) => ({
		queryKey: [id],
		queryFn: async () => {
			const result = await db.query.ingredientsTable.findFirst({
				where: (table, { eq }) => eq(table.id, id),
				with: {
					preferredStore: true,
				},
			});

			if (!result) throw new Error("Ingredient not found");

			return result;
		},
	}),
});

const recipes = createQueryKeys("recipes", {
	list: {
		queryKey: null,
		queryFn: () => db.query.recipesTable.findMany(),
	},
	detail: (id: number) => ({
		queryKey: [id],
		queryFn: async () => {
			return db.query.recipesTable
				.findFirst({
					where: (table, { eq }) => eq(table.id, id),
					with: {
						recipesToIngredients: {
							with: {
								ingredient: {
									with: {
										preferredStore: true,
									},
								},
							},
						},
					},
				})
				.then((result) => result ?? null);
		},
	}),
});

const meals = createQueryKeys("meals", {
	byDay: (d: Date) => {
		const date = startOfDay(d);

		return {
			queryKey: ["day", date.valueOf()],
			queryFn: async () => {
				const result = await db.query.mealsTable.findFirst({
					where: (table, { eq }) => eq(table.date, date),
					with: {
						recipe: {
							with: {
								recipesToIngredients: {
									with: {
										ingredient: true,
									},
								},
							},
						},
					},
				});

				return result ?? null;
			},
		};
	},
	byWeek: (date: Date) => {
		const start = startOfWeek(date);
		const end = endOfWeek(date);
		return {
			queryKey: ["week", start.valueOf(), end.valueOf()],
			queryFn: async () => {
				const result = await db.query.mealsTable.findMany({
					where: (table, { gte, lte, and }) =>
						and(gte(table.date, start), lte(table.date, end)),
					with: {
						recipe: {
							with: {
								recipesToIngredients: {
									with: {
										ingredient: {
											with: {
												preferredStore: true,
											},
										},
									},
								},
							},
						},
					},
				});
				return result ?? null;
			},
		};
	},
});

const stores = createQueryKeys("stores", {
	list: {
		queryKey: null,
		queryFn: () => db.query.storesTable.findMany(),
	},
});

const queries = mergeQueryKeys(ingredients, recipes, meals, stores);

export default queries;
