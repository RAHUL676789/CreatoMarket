import {configureStore} from "@reduxjs/toolkit";

import userReducer from "../features/user/userSlice"
import contentReducer from "../features/content/contentSlice"
export const store = configureStore( {
    reducer:{
        user:userReducer,
        content:contentReducer
    }
})