import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";

export function AddRecipeButton() {
	const router = useRouter();
	return (
		<Pressable
			className="absolute bottom-10 right-8 rounded-full bg-sky-500 p-4 shadow-lg active:shadow-sm"
			onPress={() => router.push("/recipes/create")}
		>
			<Ionicons name="add" size={32} />
		</Pressable>
	);
}
