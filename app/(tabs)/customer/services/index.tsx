import DetailModal from "@/components/page/customer/services/detail"
import NewModal from "@/components/page/customer/services/new"
import ServiceItem from "@/components/page/customer/services/service"
import PaginationC from "@/components/pagination"
import { axiosInstance } from "@/services/fetch"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { usePathname } from "expo-router"
import { useEffect, useState } from "react"
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native"
import useSWR from "swr"

export default function ServicesScreen() {
    const fetcher = (path: string) => axiosInstance.get(path, {
        withCredentials: true
    })
        .then(res => res.data)
    const [page, setPage] = useState(1)
    const { data, isLoading, mutate } = useSWR(`/services/self?current=${page}&pageSize=10`, fetcher)
    const { data: owners } = useSWR("/owners/apartments", fetcher)
    const { data: samples } = useSWR("/samples/all", fetcher)
    const { data: resident } = useSWR("/residents/apartment", fetcher)
    const [detail, setDetail] = useState(false)
    const [nw, setNw] = useState(false)
    const [service, setService] = useState()

    const handleDetail = (service: any) => {
        setService(service)
        setDetail(true)
    }
    const path = usePathname()
    useEffect(() => {
        mutate()
    }, [path])

    return (
        <>
            {isLoading ?
                <ActivityIndicator size="large" color="#facc15" />
                :
                <ScrollView className="p-4 flex-1">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-lg font-bold">Danh sách yêu cầu dịch vụ</Text>
                        <Pressable onPress={() => setNw(true)} className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                            <FontAwesome size={12} name="plus" color={"white"} />
                        </Pressable>
                    </View>

                    {data?.results?.length > 0 ?
                        data.results.map((service: any) => (
                            <Pressable onPress={() => handleDetail(service)} key={service.id}>
                                <ServiceItem service={service} />
                            </Pressable>
                        )) :
                        <Text>Không có dữ liệu</Text>
                    }

                    <PaginationC handlePage={setPage} length={data?.totalPages} page={page} />
                    {service && <DetailModal item={service} visible={detail} setVisible={setDetail} samples={samples} numbers={owners?.map((item: any) => item.number) || resident?.map((item: any) => item.number)} mutate={mutate} />}
                    <NewModal visible={nw} setVisible={setNw} samples={samples} numbers={owners?.map((item: any) => item.number) || resident?.map((item: any) => item.number)} mutate={mutate} />
                </ScrollView>
            }
        </>
    )
}
