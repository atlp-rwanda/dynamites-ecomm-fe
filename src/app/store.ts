import { configureStore } from '@reduxjs/toolkit';
import signUpReducer from '../features/Auth/SignUpSlice';
import signInReducer from '../features/Auth/SignInSlice';
import productsReducer from '@/features/Products/ProductSlice';
import categoriesReducer from '@/features/Products/categorySlice';
import bannerReducer from '@/app/bannerAds/BannerSlice';
import availableProductsSlice from '@/features/Popular/availableProductSlice';
import bestSellingProductSlice from '@/features/Popular/bestSellingProductSlice';
import subscribeReducer from '@/app/Footer/Subscribe';
import {
  passwordRequestReducer,
  passwordResetReducer,
} from '@/features/Auth/password';
import buyerSlice from '@/app/Dashboard/buyerSlice';
import orderSlice from './Dashboard/orderSlice';

import ordersSliceReducer from '@/features/Orders/ordersSlice';
import DeshboardProductsSlice from '@/features/Dashboard/dashboardProductsSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    signUp: signUpReducer,
    signIn: signInReducer,
    banners: bannerReducer,
    availableProducts: availableProductsSlice,
    bestSellingProducts: bestSellingProductSlice,
    footer: subscribeReducer,
    passwordRequest: passwordRequestReducer,
    passwordReset: passwordResetReducer,
    buyer: buyerSlice,
    order: orderSlice,
    orders: ordersSliceReducer,
    DeshboardProducts: DeshboardProductsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
