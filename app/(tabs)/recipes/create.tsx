import {
	Button,
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
import mutations from "@/utils/mutations";
import queries from "@/utils/queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function HomeScreen() {
	const router = useRouter();
	const qc = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: mutations.recipes.create,
		onSuccess: () => {
			qc.invalidateQueries(queries.recipes.list);
			router.back();
		},
	});

	const [name, setName] = useState("");

	return (
		<View style={{ padding: 16 }}>
			<View>
				<Text>Name</Text>
				<TextInput
					style={{ borderColor: "black", borderWidth: 1, padding: 8 }}
					value={name}
					onChangeText={setName}
				/>
			</View>

			<View>
				<Button
					title="Create"
					onPress={() => {
						if (name) {
							mutate({ name });
						}
					}}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: "absolute",
	},
});
