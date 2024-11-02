import { GroceryList } from "@/components/GroceryList";
import type { IngredientDisplay } from "@/components/IngredientsList";
import { useDate } from "@/hooks/date";
import queries from "@/utils/queries";
import { useQuery } from "@tanstack/react-query";
import { endOfWeek, startOfWeek } from "date-fns";
import { SafeAreaView } from "react-native";

export default function GroceryListScreen() {
	const date = useDate();
	const { data: meals } = useQuery(queries.meals.byWeek(date));

	const ingredientsMap = meals
		?.flatMap((m) => m.recipe.recipesToIngredients.map((r) => r.ingredient))
		?.reduce(
			(acc, val) => {
				acc[val.id] = val;
				return acc;
			},
			{} as Record<number, IngredientDisplay>,
		);

	const ingredients = ingredientsMap ? Object.values(ingredientsMap) : [];

	return (
		<SafeAreaView className="flex-1">
			<GroceryList data={ingredients} />
		</SafeAreaView>
	);
}
