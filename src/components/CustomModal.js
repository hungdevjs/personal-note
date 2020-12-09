import React from "react"
import { Modal, Button } from "antd"

export default ({ isOpen, title, toggle, handleOk, handleCancel, children, callback, btnTitle, noFooter }) => {
    const closeModal = () => {
        toggle()
        handleCancel()
    }

    const footer = !noFooter
        ? [
            callback
                ? <Button key="option" type="danger" onClick={callback}>{btnTitle}</Button>
                : null,
            <Button key="back" onClick={closeModal}>
                Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk}>
                Submit
            </Button>
        ]
        : null

    return <Modal
        title={title}
        visible={isOpen}
        onOk={handleOk}
        onCancel={closeModal}
        footer={footer}
    >
        {children}
    </Modal>
}