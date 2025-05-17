import { CustomButton } from '@/components/ui/button';
import { updater } from '@/services/fetch';
import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import useSWRMutation from 'swr/mutation';
import { Toast } from 'toastify-react-native';

export default function ChangeUn() {
    const [username, setUsername] = useState('');
    const { trigger, isMutating } = useSWRMutation("/auth/changeUn", updater)
    const handleChange = async () => {
        if (username) {
            const post = await trigger({ newUsername: username })
            if (post) setUsername("")
        } else Toast.error("Không được để tên tài khoản trống!")
    }
    return (
        <View className="bg-white p-4 rounded-lg shadow-md">
            <Text className="text-base font-semibold mb-2">Đổi tên tài khoản</Text>
            <Text className="text-sm text-gray-700 mb-1">Tên tài khoản mới</Text>
            <TextInput
                placeholder="Nhập tên mới"
                value={username}
                onChangeText={setUsername}
                className="border border-gray-300 rounded-md p-2 bg-white mb-4"
            />
            <CustomButton
                onPress={handleChange}
                disabled={isMutating}
                type='success' >
                Cập nhật
            </CustomButton>
        </View>
    )
}