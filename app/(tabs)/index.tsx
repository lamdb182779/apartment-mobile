import useAuth from "@/hooks/use-auth";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function HomeScreen() {
    const router = useRouter();
    const { user } = useAuth()

    const features = [
        {
            emoji: "📋",
            title: "Quản lý yêu cầu dịch vụ",
            desc: "Cư dân gửi yêu cầu dịch vụ nhanh chóng và dễ dàng.",
            path: "/customer/services"
        },
        {
            emoji: "💵",
            title: "Theo dõi hóa đơn & thanh toán",
            desc: "Hiển thị hóa đơn điện, nước, phí dịch vụ rõ ràng và minh bạch.",
            path: "/customer/bills"
        },
        {
            emoji: "📣",
            title: "Thông báo tức thì",
            desc: "Cập nhật thông báo từ ban quản lý ngay trên ứng dụng.",
            path: "/customer/notifications"
        },
        {
            emoji: "🔐",
            title: "Bảo mật và cá nhân hóa",
            desc: "Mỗi cư dân có tài khoản riêng, bảo mật thông tin tối đa.",
            path: "/profile"
        },
    ];

    return (
        <ScrollView className="flex-1 border-t border-white">
            {/* Banner đầu trang */}
            <View className="bg-[#1e293b] px-6 py-12 items-center">
                <Text className="text-white text-3xl font-bold mb-4 text-center">
                    Hệ Thống Quản Lý Chung Cư Thông Minh
                </Text>
                <Text className="text-white text-base text-center mb-6">
                    Nâng cao trải nghiệm cư dân và tối ưu hóa vận hành quản lý
                </Text>
                {!user &&
                    <Pressable
                        className="bg-white px-6 py-3 rounded-full"
                        onPress={() => router.push("/login")}
                    >
                        <Text className="text-blue-600 font-bold text-base">Bắt đầu ngay</Text>
                    </Pressable>
                }
            </View>

            {/* Các tính năng */}
            <View className="px-6 py-8 gap-6">
                <Text className="text-xl font-bold text-gray-800 text-center mb-2">
                    Tính năng nổi bật
                </Text>

                {features.map((item, i) => (
                    <Pressable onPress={() => router.push((!!user ? item.path : "/login") as any)} key={i} className="bg-gray-100 p-4 rounded-xl shadow-sm">
                        <Text className="text-2xl mb-2">{item.emoji}</Text>
                        <Text className="text-lg font-semibold text-gray-800 mb-1">{item.title}</Text>
                        <Text className="text-sm text-gray-600">{item.desc}</Text>
                    </Pressable>
                ))}
            </View>
            {!user &&
                <View className="px-6 py-10 items-center bg-blue-50">
                    <Text className="text-lg font-semibold text-gray-700 mb-2">Bạn đã có tài khoản?</Text>
                    <Text className="text-sm text-gray-600 mb-4 text-center">
                        Đăng nhập để bắt đầu sử dụng hệ thống quản lý thông minh của chúng tôi.
                    </Text>
                    <Pressable
                        className="bg-blue-600 px-6 py-3 rounded-full"
                        onPress={() => router.push("/login")}
                    >
                        <Text className="text-white font-bold text-base">Đăng nhập</Text>
                    </Pressable>
                </View>
            }
        </ScrollView>
    );
}
