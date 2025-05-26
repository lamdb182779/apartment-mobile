import CommentItem from "@/components/page/customer/comments/comment";
import DetailModal from "@/components/page/customer/comments/detail";
import NewModal from "@/components/page/customer/comments/new";
import PaginationC from "@/components/pagination";
import { fetcher } from "@/services/fetch";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { usePathname } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import useSWR from "swr";

export default function CommentsScreen() {
    const [page, setPage] = useState(1)
    const { data, isLoading, mutate } = useSWR(`/comments/self?current=${page}&pageSize=10`, fetcher)
    const [detail, setDetail] = useState(false)
    const [nw, setNw] = useState(false)
    const [comment, setComment] = useState()
    const path = usePathname()
    useEffect(() => {
        mutate()
    }, [path])
    const handleDetail = (comment: any) => {
        setComment(comment)
        setDetail(true)
    }
    return (
        <>
            {isLoading ?
                <ActivityIndicator size="large" color="#facc15" />
                :
                <>
                    <ScrollView className="p-4 flex-1">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-lg font-bold">Đánh giá, góp ý của tôi</Text>
                            <Pressable onPress={() => setNw(true)} className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                                <FontAwesome size={12} name="plus" color={"white"} />
                            </Pressable>
                        </View>

                        {data?.results?.length > 0 ?
                            data?.results.map((comment: any) => (
                                <Pressable onPress={() => handleDetail(comment)} key={comment.id} >
                                    <CommentItem comment={comment} mutate={mutate} />
                                </Pressable>
                            ))
                            :
                            <>Không có dữ liệu</>
                        }
                        {comment && <DetailModal comment={comment} visible={detail} setVisible={setDetail} />}
                        <NewModal visible={nw} setVisible={setNw} mutate={mutate} />
                        <PaginationC handlePage={setPage} length={data?.totalPages} page={page} />
                    </ScrollView>
                </>

            }
        </>
    )
}