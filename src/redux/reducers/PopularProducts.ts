import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Review from '@/Interfaces/reviews';


// import { RootState } from '../store/store';

interface ProductsState {
  reviews: Review[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ProductsState = {
  reviews: [],
  status: 'idle',
};

export const fetchProducts = createAsyncThunk<Review[]>(
  'products/fetchProducts',
  async () => {
    const response = await fetch('https://dynamites-ecomm-be.onrender.com/api/v1/review');
    const data = await response.json();
    return data.reviews;
  }
);

const reviewSlice = createSlice({
  name: 'rewiew',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default reviewSlice.reducer;
