import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { getAllNotes } from "./redux/action"

const Note = props => {
    useEffect(() => {
        getData()
    }, [])

    const dispatch = useDispatch()

    const getData = async () => {
        await getAllNotes()(dispatch)
    }

    return <div>
        Notes
    </div>
}

export default Note