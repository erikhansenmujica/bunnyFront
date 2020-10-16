import { createStore, applyMiddleware, combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import taskReducer from "./reducers/taskReducer";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

const loggerMiddleware = createLogger();

const reducer = combineReducers({userReducer, taskReducer});
let store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware, // nos permite despachar funciones
    loggerMiddleware // buen middleware que registra las acciones
  )
);

export default store;
