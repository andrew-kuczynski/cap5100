import {
	type Day,
	addDays,
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

export const useDate = () => {
	const [date, setDate] = useState(Date.now());

	useEffect(() => {
		const intervalId = setInterval(() => {
			setDate(Date.now());
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
	const date = useDate();
	const weekStart = startOfWeek(date, { weekStartsOn });

	return days.map((d) => {
		const dayDate = startOfDay(addDays(weekStart, d));

		return {
			id: dayDate.valueOf(),
			date: dayDate,
			dayDisplay: format(dayDate, "EEEEE"),
			fullDisplay: format(dayDate, "PPpp"),
			isToday: isSameDay(dayDate, date),
			weekDay: getDay(dayDate),
			isWeekend: isWeekend(dayDate),
		};
	});
};
