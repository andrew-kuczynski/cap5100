import { View } from "react-native";

import { AddRecipeButton } from "@/components/AddRecipeButton";
import { RecipeList } from "@/components/RecipeList";
import { useRouter } from "expo-router";

export default function TabTwoScreen() {
	const router = useRouter();
	return (
		<View style={{ flex: 1 }}>
			<RecipeList onSelect={({ id }) => router.push(`/recipes/${id}`)} />
			<AddRecipeButton />
		</View>
	);
}
