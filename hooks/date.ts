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

export const useDateInfo = () => {
	const date = useDate();

	const year = getYear(date);
	const week = getWeek(date, {
		weekStartsOn,
	});

	return {
		year,
		week,
	};
};

export const useWeekDays = () => {
	const date = useDate();
	const weekStart = startOfWeek(date, { weekStartsOn });

	return days.map((d) => {
		const dayDate = addDays(weekStart, d);

		return {
			dayDisplay: format(dayDate, "eee"),
			fullDisplay: format(dayDate, "PPpp"),
			weekDay: d,
			day: getDate(dayDate),
			date: dayDate,
			isToday: isSameDay(dayDate, date),
			year: getYear(dayDate),
		};
	});
};
