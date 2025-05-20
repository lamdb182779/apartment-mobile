
import ChangePw from '@/components/page/profile/change-password';
import ChangeUn from '@/components/page/profile/change-username';
import { CustomButton } from '@/components/ui/button';
import ImageUpload from '@/components/upload-image';
import useAuth from '@/hooks/use-auth';
import { fetcher, updater } from '@/services/fetch';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

export default function ProfileInfoScreen() {
    const UNKNOWN_IMAGE = process.env.EXPO_PUBLIC_UNKNOWN_IMAGE
    const { logout } = useAuth()
    const handleLogout = async () => {
        await logout()
    }
    const { data, isLoading } = useSWR("/profile", fetcher)
    const { trigger } = useSWRMutation("/avatar", updater)
    const [image, setImage] = useState(UNKNOWN_IMAGE)
    const [first, setFirst] = useState(true)
    useEffect(() => {
        setImage(data?.image || UNKNOWN_IMAGE)
    }, [data])
    const handleUpload = async () => {
        const update = await trigger({ image })
    }

    useEffect(() => {
        if (first) setFirst(false)
        else if (image && image !== data?.image && !isLoading) {
            handleUpload()
        }
    }, [image])

    return (
        <KeyboardAwareScrollView
            className="flex-1 px-4 py-6"
            enableOnAndroid={true}
            extraScrollHeight={100}
            keyboardShouldPersistTaps="handled"
        >
            {isLoading ?
                <ActivityIndicator size="large" color="#facc15" />
                :

                <View className='flex gap-3'>
                    < View className="bg-white p-4 rounded-lg shadow-md">
                        <View className="flex-row items-center gap-3">
                            <ImageUpload
                                setImageUrl={setImage}
                                preset='ava'
                            >
                                <Image
                                    source={{ uri: image || UNKNOWN_IMAGE || "" }}
                                    className='h-20 w-20 rounded-full'
                                    resizeMode="cover"
                                />
                            </ImageUpload>
                            <View className="flex-1">
                                <Text className="text-lg font-semibold">{data.name}</Text>
                                <Text className="text-sm text-gray-700 mt-1">📧 {data.email}</Text>
                                <Text className="text-sm text-gray-700">📞 {data.phone || "N/A"}</Text>
                                <Text className="text-sm text-gray-700">🔒 Quyền hạn: {data.role === 31 && "Chủ căn hộ"} {data.phone === 32 && "Cư dân"}</Text>
                            </View>
                        </View>
                        <CustomButton
                            onPress={handleLogout}
                            type={"danger"}
                            className='mt-3'
                        >
                            Đăng xuất
                        </CustomButton>
                    </View>

                    {/* Đổi tên tài khoản */}
                    <ChangeUn />

                    {/* Đổi mật khẩu */}
                    <ChangePw />
                </View>
            }
        </KeyboardAwareScrollView>
    );
}
