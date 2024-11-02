import { colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";

export function AddRecipeButton() {
	const router = useRouter();
	return (
		<Pressable
			style={{ backgroundColor: colors.tabIconSelected }}
			className="absolute bottom-10 right-8 rounded-full bg-fuchsia-700 p-4 shadow-lg active:shadow-sm"
			onPress={() => router.push("/recipes/create")}
		>
			<Ionicons name="add" size={32} />
		</Pressable>
	);
}
