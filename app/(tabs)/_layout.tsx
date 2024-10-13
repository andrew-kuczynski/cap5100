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
				name="index"
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
				name="explore"
				options={{
					title: "Explore",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "code-slash" : "code-slash-outline"}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="three"
				options={{
					title: "Tab 3",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "code-slash" : "code-slash-outline"}
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
							name={focused ? "code-slash" : "code-slash-outline"}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
