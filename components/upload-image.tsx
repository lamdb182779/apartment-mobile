import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import useSWRMutation from 'swr/mutation';
import { Toast } from 'toastify-react-native';

export default function ImageUpload({
    setImageUrl,
    children,
    preset
}: {
    setImageUrl: (url: string) => void;
    children: React.ReactNode;
    preset: "apt" | "room" | "ava" | "cmt"
}) {
    const [uploading, setUploading] = useState(false);

    const poster = async (path: string, { arg }: { arg: object }) => axios.post(path, arg, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then(res => {
            return res.data
        }).catch(error => {
            console.log(error)
            Toast.error(error?.response?.data?.message || "Thêm mới thất bại")
        })

    const CLOUDINARY_CLOUD_NAME = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const UPLOAD_PRESET_APT = process.env.EXPO_PUBLIC_UPLOAD_PRESET_APT
    const UPLOAD_PRESET_ROOM = process.env.EXPO_PUBLIC_UPLOAD_PRESET_ROOM
    const UPLOAD_PRESET_AVA = process.env.EXPO_PUBLIC_UPLOAD_PRESET_AVA
    const UPLOAD_PRESET_CMT = process.env.EXPO_PUBLIC_UPLOAD_PRESET_CMT

    const uploadPreset = {
        apt: UPLOAD_PRESET_APT,
        room: UPLOAD_PRESET_ROOM,
        ava: UPLOAD_PRESET_AVA,
        cmt: UPLOAD_PRESET_CMT
    }

    const { trigger } = useSWRMutation(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        poster
    );

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) return;



        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            quality: 0.7,
            allowsEditing: true,
        });

        if (!result.canceled) {
            uploadImage(result.assets[0].uri);
        }
    };

    const uploadImage = async (uri: string) => {
        setUploading(true);
        const formData = new FormData();
        formData.append('file', {
            uri,
            type: 'image/jpeg',
            name: 'upload.jpg',
        } as any);
        formData.append('upload_preset', uploadPreset[preset] as string);

        try {
            const upload = await trigger(formData);
            if (upload?.secure_url) setImageUrl(upload.secure_url);
        } catch (e) {
            console.error("Upload failed", e);
        } finally {
            setUploading(false);
        }
    };

    return (
        <Pressable className='relative' disabled={uploading} onPress={pickImage}>
            {uploading &&
                <View className='absolute w-full h-full flex justify-center items-center bg-black/50'>
                    <ActivityIndicator size="large" color="#facc15" />
                </View>
            }
            {children}
        </Pressable>
    );
}