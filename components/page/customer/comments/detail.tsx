import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { Image, Modal, Pressable, ScrollView, Text, View } from "react-native";

export default function DetailModal({ comment, visible = false, setVisible }: { comment: any, visible: boolean, setVisible: (boolean: boolean) => void }) {
    return (
        <Modal transparent
            animationType="fade"
            visible={visible}
            onRequestClose={() => setVisible(false)}
        >
            <View className="flex-1 justify-center items-center bg-black/40 p-4">
                <View className="bg-white rounded-lg p-4 max-w-full w-full max-h-[90%]">
                    <ScrollView>
                        <Text className="font-bold mb-2 text-lg">Chi tiết đánh giá, góp ý</Text>
                        <Text className="font-semibold">Tiêu đề: <Text className="font-normal">{comment.title}</Text></Text>
                        <Text className="font-semibold mt-2">Nội dung: <Text className="font-normal">{comment.description}</Text></Text>
                        <Text className="font-semibold mt-2">Ngày tạo: <Text className="font-normal"> {new Date(comment.createdAt).toLocaleString()}</Text></Text>
                        {comment?.image && <Image
                            source={{ uri: comment.image }}
                            className="w-full aspect-[16/9] mt-4 rounded"
                            resizeMode="cover"
                        />}

                        {comment?.replies?.length > 0 &&
                            <View className="space-y-1">
                                {comment?.replies?.map((reply: any) =>
                                    <View key={reply.id} className="flex-row gap-3 mt-4">
                                        <View className="aspect-square h-12 rounded-full border border-neutral-400 items-center justify-center">
                                            <FontAwesome size={20} name="comment-o" />
                                        </View>

                                        <View className="flex-1 border border-neutral-400 rounded-md p-3">
                                            <Text className="text-sm whitespace-pre-line">
                                                {reply.content}
                                            </Text>
                                        </View>
                                    </View>)}
                            </View>
                        }

                        <Pressable
                            onPress={() => setVisible(false)}
                            className="mt-2 py-2 rounded items-center"
                        >
                            <Text className="text-gray-600">Đóng</Text>
                        </Pressable>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}
