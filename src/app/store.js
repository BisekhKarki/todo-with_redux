import { configureStore } from "@reduxjs/toolkit";
import listReducer from "../features/todoApi"

export const store = configureStore({
    reducer:{
        list:listReducer
    },

}) 

export default store;

