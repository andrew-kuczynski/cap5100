import { Pressable, Text } from "react-native";

import queries from "@/utils/queries";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";

export function RecipeList({
	onSelect,
}: { onSelect: (recipe: { id: number }) => void }) {
	const { data } = useQuery(queries.recipes.list);

	return (
		<FlashList
			data={data}
			renderItem={({ item }) => (
				<Pressable
					onPress={() => onSelect(item)}
					style={{ padding: 8, borderColor: "black", borderWidth: 1 }}
				>
					<Text>{item.name}</Text>
				</Pressable>
			)}
			estimatedItemSize={200}
		/>
	);
}
