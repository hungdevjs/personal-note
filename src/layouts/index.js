import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Row, Col } from "antd"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"

import Header from "../components/Header"

import routes from "../routes"

import { getInfo } from "../commons/action"

const Layout = () => {
    const user = useSelector(state => state.common.user)
    const isLoading = useSelector(state => state.common.isLoading)

    const dispatch = useDispatch()

    const [isLoaded, setIsLoaded] = useState(true)
    const [render, setRender] = useState(false)

    useEffect(() => {
        getData()

        const timeout = setTimeout(() => {
            setRender(true)
        }, 1000)

        return () => clearTimeout(timeout)
    }, [])

    const getData = async () => {
        await getInfo()(dispatch)
        setIsLoaded(true)
    }

    const anonymousRoutes = routes.filter(route => !route.isAuth)

    const renderRoutes = user ? routes : anonymousRoutes

    return isLoaded
        ? <Row gutter={8} style={{ height: "100%" }}>
            <Col xs={0} md={3} />
            <Col xs={24} md={18}>
                {user && <Header />}
                <Router>
                    <Switch>
                        {renderRoutes.map((route, index) => <Route
                            key={index}
                            path={route.path}
                            exact
                            component={route.component}
                        />)}

                        {!isLoading && render && <Redirect from="/*" to="/login" />}
                    </Switch>
                </Router>
            </Col>
            <Col xs={0} md={3} />
        </Row>
        : null
}

export default Layout