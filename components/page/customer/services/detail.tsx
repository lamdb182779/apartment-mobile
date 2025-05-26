import { CustomButton } from "@/components/ui/button";
import { updater } from "@/services/fetch";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { format, startOfDay } from "date-fns";
import { useState } from "react";
import {
    Modal,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import useSWRMutation from "swr/mutation";

export default function ServiceDetailModal({
    visible,
    setVisible,
    item,
    mutate,
    numbers,
    samples,
}: {
    visible: boolean;
    setVisible: (b: boolean) => void;
    item: any;
    mutate: () => void;
    numbers: number[];
    samples: any[];
}) {
    const [number, setNumber] = useState(item.number);
    const [type, setType] = useState(samples.find(s => s.name === item.type) ? item.type : "other");
    const [other, setOther] = useState(type === "other" ? item.type : "");
    const [area, setArea] = useState(["Thang máy", "Hành lang", "Sân chơi", "Băng rôn, bảng hiệu", "Phòng sinh hoạt công cộng", "Không"].includes(item.area) ? item.area : "other");
    const [ot, setOt] = useState(area === "other" ? item.area : "");
    const [startDate, setStartDate] = useState(new Date(item.startDate));
    const [endDate, setEndDate] = useState(new Date(item.endDate));
    const [reason, setReason] = useState(item.reason);
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false)

    const { trigger, isMutating } = useSWRMutation(`/services/${item.id}`, updater);

    const handleUpdate = async () => {
        const update = await trigger({
            type: type === "other" ? other : type,
            startDate,
            endDate,
            area: area === "other" ? ot : area,
            reason,
            number,
            status: "Chờ xác nhận"
        });

        if (update) {
            mutate();
            setVisible(false);
        }
    };

    return (
        <Modal transparent visible={visible} animationType="slide">
            <View className="flex-1 justify-center bg-black/40">
                <View className="bg-white m-4 rounded-lg p-4 max-h-[90%]">
                    <ScrollView>
                        <Text className="text-xl font-semibold mb-4">Chỉnh sửa yêu cầu</Text>

                        <Text className="font-medium">Căn hộ</Text>
                        <View className="border rounded mb-3">
                            <Picker selectedValue={number} onValueChange={(val) => setNumber(val)}>
                                {numbers?.map((num) => (
                                    <Picker.Item key={num} label={`${num}`} value={num} />
                                ))}
                            </Picker>
                        </View>

                        <Text className="font-medium">Loại yêu cầu</Text>
                        <View className="border rounded mb-2">
                            <Picker selectedValue={type} onValueChange={setType}>
                                {samples?.map((s) => (
                                    <Picker.Item key={s.id} label={s.name} value={s.name} />
                                ))}
                                <Picker.Item label="Khác" value="other" />
                            </Picker>
                        </View>
                        {type === "other" && (
                            <TextInput
                                className="border rounded px-3 py-2 mb-2"
                                placeholder="Nhập loại khác"
                                value={other}
                                onChangeText={setOther}
                            />
                        )}

                        <Text className="font-medium">Khu vực sử dụng</Text>
                        <View className="border rounded mb-2">
                            <Picker selectedValue={area} onValueChange={setArea}>
                                <Picker.Item label="Thang máy" value="Thang máy" />
                                <Picker.Item label="Hành lang" value="Hành lang" />
                                <Picker.Item label="Sân chơi" value="Sân chơi" />
                                <Picker.Item label="Băng rôn, bảng hiệu" value="Băng rôn, bảng hiệu" />
                                <Picker.Item label="Phòng sinh hoạt công cộng" value="Phòng sinh hoạt công cộng" />
                                <Picker.Item label="Không" value="Không" />
                                <Picker.Item label="Khác" value="other" />
                            </Picker>
                        </View>
                        {area === "other" && (
                            <TextInput
                                className="border rounded px-3 py-2 mb-2"
                                placeholder="Nhập khu vực khác"
                                value={ot}
                                onChangeText={setOt}
                            />
                        )}

                        <Text className="font-medium mt-3">Thời gian bắt đầu</Text>
                        <Pressable onPress={() => setShowStartPicker(true)} className="border px-3 py-2 rounded mb-2">
                            <Text>{format(startDate, "dd/MM/yyyy")}</Text>
                        </Pressable>
                        {showStartPicker && (
                            <DateTimePicker
                                value={startDate}
                                mode="date"
                                display="default"
                                onChange={(_, date) => {
                                    setShowStartPicker(false);
                                    if (date) setStartDate(startOfDay(date));
                                }}
                            />
                        )}

                        <Text className="font-medium mt-3">Thời gian kết thúc</Text>
                        <Pressable onPress={() => setShowEndPicker(true)} className="border px-3 py-2 rounded mb-2">
                            <Text>{format(endDate, "dd/MM/yyyy")}</Text>
                        </Pressable>
                        {showEndPicker && (
                            <DateTimePicker
                                value={endDate}
                                mode="date"
                                display="default"
                                onChange={(_, date) => {
                                    setShowEndPicker(false);
                                    if (date) setEndDate(startOfDay(date));
                                }}
                            />
                        )}

                        <Text className="font-medium mt-3">Mô tả</Text>
                        <TextInput
                            className="border rounded px-3 py-2 mb-4 min-h-20 text-left"
                            placeholder="Nhập mô tả"
                            multiline
                            value={reason}
                            onChangeText={setReason}
                        />

                        <CustomButton disabled={isMutating} onPress={handleUpdate} type="success">
                            Cập nhật
                        </CustomButton>

                        <Pressable onPress={() => setVisible(false)} className="mt-3 items-center">
                            <Text className="text-gray-600">Đóng</Text>
                        </Pressable>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}
