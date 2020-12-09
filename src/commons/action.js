import { logIn, getUserInfo } from "../api"
import { getAccessToken } from "../utils/helper"
import { alert } from "../utils/helper"

export const setLoading = status => ({
    type: "SET_LOADING",
    payload: status
})

export const setAnimation = status => ({
    type: "SET_ANIMATION",
    payload: status
})

export const getInfo = () => async dispatch => {
    const token = getAccessToken()
    if (!token) return

    dispatch(setLoading(true))
    try {
        const res = await getUserInfo()
        dispatch({
            type: "SET_USER",
            payload: res.data.data
        })
    } catch (err) {
        alert({ type: "error", message: "Something is wrong" })
    }

    dispatch(setLoading(false))
}

export const userLogin = values => async dispatch => {
    dispatch(setLoading(true))
    try {
        const res = await logIn(values)
        const { data, error, accessToken } = res.data

        if (error) throw new Error(error)

        localStorage.setItem("accessToken", accessToken)

        dispatch({
            type: "SET_USER",
            payload: data
        })
    } catch (err) {
        alert({ type: "error", message: err.message })
    }

    dispatch(setLoading(false))
}

export const logout = () => async dispatch => {
    localStorage.removeItem("accessToken")
    dispatch({
        type: "SET_USER",
        payload: null
    })
}

export const closeModal = () => async dispatch => {
    dispatch({
        type: "SET_MODAL",
        payload: {
            title: "",
            message: "",
            isOpen: false,
            handleOk: null
        }
    })
}

export const setModal = modal => async dispatch => {
    dispatch({
        type: "SET_MODAL",
        payload: modal
    })
}