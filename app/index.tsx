import { Link } from "expo-router";
import { Button, Text, View } from "react-native";
import { Toast } from 'toastify-react-native';

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-blue-500">hell</Text>
      <Link href={"/login"}>Click here to login</Link>

      <Button
        title='Show Success Toast'
        onPress={() => {
          Toast.success('Success message!')
        }}
      />
    </View>
  );
}
