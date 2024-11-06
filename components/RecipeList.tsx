import { Pressable, Text, View } from "react-native";

import queries from "@/utils/queries";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { type ReactElement, ReactNode } from "react";

function Separator() {
	return <View className="h-2.5" collapsable={false} />;
}

export function RecipeList({
	onSelect,
	header,
}: {
	onSelect: (recipe: { id: number; name: string }) => void;
	header?: ReactElement;
}) {
	const router = useRouter();
	const { data } = useQuery(queries.recipes.list);

	return (
		<FlashList
			contentContainerStyle={{ padding: 8 }}
			ItemSeparatorComponent={Separator}
			data={data}
			ListEmptyComponent={
				<Pressable
					onPress={() => router.push("/create-recipe")}
					className="items-center py-8 gap-y-8"
				>
					<Text className="text-2xl">You have no recipes yet</Text>
					<Text className="text-xl justify-center">
						Add one by tapping the{" "}
						<View className="-mb-1">
							<Ionicons name="add-circle-outline" size={25} />
						</View>{" "}
						button
					</Text>
				</Pressable>
			}
			ListHeaderComponent={data && data.length > 0 ? header : undefined}
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
