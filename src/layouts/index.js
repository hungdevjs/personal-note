import React from "react"
import { Row, Col } from "antd"
import { Router, Route, Switch } from "react-router-dom"

import Header from "../components/Header"

import routes from "../routes"
import history from '../utils/history'

const Layout = props => {

    return <Row gutter={8} style={{ height: "100%" }}>
        <Col xs={0} md={3} />
        <Col xs={24} md={18}>
            {/* <Header /> */}
            <Router history={history}>
                <Switch>
                    {routes.map((route, index) => <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                    />)}
                </Switch>
            </Router>
        </Col>
        <Col xs={0} md={3} />
    </Row>
}

export default Layout