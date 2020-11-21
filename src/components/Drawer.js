import React from "react"

import { Drawer } from "antd"

const placement = "left"
const DrawerContainer = ({ isOpen, setIsOpen }) => {
    return <Drawer
        title="example@gmail.com"
        placement={placement}
        closable={false}
        onClose={() => setIsOpen(false)}
        visible={isOpen}
        key={placement}
    >
        Drawer
    </Drawer>
}

export default DrawerContainer