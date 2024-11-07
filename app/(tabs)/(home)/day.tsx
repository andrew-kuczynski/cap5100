import { SafeAreaView, Text, View } from "react-native";

import { AddRecipeButton } from "@/components/AddRecipeButton";
import Button from "@/components/Button";
import { RecipeList } from "@/components/RecipeList";
import mutations from "@/utils/mutations";
import queries from "@/utils/queries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

export default function DayScreen() {
	const router = useRouter();

	const params = useLocalSearchParams();
	const id = Number(params.date);
	const date = new Date(id);

	const formattedDate = format(date, "eee - PP");

	const { data: currentMeal } = useQuery(queries.meals.byDay(date));

	const qc = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: mutations.meals.create,
		onSuccess: () => {
			qc.invalidateQueries(queries.meals.byDay(date));
			qc.invalidateQueries(queries.meals.byWeek(date));
			qc.invalidateQueries(queries.meals.hasAny);
			router.back();
		},
	});

	const { mutate: deleteOne } = useMutation({
		mutationFn: mutations.meals.delete,
		onSuccess: () => {
			qc.invalidateQueries(queries.meals.byDay(date));
			qc.invalidateQueries(queries.meals.byWeek(date));
			qc.invalidateQueries(queries.meals.hasAny);
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
							<View className="flex-row">
								<View>
									<Text className="text-gray-500 text-lg">
										Currently Selected
									</Text>
									<View className="flex-row items-center gap-x-5">
										<Text className="text-2xl">{currentMeal.recipe.name}</Text>
										<Button
											onPress={() => {
												deleteOne(date);
											}}
											className="px-2 py-1 bg-rose-300 mt-0.5"
										>
											<Text>Remove</Text>
										</Button>
									</View>
								</View>
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
