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

export const matchingSearch = (rootString, searchString) => {
    try {
        if (!rootString || !searchString) return true
        return rootString.toUpperCase().includes(searchString.toUpperCase())
    } catch (err) {
        return false
    }
}