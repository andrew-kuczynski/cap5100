import { SafeAreaView, Text, View } from "react-native";

import { AddRecipeButton } from "@/components/AddRecipeButton";
import { RecipeList } from "@/components/RecipeList";
import mutations from "@/utils/mutations";
import queries from "@/utils/queries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

export default function DayScreen() {
	const router = useRouter();

	const params = useLocalSearchParams();
	const date = new Date(Number(params.date));

	const formattedDate = format(date, "eee - PP");

	const { data: currentMeal } = useQuery(queries.meals.byDay(date));

	const qc = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: mutations.meals.create,
		onSuccess: () => {
			qc.invalidateQueries(queries.meals.byDay(date));
			qc.invalidateQueries(queries.meals.byWeek(date));
			router.back();
		},
	});

	return (
		<SafeAreaView className="flex-1 relative">
			<Stack.Screen
				options={{
					title: formattedDate,
				}}
			/>

			<RecipeList
				onSelect={({ id: recipeId }) => {
					mutate({
						date,
						recipeId,
					});
				}}
				header={
					<View className="gap-y-4 px-2 pb-3">
						{currentMeal ? (
							<View>
								<Text className="text-gray-500 text-lg">
									Currently Selected
								</Text>
								<Text className="text-2xl">{currentMeal.recipe.name}</Text>
							</View>
						) : null}
						<View>
							<Text className="text-gray-500 text-lg">Select meal</Text>
						</View>
					</View>
				}
			/>
			<AddRecipeButton />
		</SafeAreaView>
	);
}
