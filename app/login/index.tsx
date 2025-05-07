import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { CustomButton } from "../../components/ui/button";
import { CustomSelect } from "../../components/ui/select";

const roles = [
    { value: "regent", id: "11", name: "Thành viên ban quản trị" },
    { value: "director", id: "12", name: "Trưởng ban quản lý" },
    { value: "receptionist", id: "21", name: "Lễ tân" },
    { value: "technician", id: "23", name: "Kỹ thuật viên" },
    { value: "accountant", id: "22", name: "Kế toán" },
    { value: "owner", id: "31", name: "Chủ căn hộ" },
    { value: "resident", id: "32", name: "Cư dân" },
];

export default function LoginScreen() {
    const [role, setRole] = useState("owner");
    const usernameRef = useRef("");
    const passwordRef = useRef("");
    const navigation = useNavigation();

    const handleLogin = async () => {
        const username = usernameRef.current;
        const password = passwordRef.current;
        const roleId = roles.find((item) => item.value === role)?.id || "31";
        // const user = await authenticate(username, password, roleId);

        // if (user?.error) {
        //     if (user.error === "Tài khoản này chưa được xác thực!") {
        //         // navigation.navigate("Verify", { id: username, roleId });
        //     } else {
        //         alert(user.error);
        //     }
        // } else {
        //     alert("Đăng nhập thành công!");
        //     // Chuyển trang khác
        // }
    };

    return (
        <View className="flex-1 justify-center px-6 py-8">
            <Text className="text-2xl font-bold mb-6">Đăng nhập</Text>
            <Text className="text-sm text-gray-600">Vai trò</Text>
            <CustomSelect
                options={roles}
                selected={role}
                onSelect={(item) => setRole(item)}
                keyExtractor={(item) => item.id}
                renderButton={(open, selected) => (
                    <Pressable
                        onPress={open}
                        className="border p-4 rounded-md bg-white shadow-md"
                    >
                        <Text className="text-lg text-gray-700">
                            {selected ? selected.name : "Chọn vai trò"}
                        </Text>
                    </Pressable>
                )}
            />
            <Text className="text-sm text-gray-600 mt-4">Tên đăng nhập</Text>
            <TextInput
                style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
                className="mt-2 w-full"
                onChangeText={(text) => (usernameRef.current = text)}
                placeholder="Nhập tên đăng nhập"
            />
            <Text className="text-sm text-gray-600 mt-4">Mật khẩu</Text>
            <TextInput
                style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
                className="mt-2 w-full"
                secureTextEntry
                onChangeText={(text) => (passwordRef.current = text)}
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
