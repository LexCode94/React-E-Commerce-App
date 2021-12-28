import cartReducer from "./cart";
import loginReducer from "./login";
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    cart: cartReducer,
    login: loginReducer
})

export default allReducers;