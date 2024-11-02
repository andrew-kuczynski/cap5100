import { db } from "@/db";
import { useQuery } from "@tanstack/react-query";
import { storesTable } from "./schema";
import type { StoreInsert } from "./types";

const stores: Array<StoreInsert> = [
	{
		key: "PBLX",
		name: "Publix",
		icon: "",
	},
	{
		key: "ALDI",
		name: "Aldi",
		icon: "",
	},
	{
		key: "WLMT",
		name: "Walmart",
		icon: "",
	},
	{
		key: "TRAJ",
		name: "Trader Joe's",
		icon: "",
	},
];

async function seedStores() {
	// console.log("Seeding stores");
	await db.delete(storesTable);
	await db.insert(storesTable).values(stores).onConflictDoNothing();
	return true;
}

export function useSeed() {
	const { status } = useQuery({
		queryKey: ["db-seed"],
		queryFn: seedStores,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
		staleTime: Number.POSITIVE_INFINITY,
		gcTime: Number.POSITIVE_INFINITY,
	});

	return status;
}
