import { configureStore } from '@reduxjs/toolkit';
import signUpReducer from '../features/Auth/SignUpSlice';
import productsSlice from '../features/Popular/RecentProductsSlice';

export const store = configureStore({
  reducer: {
    signUp: signUpReducer,
  
    Popularproducts: productsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
