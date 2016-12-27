import { applyMiddleware, createStore } from "redux";
import reducer from "./reducers";
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

const middleware = applyMiddleware(logger(), thunk, promise());
const store = createStore(reducer, middleware);

export default store;