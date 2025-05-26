import { CustomButton } from "@/components/ui/button";
import { poster } from "@/services/fetch";
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

export default function NewModal({
    visible,
    setVisible,
    mutate,
    numbers,
    samples,
}: {
    visible: boolean;
    setVisible: (boolean: boolean) => void;
    mutate: () => void;
    numbers: number[];
    samples: any[];
}) {
    const [type, setType] = useState(samples?.[0]?.name || "other");
    const [other, setOther] = useState("");
    const [number, setNumber] = useState<number | undefined>();
    const [area, setArea] = useState("Thang máy");
    const [ot, setOt] = useState("");
    const [reason, setReason] = useState("");
    const [startDate, setStartDate] = useState(startOfDay(new Date()));
    const [endDate, setEndDate] = useState(startOfDay(new Date()));
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false)

    const { trigger, isMutating } = useSWRMutation("/services", poster);

    const handleSubmit = async () => {
        const post = await trigger({
            type: type === "other" ? other : type,
            number,
            area: area === "other" ? ot : area,
            reason,
            startDate,
            endDate,
        });
        if (post) {
            mutate();
            setVisible(false);
            setOther("");
            setReason("");
            setOt("");
        }
    };

    return (
        <Modal transparent visible={visible} animationType="slide">
            <View className="flex-1 justify-center bg-black/40">
                <View className="bg-white m-4 rounded-lg p-4 max-h-[90%]">
                    <ScrollView>
                        <Text className="text-xl font-semibold mb-2">Tạo mới yêu cầu</Text>

                        <Text className="font-medium mb-1">Căn hộ</Text>
                        <View className="border rounded mb-3">
                            <Picker
                                selectedValue={number}
                                onValueChange={(val) => setNumber(Number(val))}
                            >
                                <Picker.Item label="Chọn căn hộ" value={undefined} />
                                {numbers?.map((num) => (
                                    <Picker.Item key={num} label={`${num}`} value={num} />
                                ))}
                            </Picker>
                        </View>

                        <Text className="font-medium mb-1">Loại yêu cầu</Text>
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
                                placeholder="Nhập loại yêu cầu khác"
                                value={other}
                                onChangeText={setOther}
                            />
                        )}

                        {type !== "other" && (
                            <Text className="text-sm text-gray-500 mb-3">
                                {samples.find((s) => s.name === type)?.describe || ""}
                            </Text>
                        )}

                        <Text className="font-medium mb-1">Khu vực sử dụng</Text>
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


                        <Text className="font-medium mt-3 mb-1">Mô tả cụ thể</Text>
                        <TextInput
                            className="border rounded px-3 py-2 mb-4 min-h-20 text-left"
                            placeholder="Nhập mô tả"
                            multiline
                            value={reason}
                            onChangeText={setReason}
                        />

                        <CustomButton disabled={isMutating} onPress={handleSubmit} type="success">
                            Gửi yêu cầu
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
