import { db } from "@/db";
import { useQuery } from "@tanstack/react-query";
import { storesTable } from "./schema";
import type { StoreInsert } from "./types";

const getFavicon = (url: string) =>
	`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}o&size=128`;

const stores: Array<StoreInsert> = [
	{
		key: "PBLX",
		name: "Publix",
		icon: getFavicon("https://www.publix.com/"),
	},
	{
		key: "ALDI",
		name: "Aldi",
		icon: getFavicon("https://www.aldi.us/"),
	},
	{
		key: "WLMT",
		name: "Walmart",
		icon: getFavicon("https://www.walmart.com/"),
	},
	{
		key: "TRAJ",
		name: "Trader Joe's",
		icon: getFavicon("https://www.traderjoes.com/"),
	},
];

async function seedStores() {
	// console.log("Seeding stores");
	// await db.delete(storesTable);
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
