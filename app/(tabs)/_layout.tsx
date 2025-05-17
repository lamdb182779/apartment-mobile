import useAuth from '@/hooks/use-auth';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, useNavigation } from 'expo-router';
import { Pressable, Text } from 'react-native';

export default function TabLayout() {
    const navigation = useNavigation()
    const { user } = useAuth()
    const screens = [
        {
            name: 'index',
            title: 'Trang chủ',
            icon: 'home',
            show: true
        },
        {
            name: 'login/index',
            title: 'Đăng nhập',
            icon: 'key',
            show: !user
        },
        {
            name: 'profile/index',
            title: 'Cá nhân',
            icon: 'user',
            show: !!user
        },
    ]
    return (
        <Tabs screenOptions={{
            animation: "shift",
            tabBarActiveTintColor: '#fef08a',
            tabBarStyle: {
                backgroundColor: "#1e293b"
            },
            tabBarInactiveTintColor: "white",
            sceneStyle: {
                backgroundColor: "#fefdf5"
            },
            tabBarHideOnKeyboard: true,
            headerStyle: { backgroundColor: "#1e293b" },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerLeft: (navigation.canGoBack?.()) ?
                () => (
                    <Pressable
                        onPress={() => navigation.goBack()}
                        style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12 }}
                    >
                        <FontAwesome name="angle-left" size={24} color="#fff" />
                        <Text style={{ color: '#fff', marginLeft: 6 }}>Quay lại</Text>
                    </Pressable>
                )
                :
                () => null,
        }}
        >
            {screens.map(({ name, title, icon, show }) => (
                show ? <Tabs.Screen
                    key={name}
                    name={name}
                    options={{
                        title,
                        tabBarIcon: ({ color }) => (
                            <FontAwesome size={24} name={icon as any} color={color} />
                        ),
                    }}
                />
                    :
                    <Tabs.Screen
                        key={name}
                        name={name}
                        options={{
                            href: null
                        }}
                    />
            ))}
        </Tabs >
    );
}