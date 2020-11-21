
import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import logger from "redux-logger"

import rootReducer from "./rootReducer"

let middleware = [thunk]
if (process.env.NODE_ENV !== "production") {
    middleware = [...middleware, logger]
}

// export default createStore(rootReducer, applyMiddleware(thunk, logger))
export default createStore(rootReducer, applyMiddleware(...middleware))