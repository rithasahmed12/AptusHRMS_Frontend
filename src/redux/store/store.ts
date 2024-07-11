import { configureStore } from "@reduxjs/toolkit";
import customerSlice from "../slices/userSlice/customerSlice";
import adminSlice from "../slices/adminSlice/adminSlice";
import companySlice from "../slices/companySlice/companySlice";
import attendanceSlice from "../slices/companySlice/attendanceSlice";





const store = configureStore({
    reducer:{
        customerInfo:customerSlice,
        adminInfo:adminSlice,
        companyInfo:companySlice,
        attendance:attendanceSlice
    }
})

export default store;