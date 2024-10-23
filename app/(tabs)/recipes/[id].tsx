import {
	Image,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import queries from "@/utils/queries";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";

export default function HomeScreen() {
	const { id } = useLocalSearchParams();
	const parsed = Number(id);

	const { data } = useQuery(queries.recipes.detail(parsed));

	return (
		<View>
			<Text>{JSON.stringify(data, null, 2)}</Text>
		</View>
	);
}
