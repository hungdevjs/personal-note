import { getNotes, updateNote, createNote, removeNote } from "../../../api"
import { setLoading } from "../../../commons/action"
import { alert } from "../../../utils/helper"

export const getAllNotes = () => async dispatch => {
    dispatch(setLoading(true))

    try {
        const res = await getNotes()

        const { data, error } = res.data
        if (error) throw new Error(error)

        dispatch({
            type: "SET_NOTES",
            payload: data
        })
    } catch (err) {
        alert({ type: "error", message: err.message })
    }

    dispatch(setLoading(false))
}

export const update = note => async dispatch => {
    dispatch(setLoading(true))

    try {
        const res = await updateNote(note)

        const { error } = res.data
        if (error) throw new Error(error)

        alert({ type: "success", message: "Update note successfully" })
    } catch (err) {
        alert({ type: "error", message: err.message })
    }

    dispatch(setLoading(false))
}

export const create = note => async dispatch => {
    dispatch(setLoading(true))

    try {
        const res = await createNote(note)

        const { error } = res.data
        if (error) throw new Error(error)

        alert({ type: "success", message: "Create note successfully" })
    } catch (err) {
        alert({ type: "error", message: err.message })
    }

    dispatch(setLoading(false))
}

export const remove = _id => async dispatch => {
    dispatch(setLoading(true))

    try {
        const res = await removeNote(_id)

        const { error } = res.data
        if (error) throw new Error(error)

        alert({ type: "success", message: "Delete note successfully" })
    } catch (err) {
        alert({ type: "error", message: err.message })
    }

    dispatch(setLoading(false))
}