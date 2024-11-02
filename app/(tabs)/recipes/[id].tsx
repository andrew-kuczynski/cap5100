import { Image, Text, View } from "react-native";

import {
	type IngredientDisplay,
	IngredientsList,
} from "@/components/IngredientsList";
import queries from "@/utils/queries";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function IngredientDetails({ item }: { item: IngredientDisplay }) {
	const { data: ingredient } = useQuery({
		...queries.ingredients.detail(item.id),
		initialData: item,
	});
	return (
		<View className="flex-row gap-x-4">
			{ingredient.preferredStore ? (
				<Image
					source={{ uri: ingredient.preferredStore.icon }}
					className="aspect-square w-12 h-12 rounded-full"
				/>
			) : null}
			<Text className="text-xl">{ingredient.name}</Text>
		</View>
	);
}

export default function SingleRecipeScreen() {
	const bottomSheetRef = useRef<BottomSheet>(null);
	const { id } = useLocalSearchParams();

	const { data } = useQuery(queries.recipes.detail(Number(id)));

	const ingredients = data?.recipesToIngredients?.map((r) => r.ingredient);

	const [selectedIngredient, setSelectedIngredient] =
		useState<IngredientDisplay | null>(null);

	return (
		<GestureHandlerRootView className="flex-1">
			<Stack.Screen
				options={{
					title: data?.name,
				}}
			/>
			<IngredientsList
				data={ingredients}
				onSelect={(ing) => {
					setSelectedIngredient(ing);
					bottomSheetRef.current?.snapToIndex(0);
				}}
			/>
			<BottomSheet
				ref={bottomSheetRef}
				index={-1}
				enableDynamicSizing={false}
				snapPoints={["33%"]}
				enablePanDownToClose
			>
				<BottomSheetView className="p-3">
					{selectedIngredient ? (
						<IngredientDetails item={selectedIngredient} />
					) : null}
				</BottomSheetView>
			</BottomSheet>
		</GestureHandlerRootView>
	);
}
