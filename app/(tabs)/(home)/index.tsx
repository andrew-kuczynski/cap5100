import { Pressable, StyleSheet, Text, View } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { useDate, useWeekDays } from "@/hooks/date";
import queries from "@/utils/queries";
import { useQuery } from "@tanstack/react-query";
import { endOfWeek, getDate, startOfWeek } from "date-fns";
import { useRouter } from "expo-router";

function CalDay({
	onPress,
	label,
	date,
	today,
}: { onPress: () => void; label: string; date: Date; today?: boolean }) {
	const day = getDate(date);
	const { data: meal } = useQuery(queries.meals.byDay(date));

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
				<Text>{label}</Text>
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
					today
						? {
								borderColor: "red",
								borderWidth: 1,
							}
						: {},
				]}
				onPress={onPress}
			>
				<View style={{ flex: 2 }}>
					<Text>{meal?.recipe?.name ?? "?"}</Text>
				</View>
				<Text style={{ flex: 1 }}>{day}</Text>
			</Pressable>
		</View>
	);
}

export default function HomeScreen() {
	const router = useRouter();
	const weekDays = useWeekDays();

	const date = useDate();

	const { data: meals } = useQuery(
		queries.meals.byDateRange(startOfWeek(date), endOfWeek(date)),
	);

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
				{weekDays.map((d, i) => (
					<CalDay
						key={d.id}
						label={d.dayDisplay}
						date={d.date}
						today={d.isToday}
						onPress={() =>
							router.push({
								pathname: "/day",
								params: {
									date: d.id,
								},
							})
						}
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
