import React from "react"
import { Modal, Button } from "antd"

export default ({ isOpen, title, toggle, handleOk, handleCancel, children, callback, btnTitle }) => {
    const closeModal = () => {
        toggle()
        handleCancel()
    }

    return <Modal
        title={title}
        visible={isOpen}
        onOk={handleOk}
        onCancel={closeModal}
        footer={[
            callback
                ? <Button key="option" type="danger" onClick={callback}>{btnTitle}</Button>
                : null,
            <Button key="back" onClick={closeModal}>
                Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk}>
                Submit
            </Button>
        ]}
    >
        {children}
    </Modal>
}