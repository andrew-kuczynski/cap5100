import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";

export function AddRecipeButton() {
	const router = useRouter();
	return (
		<Pressable
			className="absolute bottom-10 right-8 rounded-full bg-sky-500 p-4 shadow-lg active:shadow-sm"
			onPress={() => {
				Haptics.selectionAsync();
				router.push("/create-recipe");
			}}
		>
			<Ionicons name="add" size={32} />
		</Pressable>
	);
}
