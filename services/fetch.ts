import { getAccessToken } from "@/auth";
import axios from "axios";
import { isArray } from "lodash";
import { Toast } from 'toastify-react-native';

const SERVER_DOMAIN = process.env.EXPO_PUBLIC_SERVER_DOMAIN

export const axiosInstance = axios.create({
    baseURL: SERVER_DOMAIN
})

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            delete config.headers.Authorization;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const fetcher = (path: string) => axiosInstance.get(path)
    .then(res => res.data)

export const logout = async () => {
    const data = await fetcher("/logout")
    if (data.message === "Log out successfully!") return true
    else return false
}

export const updater = async (path: string, { arg }: { arg: object }) => axiosInstance.patch(path, arg)
    .then(res => {
        Toast.success(res?.data?.message || "Cập nhật thành công!")
        return res.data
    }).catch(error => {
        if (error?.response?.data?.message) {
            const message = error.response.data.message
            if (isArray(message)) {
                message.map(item => Toast.error(item))
            } else Toast.error(message)
        } else Toast.error("Cập nhật thất bại!")
    })

export const poster = async (path: string, { arg }: { arg: object }) => axiosInstance.post(path, arg)
    .then(res => {
        Toast.success(res?.data?.message || "Thêm mới thành công!")
        return res.data
    }).catch(error => {
        if (error?.response?.data?.message) {
            const message = error.response.data.message
            if (isArray(message)) {
                message.map(item => Toast.error(item))
            } else Toast.error(message)
        } else Toast.error("Thêm mới thất bại!")
    })

export const deleter = async (path: string, { arg }: { arg: object }) => axiosInstance.delete(path, {
    data: arg,
})
    .then(res => {
        Toast.success(res?.data?.message || "Xóa thành công!")
        return res.data
    }).catch(error => {
        if (error?.response?.data?.message) {
            const message = error.response.data.message
            if (isArray(message)) {
                message.map(item => Toast.error(item))
            } else Toast.error(message)
        } else Toast.error("Xóa thất bại!")
    })

export const posterNoHeader = async (path: string, { arg }: { arg: object }) => axios.create({
    baseURL: SERVER_DOMAIN
}).post(path, arg)
    .then(res => {
        return res.data
    }).catch(error => {
        Toast.error(error?.response?.data?.message || "Thêm mới thất bại")
    })