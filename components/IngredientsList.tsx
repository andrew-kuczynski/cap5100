import { Pressable, Text, View } from "react-native";

import queries from "@/utils/queries";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";

export type IngredientDisplay = {
	id: number;
	name: string;
	preferredStoreKey: string | null;
	preferredStore: {
		key: string;
		icon: string;
		name: string;
	} | null;
};

function Separator() {
	return <View className="h-2.5" collapsable={false} />;
}

function Ingredient({
	item,
	onSelect,
}: {
	item: IngredientDisplay;
	onSelect: (ingredient: IngredientDisplay) => void;
}) {
	const { data: ingredient } = useQuery({
		...queries.ingredients.detail(item.id),
		initialData: item,
	});

	const router = useRouter();

	return (
		<Pressable
			className="bg-white rounded-md shadow-sm px-4 py-4 flex-row items-center gap-x-4"
			onPress={() => onSelect(ingredient)}
		>
			<Text className="text-xl flex-1">{ingredient.name}</Text>

			{ingredient.preferredStore ? (
				<Pressable
					className="border rounded-md p-2 active:bg-gray-200"
					onPress={() =>
						router.push(`/store-select?ingredient=${ingredient.id}`)
					}
				>
					<Text>{ingredient.preferredStore.name}</Text>
				</Pressable>
			) : (
				<Pressable
					className="border border-gray-400 rounded-md p-2 active:bg-gray-200"
					onPress={() =>
						router.push(`/store-select?ingredient=${ingredient.id}`)
					}
				>
					<Text className="text-gray-400">-Select Store-</Text>
				</Pressable>
			)}
		</Pressable>
	);
}

export function IngredientsList({
	data,
	onSelect,
}: {
	data: Array<IngredientDisplay> | undefined;
	onSelect: (ingredient: IngredientDisplay) => void;
}) {
	return (
		<FlashList
			contentContainerStyle={{ padding: 8 }}
			data={data}
			ItemSeparatorComponent={Separator}
			ListHeaderComponent={
				<View>
					<Text>Last Made: 2023-01-01</Text>
					<Text>Other info...</Text>
				</View>
			}
			renderItem={({ item }) => <Ingredient item={item} onSelect={onSelect} />}
			estimatedItemSize={200}
		/>
	);
}
