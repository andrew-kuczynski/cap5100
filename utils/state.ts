import { atom, useAtomValue, useSetAtom } from "jotai";

const weekDiffAtom = atom(0);

export const useWeekDiff = () => useAtomValue(weekDiffAtom);

export const useSetWeekDiff = () => useSetAtom(weekDiffAtom);

const weekLockMapAtom = atom<Record<number, boolean>>({
	0: false,
	1: false,
	2: false,
	3: false,
	4: false,
	5: false,
	6: false,
});

export const useWeekLockMap = () => useAtomValue(weekLockMapAtom);

export const useSetWeekLockMap = () => useSetAtom(weekLockMapAtom);
