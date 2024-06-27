import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
  userType: {
    id: number;
    name: string;
    permissions: string[];
  };
}

interface SignInState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  message: string | null;
  role: string | null;
  needsVerification: boolean;
  needs2FA: boolean;
}

interface DecodedToken {
  user: User;
}

interface LoginResponse {
  token: string;
  message: string;
}

interface Credentials {
  email: string;
  password: string;
}

const tokenFromStorage = localStorage.getItem('token');

let userFromToken: User | null = null;

if (tokenFromStorage) {
  try {
    const decodedToken = jwtDecode<DecodedToken>(tokenFromStorage);
    userFromToken = {
      id: decodedToken.user.id,
      firstName: decodedToken.user.firstName,
      lastName: decodedToken.user.lastName,
      email: decodedToken.user.email,
      picture: decodedToken.user.picture,
      userType: decodedToken.user.userType,
    };
  } catch (error) {
    localStorage.removeItem('token');
  }
}

export const initialState: SignInState = {
  token: tokenFromStorage,
  user: userFromToken,
  loading: false,
  error: null,
  message: null,
  role: null,
  needsVerification: false,
  needs2FA: false,
};

const apiUrl = `${import.meta.env.VITE_BASE_URL}/user/login`;
export const loginUser = createAsyncThunk<LoginResponse, Credentials>(
  'signIn/loginUser',
  async (credentials: Credentials, thunkAPI) => {
    return axios
      .post(apiUrl, credentials)
      .then((response) => response.data)
      .catch((error) => thunkAPI.rejectWithValue(error.response.data));
  }
);

const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        role: null,
        message: 'Logout Successfully',
        needsVerification: false,
        needs2FA: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
        needsVerification: false,
        needs2FA: false,
      };
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<LoginResponse>) => {
        const newToken = action.payload.message.includes('2FA')
          ? null
          : action.payload.token;

        localStorage.setItem('token', newToken!);
        const decodedData = jwtDecode<DecodedToken>(action.payload.token);
        const decodedUser = {
          id: decodedData.user.id,
          firstName: decodedData.user.firstName,
          lastName: decodedData.user.lastName,
          email: decodedData.user.email,
          picture: decodedData.user.picture,
          userType: decodedData.user.userType,
        };

        return {
          ...state,
          loading: false,
          message: action.payload.message,
          token: newToken,
          user: decodedUser,
          role: action.payload.message.includes('2FA')
            ? null
            : jwtDecode<DecodedToken>(action.payload.token).user.userType.name,
          needsVerification:
            action.payload.message.includes('verify your email'),
          needs2FA: action.payload.message.includes('2FA'),
        };
      }
    );
    builder.addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
      return {
        ...state,
        loading: false,
        error: action.payload.message,
        message: null,
        needsVerification: action.payload.message.includes('verify your email'),
      };
    });
  },
});

export const { logout } = signInSlice.actions;

export default signInSlice.reducer;
