import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../redux/reducers/RecentProductsSlice';
import reviewsReducer from '../redux/reducers/PopularProducts'


export const store = configureStore({
  reducer: {
    Popularproducts: productsReducer,
    Reviews:reviewsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
