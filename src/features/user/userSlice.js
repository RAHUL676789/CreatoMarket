import { createSlice } from "@reduxjs/toolkit";
import { useReducer } from "react";
// import { deleteContent } from "../../../../backend/controllers/contentControllers";



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

        newContent: (state, action) => {
            state.contents = [...state.contents, action.payload];
        },
        removeContent: (state, action) => {
            const index = state.contents.findIndex(item => item._id === action.payload._id);
            if (index !== -1) {
                state.contents.splice(index, 1); //  Redux Toolkit me ye allowed hai
            }
        },
        updateContent: (state, action) => {
            console.log("action.payload", action.payload);
            const index = state.contents.findIndex(item => item._id === action.payload._id);
            if (index !== -1) {
                state.contents[index] = action.payload; //  Redux Toolkit me ye allowed hai
            }
        }
        
    }
});


export const {initUser,updateContent,newContent,removeContent} = userSlice.actions;
export default userSlice.reducer;