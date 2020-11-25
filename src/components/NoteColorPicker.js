import React from "react"
import { CheckCircleFilled } from "@ant-design/icons"

import { noteColors } from "../utils/constants"

const NoteColorPicker = props => {
    const { color, setColor } = props

    return <div className="d-flex align-items-center justify-content-between" style={{ maxWidth: "300px" }}>
        {noteColors.map((noteColor, index) => <div
            key={index}
            className="d-flex align-items-center justify-content-center"
            style={{
                cursor: "pointer",
                backgroundColor: noteColor,
                borderRadius: "50%",
                width: 40,
                height: 40
            }}
            onClick={() => setColor(noteColor)}
        >
            {color === noteColor && <CheckCircleFilled style={{ color: "#fff", fontSize: "14px" }} />}
        </div>)}
    </div>
}

export default NoteColorPicker