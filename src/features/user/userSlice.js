import { createSlice } from "@reduxjs/toolkit";
import { useReducer } from "react";



const initialState = {
    username:"",
    email:"",
    contents:[],
    userRole:"",
    login:false,
    profilePic:"",
    id:"",
    wallet :0

}



const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        initUser: (state, action) => {
            state.username = action.payload.username;
            state.userRole = action.payload.userRole;
            state.profilePic = action.payload.profilePic || "";
            state.email = action.payload.email;
            state.login = true;
            state.contents = action.payload.contents || action.payload.content;
            state.id = action.payload._id;
            state.wallet = action.payload.wallet;
        },
        updateContent: (state, action) => {
            state.contents.push(action.payload);
        }
    }
});


export const {initUser,updateContent} = userSlice.actions;
export default userSlice.reducer;