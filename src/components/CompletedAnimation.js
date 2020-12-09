import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { setAnimation } from "../commons/action"

const animateStyle = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    zIndex: 9999
}

const imgStyle = {
    width: "70vw",
    height: "70vw"
}

const CompletedAnimation = () => {
    const isAnimation = useSelector(state => state.common.isAnimation)
    const dispatch = useDispatch()

    useEffect(() => {
        if (isAnimation) {
            setTimeout(() => {
                dispatch(setAnimation(false))
            }, 3000)
        }
    }, [isAnimation])

    return isAnimation
        ? <div style={animateStyle}>
            <img src="/img/firework.gif" style={imgStyle} />
            <h2 style={{ color: "tomato", fontFamily: "'Nerko One', cursive" }}>CONGRATULATION!</h2>
        </div>
        : null
}

export default CompletedAnimation