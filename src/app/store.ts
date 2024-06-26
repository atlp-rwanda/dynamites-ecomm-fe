import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../redux/reducers/RecentProductsSlice';

export const store = configureStore({
  reducer: {
    Popularproducts: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
