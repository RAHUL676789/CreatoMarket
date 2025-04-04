

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id:"",
    title:"",
    owner:{},
    description:"",
    type:"",
    url:"",
    price:0,
    likes:0,
    comments:[],
    reviews:[],
    downLoads:0,
    publicId:""

}


const contentSlice = createSlice({
    initialState,
    name:"content",
    reducers:{
            initContent:(state,action)=>{
                state.title = action.payload.title,
                state.owner = action.payload.owner,
                state.description = action.payload.description,
                state.type = action.payload.type,
                state.url = action.payload.url,
                state.price = action.payload.price,
                state.likes = action.payload.likes,
                state.comments = action.payload.comments,
                state.reviews = action.payload.reviews,
                state.downloads = action.payload.downloads,
                state.publicId =action.payload.publicId
                state.id = action.payload._id
            }
    }
})




export const {initContent} = contentSlice.actions;
export default contentSlice.reducer;