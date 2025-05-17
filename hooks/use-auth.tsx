import { getAccessToken, getUserInfo, logoutSession } from "@/auth"
import { useRouter } from "expo-router"
import { createContext, useContext, useEffect, useState } from "react"
import { Toast } from "toastify-react-native"

export const AuthContext = createContext<any>("null")

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>()
    const [token, setToken] = useState<string | null>()
    const router = useRouter()
    const update = async () => {
        const user_info = await getUserInfo()
        const access_token = await getAccessToken()
        setUser(user_info)
        setToken(access_token)
    }
    const logout = async () => {
        const out = await logoutSession()
        if (out) {
            setUser(null)
            setToken(null)
            Toast.success("Đăng xuất thành công")
            router.push("/login")
        }
    }
    useEffect(() => {
        update()
    }, [])
    return (
        <AuthContext.Provider value={{ user, token, update, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext);
}