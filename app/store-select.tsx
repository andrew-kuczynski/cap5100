import { Image, Platform, StyleSheet, Text, View } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { StoreList } from "@/components/StoreList";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import mutations from "@/utils/mutations";
import queries from "@/utils/queries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useGlobalSearchParams, useRouter } from "expo-router";

export default function HomeScreen() {
	const params = useGlobalSearchParams();

	const ingredientId = params.ingredient ? Number(params.ingredient) : null;

	const invalid = !ingredientId || Number.isNaN(ingredientId);

	const { data } = useQuery({
		...queries.ingredients.detail(ingredientId as number),
		enabled: !invalid,
	});

	const qc = useQueryClient();
	const router = useRouter();

	const { mutate } = useMutation({
		mutationFn: mutations.ingredients.setPreferredStore,
		onSuccess(result, variables) {
			qc.invalidateQueries({
				queryKey: queries.meals.byWeek._def,
			});
			qc.invalidateQueries(queries.ingredients.detail(variables.id));
			router.back();
		},
	});

	if (invalid) {
		return (
			<View>
				<Text>Invalid ingredient id</Text>
			</View>
		);
	}

	return (
		<View className="flex-1">
			<Text>Select store for {data?.name}</Text>
			<StoreList
				onSelect={(store) => mutate({ id: ingredientId, storeKey: store?.key })}
				showRemove={data?.preferredStoreKey !== null}
			/>
		</View>
	);
}
