import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Product from '@/interfaces/product';

const apiUrl = `${import.meta.env.VITE_BASE_URL}`;

export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchProducts',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${apiUrl}/product/getAvailableProducts`
      );
      const { data } = response;
      return data.availableProducts.slice(0, 2);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

export const initialState: ProductsState = {
  items: [],
  status: 'idle',
};

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
