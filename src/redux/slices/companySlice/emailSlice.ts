import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EmailState {
  email: string;
}

const initialState: EmailState = {
  email: '',
};

const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setVerifyEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

export const { setVerifyEmail } = emailSlice.actions;
export default emailSlice.reducer;