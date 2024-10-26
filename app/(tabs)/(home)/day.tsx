import { Button, Text, View } from "react-native";

import { RecipeList } from "@/components/RecipeList";
import mutations from "@/utils/mutations";
import queries from "@/utils/queries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function TabTwoScreen() {
	const router = useRouter();

	const params = useLocalSearchParams();
	const date = new Date(Number(params.date));

	const { data: currentMeal } = useQuery(queries.meals.byDay(date));

	const qc = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: mutations.meals.create,
		onSuccess: () => {
			qc.invalidateQueries(queries.meals.byDay(date));
			router.back();
		},
	});

	return (
		<View style={{ flex: 1 }}>
			{currentMeal ? (
				<View>
					<Text>Current Meal: {currentMeal.recipe.name ?? "?"}</Text>
				</View>
			) : null}
			<View>
				<Text>Select other meal</Text>
			</View>
			<RecipeList
				onSelect={({ id: recipeId }) => {
					mutate({
						date,
						recipeId,
					});
				}}
			/>
			<Button
				title="Add Recipe"
				onPress={() => router.push("/recipes/create")}
			/>
		</View>
	);
}
