import { CustomButton } from '@/components/ui/button';
import { updater } from '@/services/fetch';
import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import useSWRMutation from 'swr/mutation';
import { Toast } from 'toastify-react-native';

export default function ChangePw() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { trigger, isMutating } = useSWRMutation("/auth/changePw", updater)
    const handleChange = async () => {
        if (newPassword !== confirmPassword) {
            Toast.error("Mật khẩu mới và mật khẩu xác nhận không khớp!")
        } else {
            const update = await trigger({
                currentPassword,
                newPassword
            })
            if (update) {
                setConfirmPassword("")
                setCurrentPassword("")
                setNewPassword("")
            }
        }

    }

    return (
        <View className="bg-white p-4 rounded-lg shadow-md mb-6">
            <Text className="text-base font-semibold mb-4">Đổi mật khẩu</Text>

            <Text className="text-sm text-gray-700 mb-1">Mật khẩu hiện tại</Text>
            <TextInput
                secureTextEntry
                placeholder="Nhập mật khẩu hiện tại"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                className="border border-gray-300 rounded-md p-2 bg-white mb-3"
            />

            <Text className="text-sm text-gray-700 mb-1">Mật khẩu mới</Text>
            <TextInput
                secureTextEntry
                placeholder="Nhập mật khẩu mới"
                value={newPassword}
                onChangeText={setNewPassword}
                className="border border-gray-300 rounded-md p-2 bg-white mb-3"
            />

            <Text className="text-sm text-gray-700 mb-1">Xác nhận mật khẩu mới</Text>
            <TextInput
                secureTextEntry
                placeholder="Xác nhận lại"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                className="border border-gray-300 rounded-md p-2 bg-white mb-4"
            />
            <CustomButton
                onPress={handleChange}
                disabled={isMutating}
            >
                Đổi mật khẩu
            </CustomButton>
        </View>
    )
}