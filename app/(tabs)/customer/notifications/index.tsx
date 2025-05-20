import Notification from "@/components/page/customer/notifications/notification";
import { fetcher, updater } from "@/services/fetch";
import { useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text } from "react-native";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const notifications = [
    {
        title: "Thông báo cắt điện tháng 5",
        date: "02/05/2025",
    },
    {
        title: "Thông báo cắt điện tháng 5",
        date: "02/05/2025",
    },
    {
        title: "Thông báo cắt điện tháng 12",
        date: "02/05/2025",
    },
    {
        title: "Thông báo nghỉ lễ 30/4 - 1/5",
        description:
            "Ban quản lý chung cư xin trân trọng thông báo lịch nghỉ lễ 30/4 - 1/5 như dưới đây",
        date: "02/05/2025",
    },
];

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

                            {data?.results?.map((noti: any) => (
                                <Notification noti={noti} key={noti.id} mutate={mutate} />
                            ))}
                        </ScrollView>
                        :
                        <>Không có dữ liệu</>
                    }
                </>
            }
        </>
    );
}