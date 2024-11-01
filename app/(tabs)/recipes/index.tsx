import { Pressable, View } from "react-native";

import { RecipeList } from "@/components/RecipeList";
import { colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function TabTwoScreen() {
	const router = useRouter();
	return (
		<View style={{ flex: 1 }}>
			<RecipeList onSelect={({ id }) => router.push(`/recipes/${id}`)} />
			<Pressable
				style={{ backgroundColor: colors.tabIconSelected }}
				className="absolute bottom-5 right-5 rounded-full bg-fuchsia-700 p-4 shadow-lg active:shadow-sm"
				onPress={() => router.push("/recipes/create")}
			>
				<Ionicons name="add" size={32} />
			</Pressable>
		</View>
	);
}
