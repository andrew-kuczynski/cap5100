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
			// border-r-4 active:border-r
			className={`rounded-lg border active:border-hairline justify-center border-b-[3px] active:border-b items-center ${className ?? ""}`}
		>
			{children}
		</Pressable>
	);
}

export default Button;
