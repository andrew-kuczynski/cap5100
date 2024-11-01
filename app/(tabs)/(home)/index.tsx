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
			<View className="bg-[#ddd] rounded-[15] h-[30] justify-center items-center">
				<Text>{label}</Text>
			</View>
			<Pressable
				className="rounded-[15] items-center aspect-square bg-[#eee] active:bg-[#ddd] aria-selected:border aria-selected:border-red-600"
				aria-selected={today}
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
