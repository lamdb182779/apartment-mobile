import React, { useState } from "react";
import { FlatList, Modal, Pressable, Text, View } from "react-native";

interface CustomSelectProps {
    options: any[];
    selected: any;
    onSelect: (item: any) => void;
    keyExtractor: (item: any) => string;
    renderButton: (open: () => void, selected: any) => React.ReactNode;
}

export function CustomSelect({
    options,
    selected,
    onSelect,
    keyExtractor,
    renderButton,
}: CustomSelectProps) {
    const [visible, setVisible] = useState(false);

    const open = () => setVisible(true);
    const close = () => setVisible(false);

    const handleSelect = (item: any) => {
        onSelect(item);
        close();
    };

    return (
        <>
            {/* Render Button */}
            {renderButton(open, selected)}

            {/* Modal for select options */}
            <Modal transparent animationType="fade" visible={visible}>
                <Pressable
                    className="flex-1 justify-center items-center bg-black/40"
                    onPress={close}
                >
                    <View className="bg-white rounded-lg w-4/5 p-4 shadow-lg max-h-[60%]">
                        <FlatList
                            data={options}
                            keyExtractor={keyExtractor}
                            renderItem={({ item }) => {
                                return (
                                    <Pressable
                                        onPress={() => handleSelect(item)}
                                        className={`p-3 border-b border-gray-300 ${item === selected ? "bg-blue-100" : "bg-white"
                                            }`}
                                    >
                                        <Text className="text-lg text-gray-700">{item.name}</Text>
                                    </Pressable>
                                );
                            }}
                        />
                    </View>
                </Pressable>
            </Modal>
        </>
    );
}
