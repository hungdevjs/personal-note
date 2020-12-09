import React from "react"
import { Tabs } from "antd"

import SubTab from "./SubTab"

const { TabPane } = Tabs

const Home = () => (
    <Tabs defaultActiveKey="1" onChange={() => console.log(1)}>
        <TabPane tab="Active note" key="1">
            <SubTab />
        </TabPane>
        <TabPane tab="Completed" key="2">
            <SubTab isCompleted />
        </TabPane>
    </Tabs>
)

export default Home