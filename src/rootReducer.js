import { combineReducers } from "redux"

import common from "./commons/reducer"
import note from "./pages/Home/redux/reducer"

export default combineReducers({
    common,
    note
})