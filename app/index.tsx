import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-blue-500">hell</Text>
      <Link href={"/login"}>Click here to login</Link>
    </View>
  );
}
