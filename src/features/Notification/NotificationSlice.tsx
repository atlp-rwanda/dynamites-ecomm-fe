import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import NotificationBox from '@/types/notification';

interface ProductsState {
  notification: NotificationBox[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}


export const fetchNotification = createAsyncThunk<NotificationBox[]>(
  'Notification',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`https://dynamites-ecomm-be.onrender.com/api/v1/notification/vendor`);
      const {notification} = response.data;
      return notification;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const initialState: ProductsState = {
  notification: [],
  status: 'idle',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotification.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNotification.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notification = action.payload;
      })
      .addCase(fetchNotification.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default notificationSlice.reducer;
