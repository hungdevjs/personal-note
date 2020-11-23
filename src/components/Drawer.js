import React from "react"
import { useHistory } from "react-router-dom"
import { Drawer } from "antd"
import { HomeOutlined, BookOutlined } from "@ant-design/icons"

const placement = "left"
const DrawerContainer = ({ isOpen, setIsOpen }) => {
    const history = useHistory()

    const goTo = path => {
        history.push(path)
        setIsOpen(false)
    }

    return <Drawer
        title="PERSONAL UTILS"
        placement={placement}
        closable={false}
        onClose={() => setIsOpen(false)}
        visible={isOpen}
        key={placement}
        width="175"
    >
        <p className="bold text-center hover-blue cursor-pointer" onClick={() => goTo("/")}>
            <HomeOutlined />{" "}
            Home
        </p>
        <p className="bold text-center hover-blue cursor-pointer" onClick={() => goTo("/notes")}>
            <BookOutlined /> {" "}
            Notes
        </p>
    </Drawer>
}

export default DrawerContainer