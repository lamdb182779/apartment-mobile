import { CustomButton } from "@/components/ui/button";
import ImageUpload from "@/components/upload-image";
import { poster } from "@/services/fetch";
import { useState } from "react";
import { Image, Modal, Pressable, Text, TextInput, View } from "react-native";
import useSWRMutation from "swr/mutation";

export default function NewModal({ visible = false, setVisible, mutate }: { visible: boolean, mutate: () => void, setVisible: (boolean: boolean) => void }) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")

    const { trigger, isMutating } = useSWRMutation("/comments", poster)

    const handleAdd = async () => {
        const post = await trigger({ title, description, image })
        if (post) {
            setTitle("")
            setDescription("")
            setImage("")
            mutate()
            setVisible(false)
        }
    }
    return (
        <Modal transparent
            animationType="fade"
            visible={visible}
            onRequestClose={() => setVisible(false)}
        >
            <View className="flex-1 justify-center items-center bg-black/40">
                <View className="bg-white w-full rounded-xl p-5">
                    <Text className="text-lg font-bold mb-4">Nhập thông tin</Text>
                    <ImageUpload
                        setImageUrl={setImage}
                        preset="cmt">
                        {image ?
                            <View className="w-full py-3 bg-neutral-400 rounded-md">
                                <Text className="text-white font-semibold text-center">Sửa ảnh</Text>
                            </View>
                            :
                            <View className="w-full py-3 bg-blue-500 rounded-md">
                                <Text className="text-white font-semibold text-center">Thêm ảnh</Text>
                            </View>
                        }
                    </ImageUpload>
                    {image && <Image
                        source={{ uri: image }}
                        className="w-full aspect-[16/9] mt-4 rounded"
                        resizeMode="cover"
                    />}

                    <TextInput
                        placeholder="Tiêu đề"
                        value={title}
                        onChangeText={setTitle}
                        className="border px-3 py-2 rounded-md my-3"
                    />

                    <TextInput
                        placeholder="Nội dung"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        className="border px-3 py-2 rounded-md min-h-24 text-left mb-4"
                    />

                    <CustomButton
                        disabled={isMutating}
                        onPress={() => handleAdd()}
                        type="success"
                    >
                        Xác nhận
                    </CustomButton>
                    <Pressable
                        onPress={() => setVisible(false)}
                        className="mt-2 py-2 rounded items-center"
                    >
                        <Text className="text-gray-600">Đóng</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}
