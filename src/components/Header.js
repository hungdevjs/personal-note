import React, { useState } from "react"
import { Space, Row, Col, Badge, Avatar, Typography } from 'antd'
import { MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons"

import Drawer from "./Drawer"

const { Text } = Typography

const Header = props => {
    const [isOpen, setIsOpen] = useState(false)
    const [isPhone, setIsPhone] = useState(window.innerWidth < 576)

    window.addEventListener("resize", () => {
        const width = window.innerWidth
        setIsPhone(width < 576)
    })

    return <Row style={{ padding: 8 }}>
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
                <span className="cursor-pointer">
                    <Badge count={1}>
                        <Avatar shape="circle" icon={<UserOutlined />} />
                    </Badge>
                </span>
            </Row>
        </Col>
    </Row>
}

export default Header