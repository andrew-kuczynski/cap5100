import { useMigrations } from "@/db/migrations";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Text, View } from "react-native";
import "react-native-reanimated";

const queryClient = new QueryClient();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const { success, error } = useMigrations();

	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	useEffect(() => {
		if (loaded && success) {
			SplashScreen.hideAsync();
		}
	}, [loaded, success]);

	// if (error) {
	// 	return (
	// 		<View>
	// 			<Text>Migration error: {error.message}</Text>
	// 		</View>
	// 	);
	// }

	// if (!loaded || !success) {
	// 	return null;
	// }

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider value={DefaultTheme}>
				<Stack>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					<Stack.Screen
						name="modal"
						options={{
							presentation: "modal",
						}}
					/>
					<Stack.Screen name="+not-found" />
				</Stack>
			</ThemeProvider>
		</QueryClientProvider>
	);
}
