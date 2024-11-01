import { Text, View } from "react-native";

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

export default function HomeScreen() {
	const bottomSheetRef = useRef<BottomSheet>(null);
	const { id } = useLocalSearchParams();
	const parsed = Number(id);

	const { data } = useQuery(queries.recipes.detail(parsed));

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
					// bottomSheetRef.current?.close();
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
					<Text className="text-2xl">{selectedIngredient?.name}</Text>
				</BottomSheetView>
			</BottomSheet>
		</GestureHandlerRootView>
	);
}
