import { createSlice } from "@reduxjs/toolkit";


const initalData={
    books:[],
    
}

const bookSlicer=createSlice({
    name:'books',
    initialState:initalData,
    reducers:{
        fetchBooks:(state,action)=>{
          
            state.books=action.payload

        },
       
        
    }


})

export const{fetchBooks}=bookSlicer.actions
export default bookSlicer