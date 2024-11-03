import { Image, Pressable, Text, View } from "react-native";

import { colors } from "@/constants/Colors";
import { FlashList } from "@shopify/flash-list";
import Checkbox from "expo-checkbox";
import { useMemo, useState } from "react";
import type { IngredientDisplay } from "./IngredientsList";

function Separator(props: {
	leadingItem?: IngredientDisplay | string;
	trailingItem?: IngredientDisplay | string;
}) {
	if (typeof props.leadingItem === "string") {
		return null;
	}

	if (typeof props.trailingItem === "string") {
		return <View className="h-10" collapsable={false} />;
	}

	return <View className="h-2.5" collapsable={false} />;
}

export function GroceryList({
	data,
}: {
	data: Array<IngredientDisplay>;
}) {
	// TODO pull state up to parent ?
	const [checkedMap, setCheckedMap] = useState<Record<number, boolean>>({});
	const toggleCheck = (id: number, checked: boolean) => {
		setCheckedMap((old) => ({ ...old, [id]: checked }));
	};

	const storeMap = useMemo(
		() =>
			data.reduce(
				(acc, val) => {
					if (val.preferredStore) {
						acc[val.preferredStore.key] = val.preferredStore;
					}
					return acc;
				},
				{} as Record<string, IngredientDisplay["preferredStore"]>,
			),
		[data],
	);

	const groupedFlatList = useMemo(() => {
		const groupedByStore = data.reduce(
			(acc, val) => {
				const key = val.preferredStore?.key ?? "";
				if (!acc[key]) {
					acc[key] = [];
				}
				acc[key].push(val);
				return acc;
			},
			{} as Record<string, Array<IngredientDisplay>>,
		);

		const result = Object.entries(groupedByStore).flatMap((item) =>
			Array.isArray(item) ? item.flat() : [],
		);

		return result;
	}, [data]);

	const stickyHeaderIndices = groupedFlatList.reduce((acc, val, index) => {
		if (typeof val === "string") {
			acc.push(index);
		}
		return acc;
	}, [] as number[]);

	return (
		<FlashList
			ItemSeparatorComponent={Separator}
			stickyHeaderIndices={stickyHeaderIndices}
			data={groupedFlatList}
			extraData={checkedMap}
			getItemType={(item) => {
				return typeof item === "string" ? "sectionHeader" : "row";
			}}
			renderItem={({ item, extraData, target }) => {
				if (typeof item === "string") {
					const store = storeMap[item];

					return (
						<View className="px-3 py-3 flex-row gap-x-3 items-center bg-[#F2F2F2]">
							{store ? (
								<Image source={{ uri: store.icon }} className="size-7" />
							) : null}
							<Text className="text-xl">{store?.name ?? "Other"}</Text>
						</View>
					);
				}

				const checked = !!extraData[item.id];

				return (
					<View className="px-1">
						<Pressable
							className="bg-white rounded-md shadow-sm active:shadow-none px-4 py-5 flex-row gap-x-4"
							onPress={() => toggleCheck(item.id, !checked)}
						>
							<Text className="text-xl flex-1">{item.name}</Text>
							<View>
								<Checkbox
									style={{}}
									value={checked}
									onValueChange={(c) => toggleCheck(item.id, c)}
									color={checked ? colors.tabIconSelected : undefined}
								/>
							</View>
						</Pressable>
					</View>
				);
			}}
			estimatedItemSize={200}
		/>
	);
}
