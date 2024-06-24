import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Product from '@/Interfaces/Product';

// import { RootState } from '../store/store';

interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
};

export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchProducts',
  async () => {
    const response = await fetch(
      'https://dynamites-ecomm-be.onrender.com/api/v1/product/getAvailableProducts'
    );
    const data = await response.json();
    return data.availableProducts;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default productsSlice.reducer;
