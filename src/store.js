import { applyMiddleware, createStore } from "redux";
import reducer from "./reducers";
import logger from "redux-logger";
import promise from "redux-promise-middleware";
import { persistStore, autoRehydrate } from 'redux-persist';

const middleware = applyMiddleware(logger(), promise(), );
const store = createStore(reducer, middleware, autoRehydrate());
persistStore(store);

export default store;