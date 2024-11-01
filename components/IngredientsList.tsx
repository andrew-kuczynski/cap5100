import { Pressable, Text, View } from "react-native";

import queries from "@/utils/queries";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";

export type IngredientDisplay = {
	id: number;
	name: string;
	preferredStore: {
		id: number;
		name: string;
	} | null;
};

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
			ListHeaderComponent={
				<View>
					<Text>Last Made: 2023-01-01</Text>
					<Text>Other info...</Text>
				</View>
			}
			renderItem={({ item }) => (
				<Pressable
					className="bg-white rounded-md shadow-sm px-4 py-5 flex-row gap-x-4"
					onPress={() => onSelect(item)}
				>
					<Text className="text-xl flex-1">{item.name}</Text>
				</Pressable>
			)}
			estimatedItemSize={200}
		/>
	);
}
