import React from "react"
import { Space, Row, Col } from "antd"

const Home = () => {
    return <Space direction="vertical" style={{ width: "100%" }}>
        <Row>
            <Col md={12} sm={24} xs={24} style={{ padding: "0 8px" }}>
                Home
            </Col>
        </Row>
    </Space>
}

export default Home