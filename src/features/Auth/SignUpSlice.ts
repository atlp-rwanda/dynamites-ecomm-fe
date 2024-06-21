import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface SignUpState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: 'vendor' | 'buyer';
  loading: boolean;
  error: string | null;
}

const initialState: SignUpState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  userType: 'buyer',
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  'signUp/registerUser',
  async (userData: Omit<SignUpState, 'loading' | 'error'>) => {
    const response = await axios.post('https://dynamites-ecomm-be.onrender.com/api/v1/user/register', userData);
    return response.data;
  }
);

const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setUserType: (state, action: PayloadAction<'vendor' | 'buyer'>) => {
      state.userType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { setFirstName, setLastName, setEmail, setPassword, setUserType } = signUpSlice.actions;

export default signUpSlice.reducer;

