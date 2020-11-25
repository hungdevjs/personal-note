import Login from "./pages/Login"
import Home from "./pages/Home"

export default [
    { path: "/login", component: Login },
    { path: "/", component: Home, isAuth: true }
]