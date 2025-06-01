import WebView from "react-native-webview";

export default function Info({ id }: { id: string }) {
  const CLIENT_WEB_DOMAIN = process.env.EXPO_PUBLIC_CLIENT_WEB_DOMAIN
  return (
    <>
      <WebView
        source={{ uri: `${CLIENT_WEB_DOMAIN}/mobile/bills/${id}` }}
        scrollEnabled
      />
    </>
  )
}