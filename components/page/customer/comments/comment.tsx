import { deleter } from '@/services/fetch'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import React from 'react'
import { Alert, Pressable, Text, View } from 'react-native'
import useSWRMutation from 'swr/mutation'

export default function CommentItem({ comment, mutate }: { comment: any, mutate: () => void }) {
    const { trigger, isMutating } = useSWRMutation(`/comments/${comment.id}`, deleter)

    const handleDel = async () => {
        const del = await trigger({})
        if (del) mutate()
    }

    const handleConfirm = (e: any) => {
        e.stopPropagation()
        Alert.alert(
            "Xác nhận hành động",
            "Bạn có chắc chắn muốn xóa đánh giá này không?",
            [
                { text: "Hủy", style: "cancel" },
                { text: "Xác nhận", onPress: () => handleDel() }
            ],
            { cancelable: true }
        )
    }
    return (
        <View className="flex-row items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 mb-3 shadow-sm">
            <View className="flex-row items-center gap-2">
                <FontAwesome name="comment-o" size={20} color="black" />
                <Text className="text-base">{comment.title}</Text>
            </View>
            <Pressable onPress={(e) => handleConfirm(e)} className="bg-red-500 w-8 h-8 flex items-center justify-center rounded-full">
                <FontAwesome name="close" size={16} color="white" />
            </Pressable>
        </View>
    )
}


