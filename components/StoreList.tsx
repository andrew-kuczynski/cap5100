import { Image, Pressable, Text, View } from "react-native";

import queries from "@/utils/queries";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import type { ReactElement } from "react";
import Button from "./Button";

function Separator() {
	return <View className="h-2.5" collapsable={false} />;
}

export function StoreList({
	onSelect,
	showRemove,
	header,
}: {
	onSelect: (store: { key: string; name: string } | null) => void;
	showRemove?: boolean;
	header?: ReactElement;
}) {
	const router = useRouter();
	const { data } = useQuery(queries.stores.list);

	return (
		<FlashList
			contentContainerStyle={{ padding: 8 }}
			ItemSeparatorComponent={Separator}
			ListHeaderComponent={header}
			data={data}
			renderItem={({ item }) => (
				<Pressable
					className="bg-white items-center rounded-md shadow-sm active:shadow-none px-4 py-4 flex-row gap-x-4"
					onPress={() => onSelect(item)}
				>
					<View className="flex-1 flex-row items-center gap-x-4">
						<Image source={{ uri: item.icon }} className="size-7" />
						<Text className="text-xl">{item.name}</Text>
					</View>
					<View>
						<Ionicons name="chevron-forward" size={24} />
					</View>
				</Pressable>
			)}
			ListFooterComponent={
				<View className="pt-12 gap-y-8">
					{showRemove && (
						<Button className="bg-red-200 py-4" onPress={() => onSelect(null)}>
							<Text className="text-xl">Remove Store</Text>
						</Button>
					)}
					<Button className="py-4  bg-slate-200" onPress={() => router.back()}>
						<Text className="text-xl">Nevermind</Text>
					</Button>
				</View>
			}
			estimatedItemSize={200}
		/>
	);
}
