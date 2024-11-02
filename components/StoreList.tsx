import { Image, Pressable, Text, View } from "react-native";

import queries from "@/utils/queries";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";

function Separator() {
	return <View className="h-2.5" collapsable={false} />;
}

export function StoreList({
	onSelect,
	showRemove,
}: {
	onSelect: (store: { key: string; name: string } | null) => void;
	showRemove?: boolean;
}) {
	const { data } = useQuery(queries.stores.list);

	return (
		<FlashList
			contentContainerStyle={{ padding: 8 }}
			ItemSeparatorComponent={Separator}
			data={data}
			renderItem={({ item }) => (
				<Pressable
					className="bg-white rounded-md shadow-sm active:shadow-none px-4 py-4 flex-row gap-x-4"
					onPress={() => onSelect(item)}
				>
					<View className="flex-1 flex-row items-center gap-x-4">
						<Image source={{ uri: item.icon }} className="size-8" />
						<Text className="text-xl">{item.name}</Text>
					</View>
					<View>
						<Ionicons name="chevron-forward" size={24} />
					</View>
				</Pressable>
			)}
			ListFooterComponent={
				showRemove ? (
					<View className="pt-10">
						<Pressable
							className="border border-red-500 active:bg-red-100 items-center py-4"
							onPress={() => onSelect(null)}
						>
							<Text className="text-xl text-red-500">Remove Store</Text>
						</Pressable>
					</View>
				) : undefined
			}
			estimatedItemSize={200}
		/>
	);
}
