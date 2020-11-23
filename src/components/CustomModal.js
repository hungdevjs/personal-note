import React from "react"
import { Modal, Button } from "antd"

export default ({ isOpen, title, toggle, handleOk, handleCancel, children }) => <Modal
    title={title}
    visible={isOpen}
    onOk={() => {
        toggle()
        handleOk()
    }}
    onCancel={() => {
        toggle()
        handleCancel()
    }}
>
    {children}
</Modal>