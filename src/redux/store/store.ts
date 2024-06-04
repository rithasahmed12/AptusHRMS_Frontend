import { configureStore } from "@reduxjs/toolkit";
import customerSlice from "../slices/userSlice/customerSlice";


const store = configureStore({
    reducer:{
        customerInfo:customerSlice,
    }
})

export default store;