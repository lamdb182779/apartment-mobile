import { poster } from "@/service/fetch";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import useSWRMutation from "swr/mutation";
import { CustomButton } from "../../../components/ui/button";
import { CustomSelect } from "../../../components/ui/select";

export default function LoginScreen() {

    const roles = [
        { value: "owner", id: "31", name: "Chủ căn hộ" },
        { value: "resident", id: "32", name: "Cư dân" },
    ]

    const [role, setRole] = useState("owner");
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigation = useNavigation();

    const { trigger, isMutating } = useSWRMutation("/auth/resetPw", poster)

    const handleLogin = async () => {
        const roleId = roles.find((item) => item.value === role)?.id || "31";
    };

    return (
        <View className="flex-1 justify-center px-6 py-8">
            <Text className="text-2xl font-bold mb-6">Đăng nhập</Text>
            <Text className="text-sm text-gray-600">Vai trò</Text>
            <CustomSelect
                options={roles}
                selected={role}
                onSelect={(item) => setRole(item.value)}
                keyExtractor={(item) => item.id}
                renderButton={(open, selected) => (
                    <Pressable
                        onPress={open}
                        className="border p-4 rounded-md bg-white shadow-md"
                    >
                        <Text className="text-lg text-gray-700">
                            {selected ? roles.find((item) => item.value === selected)?.name : "Chọn vai trò"}
                        </Text>
                    </Pressable>
                )}
            />
            <Text className="text-sm text-gray-600 mt-4">Tên đăng nhập</Text>
            <TextInput
                className="mt-2 w-full border rounded p-3 bg-white"
                onChangeText={(text) => setUsername(text)}
                placeholder="Nhập tên đăng nhập"
            />
            <Text className="text-sm text-gray-600 mt-4">Mật khẩu</Text>
            <TextInput
                className="mt-2 w-full border rounded p-3 bg-white"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                placeholder="Nhập mật khẩu"
            />
            <CustomButton
                title="Đăng nhập"
                onPress={handleLogin}
                type="primary"
                className="mt-6 w-full"
            />
            <View className="w-full flex items-end py-2">
                <Text className="underline">
                    Không thể đăng nhập
                </Text>
            </View>
        </View>
    );
}
