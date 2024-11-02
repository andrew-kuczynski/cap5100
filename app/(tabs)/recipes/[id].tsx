import { Alert, Image, Pressable, Text, View } from "react-native";

import {
	type IngredientDisplay,
	IngredientsList,
} from "@/components/IngredientsList";
import mutations from "@/utils/mutations";
import queries from "@/utils/queries";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { type ReactNode, useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function IngredientDetail({
	label,
	value,
	onEdit,
}: { label: string; value: ReactNode; onEdit: () => void }) {
	return (
		<View className="w-full justify-between flex-row items-center">
			<Text className="text-lg">{label}</Text>
			<Pressable className="flex-row items-center" onPress={onEdit}>
				{value}
				<View className="p-3">
					<Ionicons name="pencil" size={18} className="mt-0.5" />
				</View>
			</Pressable>
		</View>
	);
}

function IngredientDetails({ item }: { item: IngredientDisplay }) {
	const { data: ingredient } = useQuery({
		...queries.ingredients.detail(item.id),
		initialData: item,
	});

	const router = useRouter();
	const qc = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: mutations.ingredients.updateName,
		onSuccess() {
			qc.invalidateQueries(queries.ingredients.detail(item.id));
		},
	});

	return (
		<View className="items-center gap-y-5">
			<Pressable
				onPress={() =>
					Alert.prompt(
						"Update name",
						undefined,
						(name) => mutate({ id: item.id, name }),
						undefined,
						ingredient.name,
					)
				}
				className="flex-row gap-x-4 items-center justify-center"
			>
				<Ionicons name="pencil" size={22} color="transparent" />
				<Text className="text-xl">{ingredient.name}</Text>
				<Ionicons name="pencil" size={22} className="mt-1" />
			</Pressable>

			<IngredientDetail
				label="Store"
				value={
					ingredient.preferredStore ? (
						<View className="flex-row gap-x-3">
							<Image
								source={{ uri: ingredient.preferredStore.icon }}
								className="size-5"
							/>
							<Text>{ingredient.preferredStore.key}</Text>
						</View>
					) : (
						<Text>None</Text>
					)
				}
				onEdit={() => router.push(`/store-select?ingredient=${ingredient.id}`)}
			/>
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
				<BottomSheetView className="px-4">
					{selectedIngredient ? (
						<IngredientDetails item={selectedIngredient} />
					) : null}
				</BottomSheetView>
			</BottomSheet>
		</GestureHandlerRootView>
	);
}
