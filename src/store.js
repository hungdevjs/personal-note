
import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"

import rootReducer from "./rootReducer"

let middleware = [thunk]
if (process.env.NODE_ENV !== "production") {
    const logger = require("redux-logger").default
    middleware = [...middleware, logger]
}

export default createStore(rootReducer, applyMiddleware(...middleware))