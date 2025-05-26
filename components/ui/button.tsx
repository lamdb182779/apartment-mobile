// /components/ui/CustomButton.tsx
import React, { ReactNode } from "react";
import { Pressable, Text } from "react-native";

interface CustomButtonProps {
    onPress?: () => void;
    children: ReactNode;
    type?: "primary" | "success" | "danger" | "warning" | "secondary" | "outline";
    className?: string;
    disabled?: boolean
    size?: "lg" | "sm"
}

const buttonStyles = {
    primary: "bg-blue-500",
    success: "bg-green-500",
    danger: "bg-red-500",
    warning: "bg-yellow-500",
    secondary: "bg-gray-500",
    outline: "bg-transparent border border-neutral-300",
};
const textStyles = {
    primary: "text-white",
    success: "text-white",
    danger: "text-white",
    warning: "text-white",
    secondary: "text-neutral-700",
    outline: "text-neutral-700",
};

export const CustomButton: React.FC<CustomButtonProps> = ({
    onPress,
    children,
    type = "primary",
    className,
    disabled = false,
    size = "sm"
}) => {
    return (
        <Pressable
            disabled={disabled}
            onPress={onPress}
            className={`${size === "sm" ? "py-2" : "py-3"} rounded-md ${buttonStyles[type]} focus:outline-none ${className}`}
        >
            <Text className={`text-center ${textStyles[type]} ${size === "sm" ? "" : "text-lg"} font-semibold`}>{children}</Text>
        </Pressable>
    );
};
