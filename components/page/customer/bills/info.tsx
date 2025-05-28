import WebView from "react-native-webview";

export default function Info({ id }: { id: string }) {
    const CLIENT_WEB_DOMAIN = process.env.EXPO_PUBLIC_CLIENT_WEB_DOMAIN
    return (
        <>
            <WebView
                source={{ uri: `${CLIENT_WEB_DOMAIN}/mobile/bills/${id}` }}
                scrollEnabled
                onMessage={(event) => {
                    console.log("Log từ WebView:", event.nativeEvent.data)
                }}
                injectedJavaScript={`
    (function() {
      const originalLog = console.log;
      console.log = function(...args) {
        window.ReactNativeWebView.postMessage(args.join(" "));
        originalLog.apply(console, args);
      };
    })();
    true;
  `}
            />
        </>
    )
}