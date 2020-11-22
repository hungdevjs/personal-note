import { notification } from "antd"

export const alert = ({ type = "info", message = "", description = "" }) => {
    notification[type]({
        message,
        description,
    })
}

export const getAccessToken = () => {
    try {
        return localStorage.getItem("accessToken")
    } catch {
        return ""
    }
}