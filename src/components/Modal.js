import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Modal, Button } from "antd"

import { closeModal } from "../commons/action"

export default () => {
    const modal = useSelector(state => state.common.modal)

    const dispatch = useDispatch()

    const { isOpen, title, message, handleOk } = modal

    const handleCancel = () => dispatch(closeModal())
    const handleSubmit = () => {
        handleOk()
        dispatch(closeModal())
    }

    const buttons = [<Button key="back" onClick={handleCancel}>Cancel</Button>]
    if (handleOk) {
        buttons.push(<Button key="submit" type="primary" onClick={handleSubmit}>Ok</Button>)
    }

    return message && message.length > 0
        ? <Modal
            title={title}
            visible={isOpen}
            onOk={handleSubmit}
            onCancel={handleCancel}
            footer={buttons}
        >
            {message}
        </Modal>
        : null
}
