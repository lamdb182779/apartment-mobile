import { saveLoginSession } from "@/auth";
import { CustomButton } from "@/components/ui/button";
import useAuth from "@/hooks/use-auth";
import { axiosInstance } from "@/services/fetch";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import useSWRMutation from "swr/mutation";
import { Toast } from "toastify-react-native";

export default function LoginScreen() {

    const roles = [
        { value: "owner", id: "31", name: "Chủ căn hộ" },
        { value: "resident", id: "32", name: "Cư dân" },
    ]

    const [role, setRole] = useState("31");
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { update } = useAuth()
    const router = useRouter()

    const poster = async (path: string, { arg }: { arg: object }) => axiosInstance.post(path, arg)
        .then(res => {
            return res.data
        }).catch(error => {
            if (error?.response?.data?.message) {
                const message = error.response.data.message

                Toast.error(message)
            } else Toast.error("Đăng nhập thất bại!")
        })

    const { trigger, isMutating } = useSWRMutation("/auth/login", poster)

    const handleLogin = async () => {
        const login = await trigger({
            username,
            password,
            role
        })
        if (login?.access_token) {
            const save = await saveLoginSession(login)
            if (save) {
                await update()
                setPassword("")
                setUsername("")
                Toast.success("Đăng nhập thành công")
                router.push("/profile")
            } else Toast.error("Đăng nhập thất bại!")
        }
    };

    return (
        <View className="flex-1 justify-center px-6 py-8">
            <Text className="text-2xl font-bold mb-6">Đăng nhập</Text>
            <View className="flex-row items-center justify-between">
                <Text className="text-xl text-gray-600">Bạn là:</Text>
                {roles.map((item) => (
                    <Pressable
                        key={item.id}
                        onPress={() => setRole(item.id)}
                        className="flex-row items-center gap-1"
                    >
                        <View
                            className={`w-6 h-6 rounded-full border-2 items-center justify-center bg-white
        ${role === item.id ? 'border-blue-500 shadow-md shadow-blue-500' : 'border-gray-400 shadow-gray-400 shadow-sm'}`}
                        >
                            {role === item.id && (
                                <View className="w-3 h-3 rounded-full bg-blue-500 shadow-sm" />
                            )}
                        </View>
                        <Text className="text-xl text-gray-800">{item.name}</Text>
                    </Pressable>
                ))}
            </View>
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
                disabled={isMutating}
                onPress={handleLogin}
                type="primary"
                className="mt-6 w-full"
                size="lg"
            >
                Đăng Nhập
            </CustomButton>
            <View className="w-full flex items-end py-2">
                <Text className="underline">
                    Không thể đăng nhập
                </Text>
            </View>
        </View>
    );
}
