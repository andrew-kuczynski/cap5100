import {
	Alert,
	KeyboardAvoidingView,
	Pressable,
	ScrollView,
	Text,
	TextInput,
	View,
} from "react-native";

import Button from "@/components/Button";
import mutations from "@/utils/mutations";
import queries from "@/utils/queries";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Haptics from "expo-haptics";
import { Stack, useRouter } from "expo-router";
import { useRef, useState } from "react";

export default function CreateScreen() {
	const ingredientsInput = useRef<TextInput>(null);
	const nameInput = useRef<TextInput>(null);
	const router = useRouter();
	const qc = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: mutations.recipes.create,
		onSuccess: () => {
			Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
			qc.invalidateQueries(queries.recipes.list);
			router.back();
		},
		onError(error) {
			console.error(error);
			Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
		},
	});

	const [name, setName] = useState("");

	const [ingredientValue, setIngredientValue] = useState("");

	const [ingredients, setIngredients] = useState<string[]>([]);

	const onSubmitName = () => {
		ingredientsInput.current?.focus();
		Haptics.selectionAsync();
	};

	const onSubmitIngredient = () => {
		const trimmed = ingredientValue.trim();

		if (!trimmed) {
			Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
			return;
		}

		const newIngredients = trimmed
			.split("\n")
			.map((i) => i.trim())
			.filter((i) => !ingredients.includes(i));

		if (newIngredients.length === 0) return;

		setIngredients((oldIng) => newIngredients.concat(oldIng));
		setIngredientValue("");
		Haptics.selectionAsync();
	};

	const onIngredientPress = (i: number) => () => {
		Alert.prompt(
			"Update ingredient name",
			undefined,
			(name) =>
				setIngredients((old) => {
					if (name) {
						return old.map((ing, j) => (i === j ? name : ing));
					}
					return old.filter((_, j) => j !== i);
				}),
			undefined,
			ingredients[i],
		);
	};

	const onSave = () => {
		if (!name) {
			nameInput.current?.focus();
			Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
			return;
		}
		if (ingredients.length === 0) {
			ingredientsInput.current?.focus();
			Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
			return;
		}
		mutate({ name, ingredients });
	};

	const valid = !!name && ingredients.length > 0;

	return (
		<ScrollView
			className="px-4 py-8 flex flex-1"
			keyboardShouldPersistTaps="handled"
		>
			<Stack.Screen
				options={{
					headerRight() {
						if (!valid) {
							return null;
						}
						return (
							<Pressable
								onPress={onSave}
								className="active:bg-gray-100 py-2 px-4"
							>
								<Text className="text-sky-500 text-lg">Save</Text>
							</Pressable>
						);
					},
				}}
			/>
			<View className="flex-1 gap-y-12">
				<View>
					<TextInput
						ref={nameInput}
						value={name}
						onChangeText={setName}
						style={{ fontSize: 24 }}
						className="border-hairline rounded-lg p-2"
						placeholderTextColor="gray"
						placeholder="Recipe Name"
						onSubmitEditing={onSubmitName}
						autoFocus
						enablesReturnKeyAutomatically
						returnKeyType="done"
					/>
				</View>

				<View className="gap-y-6">
					<View className="flex-row gap-x-4">
						<TextInput
							ref={ingredientsInput}
							value={ingredientValue}
							onChangeText={setIngredientValue}
							style={{ fontSize: 24 }}
							className="border-hairline rounded-lg p-2 flex-1"
							placeholderTextColor="gray"
							placeholder="Ingredient(s)"
							onSubmitEditing={onSubmitIngredient}
							enablesReturnKeyAutomatically
							blurOnSubmit={false}
							returnKeyType="next"
						/>
						<Button
							onPress={onSubmitIngredient}
							className="aspect-square bg-sky-500"
						>
							<Ionicons name="add" size={24} color="white" />
						</Button>
					</View>
					{ingredients.map((ingredient, i) => (
						<View
							key={ingredient}
							className="border-hairline rounded-lg gap-x-3 items-center justify-between flex-row"
						>
							<Pressable
								className="p-3 flex-row gap-x-2 items-center"
								onPress={onIngredientPress(i)}
							>
								<Ionicons name="pencil" size={18} />
								<Text className="text-xl">{ingredient}</Text>
							</Pressable>
							<Pressable
								className="p-3"
								onPress={() => {
									setIngredients(ingredients.filter((_, j) => j !== i));
									Haptics.selectionAsync();
								}}
							>
								<Ionicons name="trash" size={22} color="red" />
							</Pressable>
						</View>
					))}
				</View>

				<KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={125}>
					<Button className="w-full bg-sky-500 py-4" onPress={onSave}>
						<Text className="text-white text-2xl">Save</Text>
					</Button>
				</KeyboardAvoidingView>
			</View>
		</ScrollView>
	);
}
