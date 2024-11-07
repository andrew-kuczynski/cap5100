import type { ReactNode } from "react";
import { Pressable } from "react-native";

type Props = {
	children: ReactNode;
	className?: string;
	onPress?: () => void;
};

function Button({ children, className, onPress }: Props) {
	return (
		<Pressable
			onPress={onPress}
			className={`rounded-lg border active:border-hairline justify-center border-b-[3px] active:border-b items-center ${className ?? ""}`}
		>
			{children}
		</Pressable>
	);
}

export default Button;
