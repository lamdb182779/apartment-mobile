import { Stack } from "expo-router";
import React from "react";
import ToastManager from 'toastify-react-native';
import "./global.css";

export default function RootLayout() {
  return (
    <>
      < ToastManager />
      <Stack >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  )
}
