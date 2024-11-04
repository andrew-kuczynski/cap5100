import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { colors } from "@/constants/Colors";
import mutations from "@/utils/mutations";
import queries from "@/utils/queries";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
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
	const [tempIngredientValue, setTempIngredientValue] = useState("");

	const [ingredientValue, setIngredientValue] = useState("");

	const [focusedIngredient, setFocusedIngredient] = useState<number | null>(
		null,
	);
	const [ingredients, setIngredients] = useState<string[]>([]);

	const onSubmitName = () => {
		ingredientsInput.current?.focus();
		Haptics.selectionAsync();
	};

	const onSubmitIngredient = () => {
		const trimmed = ingredientValue.trim();

		if (focusedIngredient !== null) {
			if (trimmed) {
				setIngredients(
					ingredients.map((existing, i) =>
						i === focusedIngredient ? trimmed : existing,
					),
				);
				Haptics.selectionAsync();
			}
			setFocusedIngredient(null);
			setIngredientValue(tempIngredientValue);
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
		setFocusedIngredient(i);
		setTempIngredientValue(ingredientValue);
		setIngredientValue(ingredients[i]);
		ingredientsInput.current?.focus();
	};

	const onSave = () => {
		mutate({ name, ingredients });
	};

	return (
		<ScrollView
			className="px-4 py-8 flex flex-1"
			keyboardShouldPersistTaps="handled"
		>
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
					<View>
						<TextInput
							ref={ingredientsInput}
							value={ingredientValue}
							onChangeText={setIngredientValue}
							style={{ fontSize: 24 }}
							className="border-hairline rounded-lg p-2"
							placeholderTextColor="gray"
							placeholder="Ingredients(s)"
							onSubmitEditing={onSubmitIngredient}
							enablesReturnKeyAutomatically
							blurOnSubmit={false}
							returnKeyType="next"
						/>
						<Pressable
							onPress={onSubmitIngredient}
							className="absolute right-0 top-0 h-full aspect-square p-1"
						>
							<View
								style={{ backgroundColor: colors.tabIconSelected }}
								className="rounded-lg items-center justify-center h-full w-full"
							>
								<Ionicons
									name={focusedIngredient === null ? "add" : "checkmark"}
									size={24}
									color="white"
								/>
							</View>
						</Pressable>
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

				<View>
					<Pressable
						style={{ backgroundColor: colors.tabIconSelected }}
						className="w-full rounded-lg p-3 items-center"
						onPress={onSave}
					>
						<Text className="text-white text-2xl">Save</Text>
					</Pressable>
				</View>
			</View>
		</ScrollView>
	);
}
