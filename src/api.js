
import axios from "axios"
import { BASE_URL } from "./utils/constants"
import { getAccessToken } from "./utils/helper"

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

export const getUserInfo = () => request.get("account/info")