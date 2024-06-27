import { configureStore } from "@reduxjs/toolkit";
import customerSlice from "../slices/userSlice/customerSlice";
import adminSlice from "../slices/adminSlice/adminSlice";
import companySlice from "../slices/companySlice/companySlice";
import emailSlice from "../slices/companySlice/emailSlice";




const store = configureStore({
    reducer:{
        customerInfo:customerSlice,
        adminInfo:adminSlice,
        companyInfo:companySlice,
        email:emailSlice
    }
})

export default store;