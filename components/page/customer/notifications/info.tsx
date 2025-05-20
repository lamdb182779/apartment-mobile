import { fetcher } from '@/services/fetch';
import React from 'react';
import { ActivityIndicator, Dimensions, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import useSWR from 'swr';

export default function Info({ id }: { id: string }) {
    const { data, isLoading } = useSWR(`/notifications/${id}`, fetcher)
    const { height } = Dimensions.get('window')
    return (
        <>
            {isLoading ?
                <ActivityIndicator size="large" color="#facc15" />
                :
                <>
                    {data ?
                        <View className="flex-1 px-4 py-6">
                            <View className="mb-4">
                                <Text className="text-xl font-bold text-black">{data.title}</Text>
                                <Text className="text-sm text-gray-600">
                                    Ngày tạo: {new Date(data.createdAt).toLocaleString("vi-VN")}
                                </Text>
                                <Text className=''>
                                    {data.describe}
                                </Text>
                            </View>

                            <WebView
                                source={{ uri: `http://192.168.1.4:3000/mobile/noti/${id}` }}
                                scrollEnabled
                            />

                        </View>
                        :
                        <>Không có dữ liệu</>
                    }
                </>
            }
        </>
    )
}