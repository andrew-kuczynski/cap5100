// https://orm.drizzle.team/docs/get-started/expo-new#step-5---setup-drizzle-config-file

import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "sqlite",
	driver: "expo",
	schema: "./db/schema/index.ts",
	out: "./drizzle",
});
