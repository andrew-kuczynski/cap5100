import { Button, View } from "react-native";

import { RecipeList } from "@/components/RecipeList";
import { useRouter } from "expo-router";

export default function TabTwoScreen() {
	const router = useRouter();
	return (

		<View style={{ flex: 1 , padding: 10}}>
			<RecipeList onSelect={({ id }) => router.push(`/recipes/${id}`)} />

			<Button
				title="Add Recipe"
				onPress={() => router.push("/recipes/create")}
				
			/>
		</View>
	);
}
