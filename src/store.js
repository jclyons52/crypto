import { applyMiddleware, createStore } from "redux";
import reducer from "./reducers";
import logger from "redux-logger";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";
import { persistStore, autoRehydrate } from 'redux-persist';

const middleware = applyMiddleware(logger(), thunk );
const store = createStore(reducer, middleware, autoRehydrate());
persistStore(store);

export default store;