import { db } from "@/db";
import {
	createQueryKeys,
	mergeQueryKeys,
} from "@lukemorales/query-key-factory";
import { endOfWeek, startOfWeek } from "date-fns";

const ingredients = createQueryKeys("ingredients", {
	list: {
		queryKey: null,
		queryFn: () => db.query.ingredientsTable.findMany(),
	},
	detail: (id: number) => ({
		queryKey: [id],
		queryFn: async () => {
			return db.query.ingredientsTable
				.findFirst({
					where: (table, { eq }) => eq(table.id, id),
				})
				.then((result) => result ?? null);
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
				})
				.then((result) => result ?? null);
		},
	}),
});

const meals = createQueryKeys("meals", {
	byDay: (date: Date) => ({
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
	}),
	byDateRange: (start: Date, end: Date) => ({
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
									ingredient: true,
								},
							},
						},
					},
				},
			});
			return result ?? null;
		},
	}),
});

const queries = mergeQueryKeys(ingredients, recipes, meals);

export default queries;
