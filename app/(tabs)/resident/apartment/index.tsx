import { axiosInstance, fetcher } from "@/services/fetch"
import { usePathname, useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { ActivityIndicator, Dimensions, FlatList, Image, ScrollView, Text, View } from "react-native"
import { LineChart } from "react-native-chart-kit"
import useSWR from "swr"

export default function ApartmentScreen() {
    const UNKNOWN_APARTMENT = process.env.EXPO_PUBLIC_UNKNOWN_APARTMENT
    const router = useRouter()
    const path = usePathname()
    useEffect(() => {
        if (path.startsWith("/resident/apartment")) mutate()
    }, [path])

    const { data, isLoading, mutate } = useSWR("/residents/apartment-info", fetcher)

    const [tenantLooking, setTenantLooking] = useState(data?.tenantLooking ?? false)

    if (!data) return <Text className="text-center mt-10">Không có dữ liệu</Text>

    const combinedData = data.parameters.electric.map((e: any) => ({
        label: e.month,
        electric: e.value,
        water: data.parameters.water.find((w: any) => w.month === e.month)?.value ?? 0,
    })).sort((a: any, b: any) => (new Date(a.label).getTime() - new Date(b.label).getTime()))

    const combinedDataDiff = combinedData.slice(1).map((item: any, index: number) => ({
        label: item.label,
        electric: item.electric - combinedData[index].electric,
        water: item.water - combinedData[index].water,
    }))

    const chartLabels = combinedDataDiff.map((item: any) => item.label.slice(0, 7))
    const electricData = combinedDataDiff.map((item: any) => item.electric)
    const waterData = combinedDataDiff.map((item: any) => item.water)

    const handleChange = async () => {
        try {
            await axiosInstance.patch(`/apartments/change-tenant-looking/${data.number}`)
            setTenantLooking((prev: any) => !prev)
        } catch (error) {
            console.error("Failed to update tenantLooking", error)
        }
    }

    return (
        <ScrollView className="p-4 space-y-4">
            {isLoading ?
                <ActivityIndicator size="large" color="#facc15" />
                :
                <>
                    <View className="flex gap-2">
                        <View className="flex flex-row flex-wrap items-center gap-2">
                            <Text className="text-xl font-bold">Căn hộ {data.number}</Text>
                            {data?.residents?.length > 0 ? (
                                <Text className="text-xs border rounded-sm px-1 py-0.5 text-green-500 border-green-500">
                                    Có {data.residents.length} cư dân
                                </Text>
                            ) : (
                                <Text className="text-xs border rounded-sm px-1 py-0.5 text-neutral-500 border-neutral-500">
                                    Không có cư dân
                                </Text>
                            )}

                            {tenantLooking ? (
                                <Text className="text-xs border rounded-sm px-1 py-0.5 text-yellow-500 border-yellow-500">
                                    Đang tìm người thuê
                                </Text>
                            ) : (
                                <Text className="text-xs border rounded-sm px-1 py-0.5 text-neutral-500 border-neutral-500">
                                    Không tìm người thuê
                                </Text>
                            )}

                            {data?.maintaining && (
                                <Text className="text-xs border rounded-sm px-1 py-0.5 text-red-500 border-red-500">
                                    Đang sửa chữa
                                </Text>
                            )}
                        </View>

                        <View className="flex flex-row gap-2 justify-between items-center">
                            <Text>Tầng {data.floor} - Trục {data.axis} - Diện tích {data.acreage} m²</Text>
                        </View>
                        <View className="flex flex-row justify-between items-center gap-2">
                            <View className="">
                                {data.residents?.length > 0 &&
                                    <Text>
                                        <Text className="font-semibold">Cư dân: </Text>
                                        {
                                            data.residents.map((r: any, i: number) => <Text key={i}>{r}{i === data.residents?.length - 1 ? "" : '\n'}</Text>)
                                        }
                                    </Text>
                                }
                            </View>
                            <Text>Cần thanh toán: {Number(data?.debt || 0).toLocaleString("vi")} đ</Text>
                        </View>

                        <View className="rounded-lg overflow-hidden">
                            <Image
                                source={{ uri: data.image || UNKNOWN_APARTMENT }}
                                className="w-full aspect-[16/9] object-cover"
                                resizeMode="cover"
                            />
                        </View>
                    </View>

                    <View>
                        <LineChart
                            data={{
                                labels: chartLabels,
                                datasets: [
                                    { data: electricData, color: () => "#FFD700" },
                                ],
                                legend: ["Điện"],
                            }}
                            width={Dimensions.get("window").width - 40}
                            height={220}
                            yAxisLabel=""
                            chartConfig={{
                                backgroundColor: "#fefdf5",
                                backgroundGradientFrom: "#fefdf5",
                                backgroundGradientTo: "#fefdf5",
                                decimalPlaces: 0,
                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            }}
                            style={{ borderRadius: 8 }}
                            bezier
                            fromZero
                        />
                        <LineChart
                            data={{
                                labels: chartLabels,
                                datasets: [
                                    { data: waterData, color: () => "#4FD1C5" },
                                ],
                                legend: ["Nước"],
                            }}
                            width={Dimensions.get("window").width - 40}
                            height={220}
                            yAxisLabel=""
                            chartConfig={{
                                backgroundColor: "#fefdf5",
                                backgroundGradientFrom: "#fefdf5",
                                backgroundGradientTo: "#fefdf5",
                                decimalPlaces: 0,
                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            }}
                            style={{ borderRadius: 8 }}
                            bezier
                            fromZero
                        />
                    </View>

                    <View className="mb-10">
                        <Text className="font-semibold">Danh sách phòng:</Text>
                        <FlatList
                            horizontal
                            data={data.rooms}
                            keyExtractor={(item) => item.id.toString()}
                            showsHorizontalScrollIndicator={false}
                            className="py-2"
                            renderItem={({ item }) => (
                                <View className="mr-3 w-40">
                                    <Image
                                        source={{ uri: item.image || UNKNOWN_APARTMENT }}
                                        className="w-full aspect-[16/9] object-cover"
                                        resizeMode="cover"
                                    />
                                    <Text className="text-center mt-1 text-sm">{item.name} ({item.acreage}m²)</Text>
                                </View>
                            )}
                        />
                    </View>
                </>
            }
        </ScrollView>
    )
}
