import { configureStore } from '@reduxjs/toolkit';
import productsSlice from '../features/Popular/RecentProductsSlice';

export const store = configureStore({
  reducer: {
    Popularproducts: productsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
