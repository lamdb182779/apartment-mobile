import { AuthProvider } from "@/hooks/use-auth";
import { Stack } from "expo-router";
import ToastManager from 'toastify-react-native';
import "./global.css";

export default function RootLayout() {
  const screens = [
    {
      name: "profile/info/index",
      headerTitle: "Thông tin cá nhân"
    },
    {
      name: "customer/notifications/[id]/index",
      headerTitle: "Chi tiết thông báo"
    },
  ]
  return (
    <AuthProvider>
      <Stack screenOptions={{
        animation: "slide_from_right",
        contentStyle: {
          backgroundColor: "#fefdf5"
        },
        headerStyle: {
          backgroundColor: "#1e293b"
        },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 18
        }
      }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {screens.map(({ name, headerTitle }) => <Stack.Screen name={name} key={name} options={{ headerTitle }} />)}
      </Stack>
      < ToastManager />
    </AuthProvider>
  )
}
