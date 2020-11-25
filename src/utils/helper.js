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
        if (!searchString || !searchString) return true
        if (!rootString || !rootString) return false
        return rootString.toUpperCase().includes(searchString.toUpperCase())
    } catch (err) {
        return false
    }
}