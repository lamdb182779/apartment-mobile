import Notification from "@/components/page/customer/notifications/notification";
import { fetcher, updater } from "@/services/fetch";
import { usePathname } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text } from "react-native";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export default function NotificationScreen() {
    const [page, setPage] = useState(1)
    const { data, isLoading, mutate } = useSWR(`/notifications/self?current=${page}`, fetcher)
    const { trigger, isMutating } = useSWRMutation("/notifications/readedall", updater)
    const handleReadAll = async () => {
        if (!isMutating) {
            const update = await trigger({})
            if (update) mutate()
        }
    }
    const path = usePathname()
    useEffect(() => {
        mutate()
    }, [path])
    return (
        <>
            {isLoading ?
                <ActivityIndicator size="large" color="#facc15" />
                :
                <>
                    {data?.results?.length > 0 ?
                        <ScrollView className="flex-1 bg-yellow-50 px-4 py-2">
                            <Pressable onPress={() => handleReadAll()} disabled={isMutating} className="mb-4">
                                <Text className="text-right text-lg underline">
                                    Đánh dấu tất cả là đã đọc
                                </Text>
                            </Pressable>
                            {page > 1 &&
                                <Pressable disabled={isLoading} onPress={() => setPage(pre => pre - 1)} className="mb-2">
                                    <Text className="text-center text-neutral-700 text-xs font-semibold">
                                        Tải lại thông báo phía trên
                                    </Text>
                                </Pressable>
                            }
                            {data?.results?.map((noti: any) => (
                                <Notification noti={noti} key={noti.id} mutate={mutate} />
                            ))}
                            {page < (data?.totalPages || 0) &&
                                <Pressable disabled={isLoading} onPress={() => setPage(pre => pre + 1)}>
                                    <Text className="text-center text-neutral-700 text-xs font-semibold">
                                        Tải thêm các thông báo bên dưới
                                    </Text>
                                </Pressable>
                            }
                        </ScrollView>
                        :
                        <>Không có dữ liệu</>
                    }
                </>
            }
        </>
    );
}