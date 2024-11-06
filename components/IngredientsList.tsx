import { Image, Pressable, Text, View } from "react-native";

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

	return (
		<View className="bg-white rounded-md shadow-sm px-4 py-4 flex-row items-center gap-x-4">
			<Text className="text-xl flex-1">{ingredient.name}</Text>

			{ingredient.preferredStore ? (
				<View className="flex-row gap-x-2 min-w-[72px]">
					<Image
						source={{ uri: ingredient.preferredStore.icon }}
						className="size-5"
					/>
					<Text>{ingredient.preferredStore.key}</Text>
				</View>
			) : null}
			<Pressable onPress={() => onSelect(ingredient)}>
				<Ionicons name="ellipsis-horizontal" size={20} />
			</Pressable>
		</View>
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
			// ListHeaderComponent={
			// 	<View>
			// 		<Text>Last Made: 2023-01-01</Text>
			// 		<Text>Other info...</Text>
			// 	</View>
			// }
			renderItem={({ item }) => <Ingredient item={item} onSelect={onSelect} />}
			estimatedItemSize={200}
		/>
	);
}
