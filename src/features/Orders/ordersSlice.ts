import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Order from '@/interfaces/order';
import { RootState } from '../../app/store';

interface OrdersState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
};

const baseUrl = import.meta.env.VITE_BASE_URL;

interface Payload {
  orders: Order[];
}

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const tokenFromStorage = localStorage.getItem('token') || '';
  const response = await axios.get<Payload>(
    `${baseUrl}/checkout/getall-order`,
    {
      headers: {
        Authorization: `Bearer ${tokenFromStorage}`,
      },
    }
  );
  return response.data.orders;
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    cancelOrder: (state, action: PayloadAction<number>) => {
      const orderId = action.payload;
      const orderToCancel = state.orders.find((order) => order.id === orderId);

      if (orderToCancel) {
        const tokenFromStorage = localStorage.getItem('token') || '';
        axios.delete(`${baseUrl}/checkout/cancel-order/${orderId}`, {
          headers: {
            Authorization: `Bearer ${tokenFromStorage}`,
          },
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch orders';
      });
  },
});

export const { cancelOrder } = ordersSlice.actions;

export const selectOrders = (state: RootState) => state.orders;
export default ordersSlice.reducer;
