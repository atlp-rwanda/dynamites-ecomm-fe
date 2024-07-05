import { configureStore } from '@reduxjs/toolkit';
import signUpReducer from '../features/Auth/SignUpSlice';
import signInReducer from '../features/Auth/SignInSlice';
import productsReducer from '@/app/slices/ProductSlice';
import categoriesReducer from '@/app/slices/categorySlice';
import bannerReducer from '@/app/bannerAds/BannerSlice';
import availableProductsSlice from '@/features/Popular/availableProductSlice';
import subscribeReducer from '@/app/Footer/Subscribe';
import DeshboardProductsSlice from '../features/Dashboard/dashboardProductsSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    signUp: signUpReducer,
    signIn: signInReducer,
    banners: bannerReducer,
    availableProducts: availableProductsSlice,
    footer: subscribeReducer,
    DeshboardProducts: DeshboardProductsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
