import { createSlice } from "@reduxjs/toolkit";


const initalData={
    books:[],
    cart:[]
    
}
const bookSlicer=createSlice({
    name:'books',
    initialState:initalData,
    reducers:{
        fetchBooks:(state,action)=>{
          
            state.books=action.payload

        },
        CartDetails:(state,action)=>{
            state.cart=action.payload
        }

        
       
        
    }


})

export const{fetchBooks,CartDetails}=bookSlicer.actions
export default bookSlicer