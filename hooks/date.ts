import {
	type Day,
	addDays,
	addWeeks,
	format,
	getDate,
	getDay,
	getMonth,
	getWeek,
	getYear,
	isSameDay,
	isWeekend,
	startOfDay,
	startOfWeek,
} from "date-fns";
import { useEffect, useState } from "react";
import { useWeekDiff } from "../utils/state";

export const useDate = () => {
	const [date, setDate] = useState(new Date("2024-11-05").valueOf());

	useEffect(() => {
		const intervalId = setInterval(() => {
			// setDate(Date.now());
		}, 60_000); // update every minute

		// Cleanup function to clear the interval on unmount
		return () => clearInterval(intervalId);
	}, []);

	return new Date(date);
};

// [0, ..., 6]
const days = Array.from({ length: 7 }, (_, i) => i);

const weekStartsOn: Day = 0;

export const useWeekDays = () => {
	const current = useDate();

	const weekDiff = useWeekDiff();

	const date = addWeeks(current, weekDiff);

	const weekStart = startOfWeek(date, { weekStartsOn });

	return days.map((d) => {
		const dayDate = startOfDay(addDays(weekStart, d));

		return {
			id: dayDate.valueOf(),
			date: dayDate,
			dayDisplay: format(dayDate, "EEEEE"),
			fullDisplay: format(dayDate, "PPpp"),
			isToday: isSameDay(dayDate, current),
			weekDay: getDay(dayDate),
			isWeekend: isWeekend(dayDate),
		};
	});
};
