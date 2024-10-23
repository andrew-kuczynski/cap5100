import Ionicons from "@expo/vector-icons/Ionicons";
import { Button, Image, Platform, StyleSheet, View } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import mutations from "@/utils/mutations";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function TabFourScreen() {
	const qc = useQueryClient();
	const deleteMutation = useMutation({
		mutationFn: async () => {
			await mutations.meals.deleteAll();
			await mutations.recipes.deleteAll();
			await mutations.ingredients.deleteAll();
		},
		onSuccess: () => {
			qc.invalidateQueries();
			alert("Deleted");
		},
	});

	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
			headerImage={
				<Ionicons size={310} name="code-slash" style={styles.headerImage} />
			}
		>
			<View>
				<Button
					title="Delete all data"
					onPress={() => deleteMutation.mutate()}
				/>
			</View>
		</ParallaxScrollView>
	);
}

const styles = StyleSheet.create({
	headerImage: {
		color: "#808080",
		bottom: -90,
		left: -35,
		position: "absolute",
	},
	titleContainer: {
		flexDirection: "row",
		gap: 8,
	},
});
