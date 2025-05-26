import React, { useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";

export default function PaginationC({
    page = 1,
    length = 1,
    handlePage = () => { },
}: {
    page?: number;
    length?: number;
    handlePage?: (page: number) => void;
}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [gotoPage, setGotoPage] = useState("");

    const handleGoto = () => {
        const goto = parseInt(gotoPage);
        if (!isNaN(goto) && goto > 0 && goto <= length) {
            handlePage(goto);
            setModalVisible(false);
            setGotoPage("");
        }
    };

    const PageButton = ({ pageNum }: { pageNum: number }) => (
        <Pressable
            className={`px-3 py-1 mx-1 rounded ${pageNum === page ? "bg-black" : ""
                }`}
            onPress={() => handlePage(pageNum)}
        >
            <Text className={pageNum === page ? "text-white font-bold" : "text-black"}>
                {pageNum}
            </Text>
        </Pressable>
    );

    const PaginationEllipsis = () => (
        <>
            <Pressable
                className="px-3 py-1 mx-1 rounded"
                onPress={() => setModalVisible(true)}
            >
                <Text className="text-black">...</Text>
            </Pressable>
            <Modal
                transparent
                animationType="fade"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View className="flex-1 bg-black bg-opacity-30 justify-center items-center">
                    <View className="bg-white p-5 rounded-md w-64 items-center">
                        <Text className="text-base mb-2">Đi tới trang:</Text>
                        <TextInput
                            className="border border-gray-400 rounded w-full px-3 py-1"
                            keyboardType="number-pad"
                            value={gotoPage}
                            onChangeText={setGotoPage}
                            placeholder={`1 - ${length}`}
                            placeholderTextColor="#999"
                        />
                        <View className="flex-row mt-4">
                            <Pressable
                                className="bg-black px-4 py-2 rounded mr-3"
                                onPress={handleGoto}
                            >
                                <Text className="text-white">Đi tới</Text>
                            </Pressable>
                            <Pressable
                                className="bg-gray-300 px-4 py-2 rounded"
                                onPress={() => setModalVisible(false)}
                            >
                                <Text>Hủy</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );

    const renderPageList = () => {
        if (length < 2) return null;

        if (length < 11) {
            return Array.from({ length }, (_, i) => i + 1).map((num) => (
                <PageButton key={num} pageNum={num} />
            ));
        }

        if (page < 5) {
            return (
                <>
                    {Array.from({ length: page + 1 }, (_, i) => i + 1).map((num) => (
                        <PageButton key={num} pageNum={num} />
                    ))}
                    <PaginationEllipsis />
                    <PageButton pageNum={length} />
                </>
            );
        }

        if (page > length - 4) {
            return (
                <>
                    <PageButton pageNum={1} />
                    <PaginationEllipsis />
                    {Array.from({ length: length - page + 2 }, (_, i) => page + i - 1).map(
                        (num) => (
                            <PageButton key={num} pageNum={num} />
                        )
                    )}
                </>
            );
        }

        return (
            <>
                <PageButton pageNum={1} />
                <PaginationEllipsis />
                <PageButton pageNum={page - 1} />
                <PageButton pageNum={page} />
                <PageButton pageNum={page + 1} />
                <PaginationEllipsis />
                <PageButton pageNum={length} />
            </>
        );
    };

    return (
        <View className="flex-row items-center justify-center my-3">
            <Pressable
                className="px-3 py-1"
                disabled={page <= 1}
                onPress={() => page > 1 && handlePage(page - 1)}
            >
                <Text className={`${page <= 1 ? "text-gray-400" : "text-black"} text-lg`}>
                    {"<"}
                </Text>
            </Pressable>

            <View className="flex-row items-center">{renderPageList()}</View>

            <Pressable
                className="px-3 py-1"
                disabled={page >= length}
                onPress={() => page < length && handlePage(page + 1)}
            >
                <Text className={`${page >= length ? "text-gray-400" : "text-black"} text-lg`}>
                    {">"}
                </Text>
            </Pressable>
        </View>
    );
}
