import Apartment from "@/components/page/owner/apartments/apartment";
import { fetcher } from "@/services/fetch";
import { ActivityIndicator, ScrollView, View } from "react-native";
import useSWR from "swr";

export default function ApartmentsScreen() {
    const { data, isLoading } = useSWR("/owners/apartments", fetcher)
    return (
        <ScrollView className="flex flex-col p-5">
            {isLoading ?
                <ActivityIndicator size="large" color="#facc15" />
                :
                <View className="pb-5">
                    {data?.length > 0 ?
                        <>
                            {data?.map((apt: any) => (
                                <Apartment key={apt?.number} apt={apt} />
                            ))}
                        </>
                        :
                        <>
                            Không có dữ liệu
                        </>
                    }

                </View>
            }
        </ScrollView >
    )
}