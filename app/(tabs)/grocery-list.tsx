import { GroceryList } from "@/components/GroceryList";
import type { IngredientDisplay } from "@/components/IngredientsList";
import { useDate } from "@/hooks/date";
import queries from "@/utils/queries";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";

export default function GroceryListScreen() {
	const date = useDate();
	const [key, setKey] = useState(0);
	const { data: meals } = useQuery(queries.meals.byWeek(date));

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setKey((prev) => prev + 1);
	}, [meals]);

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
			<GroceryList key={key} data={ingredients} />
		</SafeAreaView>
	);
}
