// utils/auth.ts
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'access_token';
const USER_KEY = 'user_info';

export async function saveLoginSession(data: {
    access_token: string;
    name: string;
    id: string;
    role: number;
}) {
    await SecureStore.setItemAsync(TOKEN_KEY, data.access_token);
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify({
        name: data.name,
        id: data.id,
        role: data.role,
    }));
}

export async function getAccessToken() {
    return await SecureStore.getItemAsync(TOKEN_KEY);
}

export async function getUserInfo() {
    const json = await SecureStore.getItemAsync(USER_KEY);
    return json ? JSON.parse(json) : null;
}

export async function logout() {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(USER_KEY);
}
