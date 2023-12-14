import { configureStore } from "@reduxjs/toolkit";
import bookslicer from "./reducers/bookslicer";

const bookStore=configureStore({
    reducer:{
        books:bookslicer.reducer
    }
   

})

export default bookStore