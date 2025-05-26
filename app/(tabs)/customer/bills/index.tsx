import { fetcher } from "@/services/fetch";
import { Picker } from '@react-native-picker/picker';
import { usePathname, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import useSWR from "swr";

export default function BillsScreen() {
    const [selectedApartment, setSelectedApartment] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");

    const router = useRouter();

    const { data, isLoading, mutate } = useSWR("/bills/self", fetcher);
    const path = usePathname()
    useEffect(() => {
        mutate()
    }, [path])

    const isExpired = (expiredDate: string) => new Date(expiredDate) < new Date();

    const filteredData = useMemo(() => {
        return data
            ?.filter(
                (apt: any) => selectedApartment === "all" || String(apt.number) === selectedApartment
            )
            .map((apt: any) => ({
                ...apt,
                bills:
                    statusFilter === "all"
                        ? apt.bills
                        : apt.bills.filter((bill: any) => bill.isPaid === (statusFilter === "paid")),
            }))
            ?.sort((a: any, b: any) => a.number - b.number);
    }, [data, selectedApartment, statusFilter]);

    const handleInfo = (id: any) => {
        router.push({
            pathname: "/customer/bills/[id]",
            params: { id }
        })
    }

    if (isLoading) return <ActivityIndicator size="large" color="#facc15" />;

    return (
        <ScrollView className="px-4 py-6 bg-white min-h-screen">
            <Text className="text-lg font-bold text-center mb-4">Danh sách hóa đơn</Text>

            <View className="flex flex-col gap-4 mb-6">
                <Picker
                    className="shadow"
                    selectedValue={selectedApartment}
                    onValueChange={(itemValue) =>
                        setSelectedApartment(itemValue)
                    }>
                    <Picker.Item label={"Tất cả căn hộ"} value={"all"} />
                    {data?.map((apt: any) => (
                        <Picker.Item label={`Căn hộ ${apt.number}`} key={apt.number} value={String(apt.number)} />
                    ))}
                </Picker>
                <Picker
                    selectedValue={statusFilter}
                    onValueChange={(itemValue) =>
                        setStatusFilter(itemValue)
                    }>
                    <Picker.Item label="Tất cả" value="all" />
                    <Picker.Item label="Đã thanh toán" value="paid" />
                    <Picker.Item label="Chưa thanh toán" value="unpaid" />
                </Picker>

            </View>

            {filteredData?.length > 0 ? (
                filteredData.map((apartment: any) => (
                    <View key={apartment.number} className="mb-6 border rounded-lg p-4">
                        <Text className="text-base font-semibold mb-2">Căn hộ {apartment.number}</Text>

                        {apartment.bills.length > 0 ? (
                            apartment.bills.map((bill: any) => (
                                <Pressable
                                    key={bill.id}
                                    onPress={() => handleInfo(bill.id)}
                                    className="border border-gray-200 p-3 rounded-md mb-2 bg-gray-50"
                                >
                                    <Text className="font-medium">{bill.title}</Text>
                                    {bill.isPaid ? (
                                        <Text className="text-green-600 font-bold text-sm">Đã thanh toán</Text>
                                    ) : isExpired(bill.expired) ? (
                                        <Text className="text-red-600 font-bold text-sm">Đã quá hạn</Text>
                                    ) : (
                                        <Text className="text-orange-600 font-bold text-sm">Chưa thanh toán</Text>
                                    )}
                                    <Text className="text-sm">
                                        Số tiền: {Number(bill.amount).toLocaleString("vi-VN")} VNĐ
                                    </Text>
                                    <Text className="text-sm">
                                        Hạn: {new Date(bill.expired).toLocaleDateString("vi-VN")}
                                    </Text>
                                </Pressable>
                            ))
                        ) : (
                            <Text className="italic text-gray-500">Không có hóa đơn</Text>
                        )}
                    </View>
                ))
            ) : (
                <Text className="text-center text-gray-500">Không có hóa đơn</Text>
            )}
        </ScrollView>
    );
}
