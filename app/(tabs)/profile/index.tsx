import { CustomButton } from '@/components/ui/button';
import useAuth from '@/hooks/use-auth';
import { fetcher } from '@/services/fetch';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from 'react-native';
import useSWR from 'swr';

export default function ProfileScreen() {
    const UNKNOWN_IMAGE = process.env.EXPO_PUBLIC_UNKNOWN_IMAGE
    const router = useRouter();

    const { data, isLoading } = useSWR("/profile", fetcher)

    const menuItems = [
        { icon: '🏠', label: 'Căn hộ của tôi', path: '/apartment' },
        { icon: '📝', label: 'Ý kiến đánh giá', path: '/feedback' },
        { icon: '🧰', label: 'Dịch vụ', path: '/services' },
        { icon: '💰', label: 'Hóa đơn', path: '/bills' },
        { icon: '🔔', label: 'Thông báo', path: '/notifications' },
    ];

    const { logout } = useAuth()

    return (
        <View className='flex-1 pb-4'>
            <ScrollView className="flex-1">

                {isLoading ?
                    <ActivityIndicator size="large" color="#facc15" />
                    :
                    <View className='p-5'>
                        <View className="flex-row items-center p-6 rounded-xl bg-gray-200">
                            <Image
                                source={{ uri: data?.image || UNKNOWN_IMAGE }}
                                className="w-16 h-16 rounded-full mr-4"
                            />
                            <View>
                                <Text className="text-lg text-gray-500">Xin chào</Text>
                                <Text className="text-xl font-semibold">{data?.name}</Text>
                            </View>
                            <View className='grow flex items-end'>
                                <Pressable className='w-12 h-12 flex justify-center items-center bg-gray-400 rounded-full'
                                    onPress={() => router.push("/profile/info")}>
                                    <FontAwesome name="pencil" size={24} color="#fff" />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                }

                <Text className="text-xl font-bold px-4 pt-4 pb-2">Menu</Text>
                <View className="px-4">
                    {menuItems.map((item, idx) => (
                        <Pressable
                            key={idx}
                            // onPress={() => router.push(item.path as any)}
                            className="flex-row items-center py-4 border-b border-gray-200"
                        >
                            <Text className="text-2xl mr-3">{item.icon}</Text>
                            <Text className="text-base font-medium">{item.label}</Text>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>

            <View className='px-3'>
                <CustomButton size='lg' type='danger' onPress={logout}>Đăng xuất</CustomButton>
            </View>
        </View>
    );
}
