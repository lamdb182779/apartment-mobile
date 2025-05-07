// /components/ui/CustomButton.tsx
import React from "react";
import { Pressable, Text } from "react-native";

interface CustomButtonProps {
    onPress: () => void;
    title: string;
    type?: "primary" | "success" | "danger" | "warning" | "secondary" | "ghost" | "outline";
    className?: string;
}

const buttonStyles = {
    primary: "bg-blue-500 text-white",
    success: "bg-green-500 text-white",
    danger: "bg-red-500 text-white",
    warning: "bg-yellow-500 text-white",
    secondary: "bg-gray-500 text-white",
    ghost: "bg-transparent border border-gray-300 text-gray-700",
    outline: "bg-transparent border-2 border-blue-500 text-blue-500",
};

export const CustomButton: React.FC<CustomButtonProps> = ({
    onPress,
    title,
    type = "primary",
    className,
}) => {
    return (
        <Pressable
            onPress={onPress}
            className={`p-3 rounded-md ${buttonStyles[type]} hover:bg-opacity-80 focus:outline-none ${className}`}
        >
            <Text className="text-center text-lg">{title}</Text>
        </Pressable>
    );
};
