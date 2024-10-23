import { db } from "@/db";
import {
	createQueryKeys,
	mergeQueryKeys,
} from "@lukemorales/query-key-factory";

const ingredients = createQueryKeys("ingredients", {
	list: {
		queryKey: null,
		queryFn: () => db.query.ingredientsTable.findMany(),
	},
	detail: (id: number) => ({
		queryKey: [id],
		queryFn: () => {
			return db.query.ingredientsTable.findFirst({
				where: (table, { eq }) => eq(table.id, id),
			});
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
		queryFn: () => {
			return db.query.recipesTable.findFirst({
				where: (table, { eq }) => eq(table.id, id),
			});
		},
	}),
});

const queries = mergeQueryKeys(ingredients, recipes);

export default queries;
