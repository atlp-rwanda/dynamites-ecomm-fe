import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Review from '@/Interfaces/reviews';

// import { RootState } from '../store/store';

interface ReviewState {
  reviews: Review[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ReviewState = {
  reviews: [],
  status: 'idle',
};

export const fetchReviews = createAsyncThunk<Review[]>('review/', async () => {
  const response = await fetch('http://localhost:3000/api/v1/review');
  const data = await response.json();
  return data.reviews;
});

const reviewSlice = createSlice({
  name: 'rewiew',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default reviewSlice.reducer;
