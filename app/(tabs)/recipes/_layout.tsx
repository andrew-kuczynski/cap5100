import { useMigrations } from "@/db/migrations";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Layout() {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: true }} />
			<Stack.Screen
				name="create"
				options={{
					presentation: "modal",
				}}
			/>
		</Stack>
	);
}
