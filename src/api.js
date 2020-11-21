
import axios from "axios"
import { BASE_URL } from "../constant"

const getAccessToken = () => {
    try {
        return localStorage.getItem('accessToken')
    } catch {
        return ""
    }
}

const request = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
    },
})

request.interceptors.request.use(
    (config) => {
        const token = getAccessToken()
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

export default request

export const logIn = data => request.post("/account/login", data)