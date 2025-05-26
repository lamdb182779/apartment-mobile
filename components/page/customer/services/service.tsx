import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { Text, View } from "react-native"

export default function ServiceItem({ service }: { service: any }) {
    const getStatusStyle = (status: string) => {
        switch (status) {
            case "Chờ xác nhận":
                return "bg-yellow-100 text-yellow-500"
            case "Chấp thuận":
                return "bg-green-100 text-green-500"
            case "Đã hủy":
            case "Từ chối":
                return "bg-red-100 text-red-500"
            default:
                return "bg-gray-100 text-gray-500"
        }
    }

    return (
        <View className="border rounded p-3 mb-2 bg-white">
            <View className="flex-row justify-between items-center mb-1">
                <Text className="font-semibold text-slate-700">
                    Căn hộ {service?.apartment} - {service?.type}
                </Text>
                <Text className={`text-xs px-2 py-1 rounded ${getStatusStyle(service?.status)}`}>
                    {service?.status}
                </Text>
            </View>
            <Text className="text-xs text-slate-500">
                {format(new Date(service?.startDate), "dd/MM/yyyy", { locale: vi })} - {format(new Date(service?.endDate), "dd/MM/yyyy", { locale: vi })}
            </Text>
        </View>
    )
}
