
import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
export default function Apartment({ apt }: { apt: any }) {
    const UNKNOWN_APARTMENT = process.env.EXPO_PUBLIC_UNKNOWN_APARTMENT
    const router = useRouter()
    const handleInfo = () => {
        router.push({
            pathname: "/owner/apartments/[number]",
            params: { number: apt.number }
        })
    }
    return (
        <Pressable onPress={() => handleInfo()} className="bg-white rounded-2xl overflow-hidden shadow-md mb-4">
            <Image
                source={{ uri: apt.image || UNKNOWN_APARTMENT }}
                className="w-full h-48 object-cover"
                resizeMode="cover"
            />
            <View className="p-4 space-y-2">
                <Text className="text-base font-bold">Căn hộ {apt?.number}</Text>
                <View className="flex flex-row flex-wrap gap-2">
                    {apt?.residents?.length > 0 ? (
                        <Text className="text-xs border rounded-sm px-1 py-0.5 text-green-500 border-green-500">
                            Có {apt.residents.length} cư dân
                        </Text>
                    ) : (
                        <Text className="text-xs border rounded-sm px-1 py-0.5 text-neutral-500 border-neutral-500">
                            Không có cư dân
                        </Text>
                    )}

                    {apt?.tenantLooking ? (
                        <Text className="text-xs border rounded-sm px-1 py-0.5 text-yellow-500 border-yellow-500">
                            Đang tìm người thuê
                        </Text>
                    ) : (
                        <Text className="text-xs border rounded-sm px-1 py-0.5 text-neutral-500 border-neutral-500">
                            Không tìm người thuê
                        </Text>
                    )}

                    {apt?.maintaining && (
                        <Text className="text-xs border rounded-sm px-1 py-0.5 text-red-500 border-red-500">
                            Đang sửa chữa
                        </Text>
                    )}
                </View>
            </View>
        </Pressable>
    )
}