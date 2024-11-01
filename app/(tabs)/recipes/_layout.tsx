import { Stack } from "expo-router";

export default function Layout() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{ title: "Recipes", headerShown: true }}
			/>
			<Stack.Screen
				name="create"
				options={{
					title: "Add Recipe",
					presentation: "modal",
				}}
			/>
		</Stack>
	);
}
