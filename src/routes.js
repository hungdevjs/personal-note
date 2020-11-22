import Login from "./pages/Login"
import Home from "./pages/Home"
import Note from "./pages/Note"

export default [
    { path: "/login", component: Login },
    { path: "/", component: Home, isAuth: true },
    { path: "/notes", component: Note, isAuth: true },
]