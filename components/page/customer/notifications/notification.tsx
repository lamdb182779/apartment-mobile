import { updater } from "@/services/fetch";
import { format } from "date-fns";
import { useRouter } from "expo-router";
import { Pressable, Text } from "react-native";
import useSWRMutation from "swr/mutation";

export default function Notification({ noti, mutate }: { noti: any, mutate: () => void }) {
    const router = useRouter()
    const { trigger, isMutating } = useSWRMutation("/notifications/readed", updater)

    const handleRead = async () => {
        if (!isMutating && !noti.isRead) {
            const update = await trigger({
                id: noti.id
            })
            if (update) {
                mutate()
            }
        }
        router.push({
            pathname: "/customer/notifications/[id]",
            params: { id: noti.id }
        })
    }
    return (
        <Pressable disabled={isMutating} onPress={() => handleRead()} className={`mb-2 flex gap-1 bg-white px-2 py-3 rounded-lg shadow-md`}>
            <Text className={`font-semibold text-lg ${noti.isRead && "opacity-50"}`}>{noti.title}</Text>
            <Text className={`${noti.isRead && "opacity-50"}`}>{noti.describe}</Text>
            <Text className={`italic text-neutral-700 ${noti.isRead && "opacity-50"}`}>{format(noti.createdAt, "dd/MM/yyyy")}</Text>
        </Pressable>
    )
}