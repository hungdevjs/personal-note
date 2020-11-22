import React from "react"
import { useHistory } from "react-router-dom"
import { Drawer, Button } from "antd"

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
        <Button type="link" block onClick={() => goTo("/")}>
            Home
        </Button>
        <Button type="link" block onClick={() => goTo("/notes")}>
            Notes
        </Button>
    </Drawer>
}

export default DrawerContainer