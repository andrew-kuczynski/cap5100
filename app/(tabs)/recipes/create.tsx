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
import "../../../global.css"

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
	const [ingredients, setIngredients] = useState("");
	const [amounts, setAmounts] = useState("");

	return (
		<View style={{flex:1 , padding: 16 }}>
			<View style={{ flex:1 }}>
				<Text style={{fontSize: 18}}>Name</Text>
				<TextInput
					style={{ borderColor: "gray", borderWidth: 1, padding: 8, borderRadius: 10 , marginTop: 5, marginBottom: 10}}
					value={name}
					onChangeText={setName}
					autoFocus = {true}
				/>
				<View style={{flexDirection: "row"}}>
					<Text style={{flex:1 , textAlign: "left", fontSize: 17}}>
						Ingredients
					</Text>
					<Text style={{flex:1, textAlign: "right", fontSize: 17}}>Amount</Text>
				</View>
				<View style={{flexDirection: "row"}}>
					<TextInput
						style={{ flex:3, borderColor: "gray", borderWidth: 1, padding: 8, borderRadius: 10 , marginTop: 5, marginRight:2}}
						value={ingredients}
						onChangeText={setIngredients}
						multiline={true}
					/>
					<TextInput
						style={{ flex:1 , borderColor: "gray", borderWidth: 1, padding: 8, borderRadius: 10 , marginTop: 5, marginLeft:2}}
						value={amounts}
						onChangeText={setAmounts}
						multiline={true}


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
