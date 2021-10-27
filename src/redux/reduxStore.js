import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";

import { app } from "./reducers/app";
import { auth } from "./reducers/auth";
import { global } from "./reducers/global";
import { summary } from "./reducers/summary";
import { transactions } from "./reducers/transactions";
import { widgets } from "./reducers/widgets";

const reducers = combineReducers({
    app,
    auth,
    global,
    summary,
    transactions,
    widgets
});

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));
