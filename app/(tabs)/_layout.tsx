import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: '#fef08a',
            tabBarStyle: {
                backgroundColor: "#1e293b"
            },
            tabBarInactiveTintColor: "white"
        }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Trang chủ',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="login"
                options={{
                    title: 'Đăng nhập',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="key" color={color} />,
                }}
            />
        </Tabs>
    );
}