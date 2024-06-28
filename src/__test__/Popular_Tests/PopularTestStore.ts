
import { configureStore } from '@reduxjs/toolkit';
import productsSlice from '../../features/Popular/RecentProductsSlice'; // Adjust the path to your rootReducer

export const createTestStore = async() => {
  const actions: any[] = [];
  const store = configureStore({
    reducer: {
        Popularproducts: productsSlice
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(() => (next) => (action) => {
        actions.push(action);
        return next(action);
      })
  });

  return { store, actions };
};
