import { configureStore } from '@reduxjs/toolkit';
import signUpReducer from '../features/Auth/SignUpSlice';
import signInReducer from '../features/Auth/SignInSlice';
import productsReducer from '@/app/slices/ProductSlice';
import categoriesReducer from '@/app/slices/categorySlice';
import bannerReducer from '@/app/bannerAds/BannerSlice';
import {
  passwordRequestReducer,
  passwordResetReducer,
} from '@/app/slices/authSlices';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    signUp: signUpReducer,
    signIn: signInReducer,
    banners: bannerReducer,
    passwordRequest: passwordRequestReducer,
    passwordReset: passwordResetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
