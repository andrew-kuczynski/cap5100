import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/Colors";
import { useDate, useWeekDays } from "@/hooks/date";
import queries from "@/utils/queries";
import { useQuery } from "@tanstack/react-query";
import { format, getDate } from "date-fns";
import { Stack, useRouter } from "expo-router";

const colorClassMap = {
	fuchsia: {
		bg: "bg-fuchsia-100",
		text: "text-fuchsia-950",
	},
	emerald: {
		bg: "bg-emerald-100",
		text: "text-emerald-950",
	},
	sky: {
		bg: "bg-sky-100",
		text: "text-sky-950",
	},
	rose: {
		bg: "bg-rose-100",
		text: "text-rose-950",
	},
	amber: {
		bg: "bg-amber-100",
		text: "text-amber-950",
	},
	violet: {
		bg: "bg-violet-100",
		text: "text-violet-950",
	},
	slate: {
		bg: "bg-slate-100",
		text: "text-slate-950",
	},
};

type LabelColor = keyof typeof colorClassMap;

const labelColors = Object.keys(colorClassMap) as LabelColor[];

function MealLabel({ label, color }: { label: string; color: LabelColor }) {
	const { bg, text } = colorClassMap[color];

	return (
		<View className={`w-full rounded-md p-0.5 ${bg}`}>
			<Text
				className={`leading-tight text-sm font-semibold ${text}`}
				numberOfLines={3}
			>
				{label}
			</Text>
		</View>
	);
}

function CalDay({
	onPress,
	date,
	today,
	color,
	weekend,
}: {
	onPress: () => void;
	date: Date;
	today?: boolean;
	color: LabelColor;
	weekend: boolean;
}) {
	const day = getDate(date);
	const { data: meal } = useQuery(queries.meals.byDay(date));

	return (
		<Pressable
			className="flex-1 items-center active:bg-[#eee] py-2 h-32 gap-y-3 px-[2px]"
			onPress={onPress}
		>
			<View
				aria-selected={today}
				className="aria-selected:bg-red-500 bg-transparent rounded-full size-11 items-center justify-center"
			>
				<Text
					aria-selected={today}
					className={`aria-selected:text-white text-xl aria-selected:font-bold font-semibold ${weekend && !today ? "opacity-50" : ""}`}
				>
					{day}
				</Text>
			</View>
			{meal ? <MealLabel label={meal.recipe.name} color={color} /> : null}
		</Pressable>
	);
}

export default function HomeScreen() {
	const router = useRouter();
	const weekDays = useWeekDays();

	const date = useDate();

	return (
		<View
			style={{ backgroundColor: colors.background }}
			className="flex-1 items-center justify-center"
		>
			<Stack.Screen options={{ title: format(date, "LLLL") }} />
			<View className="flex-row items-center py-1">
				{weekDays.map((d) => (
					<View
						key={d.id}
						className={`flex-1 items-center ${d.isWeekend ? "opacity-50" : ""}`}
					>
						<Text className="text-xs">{d.dayDisplay}</Text>
					</View>
				))}
			</View>
			<View className="flex-row border-t-hairline border-b-hairline border-gray-300 bg-white">
				{weekDays.map((d, i) => (
					<CalDay
						key={d.id}
						date={d.date}
						today={d.isToday}
						color={labelColors[d.weekDay]}
						weekend={d.isWeekend}
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
		</View>
	);
}
