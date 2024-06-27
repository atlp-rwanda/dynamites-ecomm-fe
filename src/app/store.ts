import { configureStore } from '@reduxjs/toolkit';
import signUpReducer from '../features/Auth/SignUpSlice';
import signInReducer from '../features/Auth/SignInSlice';

export const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    signIn: signInReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
