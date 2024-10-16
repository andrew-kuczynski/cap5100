import {
	Image,
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";

function CalDay({
	onPress,
	label,
	day,
}: { onPress: () => void; label: string; day: number }) {
	return (
		<View style={{ flex: 1, rowGap: 4 }}>
			<View
				style={{
					backgroundColor: "#dddddd",
					height: 30,
					borderRadius: 15,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text style={{}}>{label}</Text>
			</View>
			<Pressable
				style={({ pressed }) => [
					{
						backgroundColor: pressed ? "#ddd" : "#eee",
					},
					{
						borderRadius: 15,
						aspectRatio: 1,
						width: "100%",
						alignItems: "center",
					},
				]}
				onPress={onPress}
			>
				<View style={{ flex: 2 }} />
				<Text style={{ flex: 1 }}>{day}</Text>
			</Pressable>
		</View>
	);
}

export default function HomeScreen() {
	const router = useRouter();

	return (
		<ThemedView
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				paddingHorizontal: 12,
			}}
		>
			<View style={{ flexDirection: "row", columnGap: 4 }}>
				{["MON", "TUE", "WED", "THU", "FRI"].map((d, i) => (
					<CalDay
						key={d}
						label={d}
						day={i + 13} // example day
						onPress={() => router.push("/modal")}
					/>
				))}
			</View>
		</ThemedView>
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
