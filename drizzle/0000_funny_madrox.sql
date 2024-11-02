CREATE TABLE `recipes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `recipes_name_unique` ON `recipes` (`name`);--> statement-breakpoint
CREATE TABLE `stores` (
	`key` text PRIMARY KEY NOT NULL,
	`icon` text NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `stores_name_unique` ON `stores` (`name`);--> statement-breakpoint
CREATE TABLE `ingredients` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`preferredStoreKey` text,
	FOREIGN KEY (`preferredStoreKey`) REFERENCES `stores`(`key`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `ingredients_name_unique` ON `ingredients` (`name`);--> statement-breakpoint
CREATE TABLE `meals` (
	`date` integer PRIMARY KEY NOT NULL,
	`recipeId` integer NOT NULL,
	FOREIGN KEY (`recipeId`) REFERENCES `recipes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `recipe_ingredients` (
	`recipeId` integer NOT NULL,
	`ingredientId` integer NOT NULL,
	`amount` text,
	PRIMARY KEY(`recipeId`, `ingredientId`),
	FOREIGN KEY (`recipeId`) REFERENCES `recipes`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`ingredientId`) REFERENCES `ingredients`(`id`) ON UPDATE no action ON DELETE no action
);
