import { createSlice } from "@reduxjs/toolkit";

const storedCompanyInfo = localStorage.getItem('companyInfo');

const initialState = {
    companyInfo: storedCompanyInfo ? JSON.parse(storedCompanyInfo) : null
};

const companySlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCompanyInfo: (state, action) => {
            state.companyInfo = action.payload;
            localStorage.setItem('companyInfo', JSON.stringify(action.payload));
        },
        companyLogout:(state) => {
            state.companyInfo = null;
            localStorage.removeItem('companyInfo')
        },
    }
});

export const { setCompanyInfo,companyLogout } = companySlice.actions;

export default companySlice.reducer;
