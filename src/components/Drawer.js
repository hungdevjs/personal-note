import React from "react"
import { useHistory } from "react-router-dom"
import { Drawer } from "antd"

import navigations from "../navigations"

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
        width="250"
    >
        {navigations.map(nav => <p
            key={nav.name}
            className="bold text-center hover-blue cursor-pointer"
            style={{ fontSize: "1.1rem" }}
            onClick={() => goTo(nav.path)}
        >
            <nav.icon />
            <span style={{ marginLeft: 16 }}>{nav.name}</span>
        </p>)}
    </Drawer>
}

export default DrawerContainer