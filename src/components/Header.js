import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { Space, Row, Col, Badge, Avatar, Typography, Popover } from 'antd'
import { MenuUnfoldOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons"

import Drawer from "./Drawer"

import { logout } from "../commons/action"

const { Text } = Typography

const Header = props => {
    const [isOpen, setIsOpen] = useState(false)
    const [isPhone, setIsPhone] = useState(window.innerWidth < 576)

    const dispatch = useDispatch()

    window.addEventListener("resize", () => {
        const width = window.innerWidth
        setIsPhone(width < 576)
    })

    const content = <div>
        <div
            className="cursor-pointer hover-blue"
            onClick={() => dispatch(logout())}
        >
            <LogoutOutlined />
            <span style={{ marginLeft: 8 }}>Log out</span>
        </div>
    </div>

    return <Row style={{ padding: "8px 8px 8px 0" }}>
        <Drawer
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        />

        <Col span={18}>
            <Space size={16}>
                {isPhone && <MenuUnfoldOutlined
                    className="drawer-toggle"
                    onClick={() => setIsOpen(!isOpen)}
                />}

                <Text strong type="danger">PERSONAL UTILS</Text>
            </Space>
        </Col>

        <Col span={6}>
            <Row justify="end">
                <Popover placement="bottomRight" title="" content={content} trigger="click">
                    <span className="cursor-pointer">
                        <Badge count={1}>
                            <Avatar shape="circle" icon={<UserOutlined />} />
                        </Badge>
                    </span>
                </Popover>
            </Row>
        </Col>
    </Row>
}

export default Header