import { configureStore } from "@reduxjs/toolkit";
import customerSlice from "../slices/userSlice/customerSlice";
import adminSlice from "../slices/adminSlice/adminSlice";



const store = configureStore({
    reducer:{
        customerInfo:customerSlice,
        adminInfo:adminSlice
    }
})

export default store;