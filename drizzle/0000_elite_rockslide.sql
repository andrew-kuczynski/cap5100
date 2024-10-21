CREATE TABLE `ingredients` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`preferredStoreId` integer,
	FOREIGN KEY (`preferredStoreId`) REFERENCES `stores`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `meals` (
	`year` integer NOT NULL,
	`week` integer NOT NULL,
	`day` integer NOT NULL,
	`recipeId` integer NOT NULL,
	PRIMARY KEY(`year`, `week`, `day`),
	FOREIGN KEY (`recipeId`) REFERENCES `recipes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `week_index` ON `meals` (`year`,`week`);--> statement-breakpoint
CREATE TABLE `recipe_ingredients` (
	`recipeId` integer NOT NULL,
	`ingredientId` integer NOT NULL,
	`amount` text,
	PRIMARY KEY(`recipeId`, `ingredientId`),
	FOREIGN KEY (`recipeId`) REFERENCES `recipes`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`ingredientId`) REFERENCES `ingredients`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `recipes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `stores` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
