import { combineReducers } from "redux"

import common from "./commons/reducer"
import note from "./pages/Note/redux/reducer"

export default combineReducers({
    common,
    note
})