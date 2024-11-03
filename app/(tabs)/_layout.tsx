import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { colors } from "@/constants/Colors";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: colors.tint,
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name="(home)"
				options={{
					title: "Week",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "calendar" : "calendar-outline"}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="recipes"
				options={{
					title: "Recipes",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "book" : "book-outline"}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="grocery-list"
				options={{
					title: "Grocery List",
					headerShown: true,

					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "list-circle" : "list-circle-outline"}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="four"
				options={{
					title: "Settings",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon name={focused ? "cog" : "cog-outline"} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
