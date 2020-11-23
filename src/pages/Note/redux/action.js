import { getNotes } from "../../../api"
import { setLoading } from "../../../commons/action"
import { alert } from "../../../utils/helper"

export const getAllNotes = () => async dispatch => {
    dispatch(setLoading(true))

    try {
        const res = await getNotes()

        const { data, error } = res.data
        if (error) throw new Error(error)
        console.log(res)
    } catch (err) {
        alert({ type: "error", message: err.message })
    }

    dispatch(setLoading(false))
}