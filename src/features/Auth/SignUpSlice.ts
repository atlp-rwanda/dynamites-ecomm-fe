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
  facebookAccessToken: string | null; 
}

const initialState: SignUpState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  userType: 'buyer',
  loading: false,
  error: null,
  facebookAccessToken: null, 
};

const apiUrl = `${import.meta.env.VITE_BASE_URL}/user/register`;

export const registerUser = createAsyncThunk(
  'signUp/registerUser',
  async (userData: Omit<SignUpState, 'loading' | 'error' | 'facebookAccessToken'>) => { 
    const response = await axios.post(apiUrl, userData);
    return response.data;
  }
);

export const registerUserWithFacebook = createAsyncThunk(
  'signUp/registerUserWithFacebook',
  async (accessToken: string) => {
    const response = await axios.post(`${apiUrl}/facebook`, { accessToken });
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
    setFacebookAccessToken: (state, action: PayloadAction<string | null>) => { // Add this reducer
      state.facebookAccessToken = action.payload;
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
      })
      .addCase(registerUserWithFacebook.pending, (state) => { 
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserWithFacebook.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUserWithFacebook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { setFirstName, setLastName, setEmail, setPassword, setUserType, setFacebookAccessToken } =
  signUpSlice.actions;

export default signUpSlice.reducer;