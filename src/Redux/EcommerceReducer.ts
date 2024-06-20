import { createSlice } from '@reduxjs/toolkit';

interface IsLoggedIn {
  value: boolean;
}

const initialState: IsLoggedIn = {
  value: false,
};

const ecommerceSlice = createSlice({
  name: 'IsLoggedIn',
  initialState,
  reducers: {
    login: (state) => {
      state.value = true;
    },
  },
});

export const { login } = ecommerceSlice.actions;

export default ecommerceSlice.reducer;
