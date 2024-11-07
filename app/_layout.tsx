import { useMigrations } from "@/db/migrations";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Text, View } from "react-native";
import "react-native-reanimated";
import "./global.css";
import { useSeed } from "@/db/seed";

const queryClient = new QueryClient();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function App() {
	const status = useSeed();
	const { success, error } = useMigrations();

	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	useEffect(() => {
		if (loaded && success && status === "success") {
			SplashScreen.hideAsync();
		}
	}, [loaded, success, status]);

	if (error) {
		return (
			<View>
				<Text>Migration error: {error.message}</Text>
			</View>
		);
	}

	if (status === "error") {
		return (
			<View>
				<Text>Seeding error</Text>
			</View>
		);
	}

	if (!loaded || !success || status !== "success") {
		return null;
	}

	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen
				name="store-select"
				options={{
					title: "Select Store",
					presentation: "modal",
				}}
			/>
			<Stack.Screen
				name="create-recipe"
				options={{
					title: "Create Recipe",
					presentation: "modal",
				}}
			/>
			<Stack.Screen name="+not-found" />
		</Stack>
	);
}

export default function RootLayout() {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider value={DefaultTheme}>
				<App />
			</ThemeProvider>
		</QueryClientProvider>
	);
}
