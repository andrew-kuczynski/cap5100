import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

import Button from "@/components/Button";
import { colors } from "@/constants/Colors";
import { useDate, useWeekDays } from "@/hooks/date";
import mutations from "@/utils/mutations";
import queries from "@/utils/queries";
import { useSetWeekLockMap, useWeekDiff, useWeekLockMap } from "@/utils/state";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	addWeeks,
	endOfWeek,
	format,
	getDate,
	getWeek,
	startOfDay,
	startOfWeek,
} from "date-fns";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { useSetWeekDiff } from "../../../utils/state";

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
	weekDay,
	onPress,
	date,
	today,
	weekend,
}: {
	onPress: () => void;
	weekDay: number;
	date: Date;
	today?: boolean;
	weekend: boolean;
}) {
	const day = getDate(date);
	const { data: meal } = useQuery(queries.meals.byDay(date));

	const { data: hasAnyMeals } = useQuery({
		...queries.meals.hasAny,
		initialData: true,
	});

	const setWeekLock = useSetWeekLockMap();
	const mealId = meal?.recipeId;

	useEffect(() => {
		setWeekLock((prev) => ({ ...prev, [weekDay]: !!mealId }));
	}, [mealId, weekDay, setWeekLock]);

	return (
		<Pressable
			className="flex-1 border-t-hairline border-b-hairline border-gray-300 bg-white items-center active:bg-[#eee] py-2 h-32 gap-y-3 px-[2px]"
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
			{meal ? (
				<MealLabel label={meal.recipe.name} color={labelColors[weekDay]} />
			) : null}
			{today && !hasAnyMeals ? (
				<View>
					<Text className="italic">Tap to set meal</Text>
				</View>
			) : null}
		</Pressable>
	);
}

export default function HomeScreen() {
	const router = useRouter();
	const weekDays = useWeekDays();

	const date = useDate();

	const weekDiff = useWeekDiff();
	const adjustedDate = addWeeks(date, weekDiff);

	const weekStart = startOfWeek(adjustedDate);
	const weekEnd = endOfWeek(adjustedDate);

	const { data: todaysMeal } = useQuery(queries.meals.byDay(startOfDay(date)));

	const setWeekLock = useSetWeekLockMap();
	const weekLock = useWeekLockMap();
	const setWeekDiff = useSetWeekDiff();

	const qc = useQueryClient();
	const { mutate: assignRandomMeals } = useMutation({
		mutationFn: mutations.meals.createRandom,
		onError: (error) => {
			console.error(error);
		},
		onSuccess: (result, { dates }) => {
			if (dates.length > 0) {
				qc.invalidateQueries(queries.meals.byWeek(dates[0]));
				dates.map((d) => qc.invalidateQueries(queries.meals.byDay(d)));
			}
			qc.invalidateQueries(queries.meals.hasAny);
		},
	});

	const { data: currentMeals } = useQuery(queries.meals.byWeek(date));

	const onRandomize = () => {
		if (!currentMeals) return;
		const daysThatNeedRandomAssignment = weekDays
			.filter((d) => !weekLock[d.weekDay])
			.map((d) => d.date);

		assignRandomMeals({
			dates: daysThatNeedRandomAssignment,
			current: currentMeals.map((m) => m.recipeId),
		});
	};

	return (
		<SafeAreaView
			style={{ backgroundColor: colors.background }}
			className="flex-1 items-center justify-center"
		>
			<View className="flex-1 justify-center w-full px-2 py-4">
				<View className="gap-y-4">
					<Text className="text-4xl">{format(date, "eeee, PP")}</Text>
					<Pressable
						className="border-hairline rounded-lg px-3 py-2 gap-y-2 bg-white active:bg-gray-100"
						onPress={() => {
							if (todaysMeal) {
								router.push(`/recipes/${todaysMeal.recipeId}`);
								return;
							}

							const todayId = startOfDay(date).valueOf();

							router.push({
								pathname: "/day",
								params: {
									date: todayId,
								},
							});
						}}
					>
						<Text className="text-lg">What's for Dinner?</Text>

						<View className="border-b mb-1 items-center">
							<Text className="text-3xl">
								{todaysMeal?.recipe?.name ?? " "}
							</Text>
						</View>
					</Pressable>
				</View>
			</View>
			<View className="w-full justify-center flex-1 gap-y-4">
				<View className="flex-row items-center justify-center gap-x-8 px-2">
					<View className="flex-1 flex-row justify-start">
						{weekDiff < 0 ? (
							<Button className="p-2 bg-white" onPress={() => setWeekDiff(0)}>
								<Ionicons name="return-down-forward" size={20} color="black" />
							</Button>
						) : null}
					</View>
					<Button
						className="p-2 bg-white"
						onPress={() => setWeekDiff((prev) => prev - 1)}
					>
						<Ionicons name="arrow-back" size={20} color="black" />
					</Button>
					<Text className="text-xl">
						{format(weekStart, "MMM d")} - {format(weekEnd, "MMM d")}
					</Text>
					<Button
						className="p-2 bg-white"
						onPress={() => setWeekDiff((prev) => prev + 1)}
					>
						<Ionicons name="arrow-forward" size={20} color="black" />
					</Button>
					<View className="flex-1 flex-row justify-end">
						{weekDiff > 0 ? (
							<Button className="p-2 bg-white" onPress={() => setWeekDiff(0)}>
								<Ionicons name="return-down-back" size={20} color="black" />
							</Button>
						) : null}
					</View>
				</View>
				<View>
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
					<View className="flex-row">
						{weekDays.map((d) => {
							return (
								<CalDay
									key={d.id}
									date={d.date}
									today={d.isToday}
									weekend={d.isWeekend}
									weekDay={d.weekDay}
									onPress={() =>
										router.push({
											pathname: "/day",
											params: {
												date: d.id,
											},
										})
									}
								/>
							);
						})}
					</View>
				</View>
				<View className="flex-row">
					{weekDays.map((d) => {
						const isLocked = !!weekLock[d.weekDay];

						return (
							<View className="px-3 flex-1" key={d.id}>
								<Button
									className="aspect-square bg-white"
									onPress={() =>
										setWeekLock((prev) => ({
											...prev,
											[d.weekDay]: !isLocked,
										}))
									}
								>
									<Ionicons
										name={isLocked ? "lock-closed" : "lock-open-outline"}
										size={18}
										color="black"
									/>
								</Button>
							</View>
						);
					})}
				</View>
			</View>
			<View className="flex-1 w-full px-2 py-12">
				<Button
					className="gap-x-5 flex-row py-3 bg-white"
					onPress={onRandomize}
				>
					<Ionicons name="shuffle" size={22} color="transparent" />
					<Text className="text-xl">Randomize</Text>
					<Ionicons name="shuffle" size={22} color="black" />
				</Button>
			</View>
		</SafeAreaView>
	);
}
