import { combineReducers } from "@reduxjs/toolkit";
import authReducer from './slices/Auth.slice'

const rootReducer = combineReducers({
    auth: authReducer,
})

export default rootReducer