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
					title: "Home",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "home" : "home-outline"}
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
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "basket" : "basket-outline"}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="four"
				options={{
					title: "Tab 4",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "settings" : "settings-outline"}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
