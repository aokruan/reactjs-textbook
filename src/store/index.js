import { createStore, combineReducers, applyMiddleware } from "redux";
import { cashReducereducer } from "./cashReducer";
import { customerReducer } from "./customerReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { todoReducer } from "./todoReducer";

// Можно передать название reducer или же сделать передачу через key:value (в таком случае будет обращение по ключу).
const rootReducer = combineReducers({
    cash:cashReducereducer,
    customers: customerReducer,
    todos:todoReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
