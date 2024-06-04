import { createSlice } from "@reduxjs/toolkit";

const storedCustomerInfo = localStorage.getItem('customerInfo');

const initialState = {
    customerInfo: storedCustomerInfo ? JSON.parse(storedCustomerInfo) : null
};

const customerSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCustomerInfo: (state, action) => {
            state.customerInfo = action.payload;
            localStorage.setItem('customerInfo', JSON.stringify(action.payload));
        }
    }
});

export const { setCustomerInfo } = customerSlice.actions;

export default customerSlice.reducer;
