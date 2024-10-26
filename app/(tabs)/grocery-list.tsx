import { useDate } from "@/hooks/date";
import queries from "@/utils/queries";
import { useQuery } from "@tanstack/react-query";
import { endOfWeek, startOfWeek } from "date-fns";
import { Text, View } from "react-native";

export default function GroceryListScreen() {
	const date = useDate();
	const { data: meals } = useQuery(
		queries.meals.byDateRange(startOfWeek(date), endOfWeek(date)),
	);

	const ingredientsMap = meals
		?.flatMap((m) => m.recipe.recipesToIngredients.map((r) => r.ingredient))
		?.reduce(
			(acc, val) => {
				acc[val.id] = val;
				return acc;
			},
			{} as Record<number, { id: number; name: string }>,
		);

	const ingredients = ingredientsMap ? Object.values(ingredientsMap) : [];

	return (
		<View
			style={{
				borderColor: "red",
				borderWidth: 1,
				marginTop: 100,
			}}
		>
			{ingredients.map((ingredient) => (
				<View key={ingredient.id}>
					<Text>{ingredient.name}</Text>
				</View>
			))}
		</View>
	);
}
