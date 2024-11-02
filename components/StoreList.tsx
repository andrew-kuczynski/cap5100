import { Pressable, Text, View } from "react-native";

import queries from "@/utils/queries";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";

function Separator() {
	return <View className="h-2.5" collapsable={false} />;
}

export function StoreList({
	onSelect,
}: { onSelect: (store: { key: string; name: string }) => void }) {
	const { data } = useQuery(queries.stores.list);

	return (
		<FlashList
			contentContainerStyle={{ padding: 8 }}
			ItemSeparatorComponent={Separator}
			data={data}
			renderItem={({ item }) => (
				<Pressable
					className="bg-white rounded-md shadow-sm active:shadow-none px-4 py-5 flex-row gap-x-4"
					onPress={() => onSelect(item)}
				>
					<Text className="text-xl flex-1">{item.name}</Text>
					<View>
						<Ionicons name="chevron-forward" size={24} />
					</View>
				</Pressable>
			)}
			estimatedItemSize={200}
		/>
	);
}
