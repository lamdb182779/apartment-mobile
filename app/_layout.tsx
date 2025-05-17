import { AuthProvider } from "@/hooks/use-auth";
import { Stack } from "expo-router";
import ToastManager from 'toastify-react-native';
import "./global.css";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      < ToastManager />
    </AuthProvider>
  )
}
