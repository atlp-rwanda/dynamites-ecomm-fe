import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import checkoutReducer, {
  placeOrder,
  getOrders,
  makePayment,
  updateDeliveryInfo,
  updateCouponCode,
} from '@/features/Checkout/checkoutSlice';
import Order from '@/interfaces/order';

// Create mock for axios
const mock = new MockAdapter(axios);

// Configure mock store with the checkout reducer
const store = configureStore({
  reducer: {
    checkout: checkoutReducer,
  },
});

describe('checkoutSlice', () => {
  beforeEach(() => {
    mock.reset();
  });

  it('should handle initial state', () => {
    expect(store.getState().checkout).toEqual({
      checkout: {
        id: -1,
        totalAmount: 0,
        status: 'Pending',
        couponCode: '',
        deliveryInfo: {
          address: '123 Main St',
          city: 'Anytown',
          zip: '12345',
        },
        country: 'US',
        paymentInfo: null,
        trackingNumber: 'Tr280585',
        createdAt: '2024-07-22T01:48:05.301Z',
        updatedAt: '2024-07-22T11:01:20.291Z',
        paid: true,
        orderDetails: [
          {
            id: 41,
            quantity: 2,
            price: 160,
          },
        ],
      },
      loading: false,
      paying: false,
      error: null,
    });
  });

  it('placeOrder updates state on fulfilled', async () => {
    const order = {
      deliveryInfo: {
        address: '123 Main St',
        city: 'Anytown',
        zip: '12345',
      },
      couponCode: 'string',
      email: 'string',
      firstName: 'string',
      lastName: 'string',
    };

    mock.onPost('/checkout').reply(200, { order });

    await store.dispatch(placeOrder(order));

    expect(store.getState().checkout.checkout.deliveryInfo).toEqual(
      expect.objectContaining(order.deliveryInfo)
    );
    expect(store.getState().checkout.checkout.status).toEqual('Pending');
  });

  it('getOrders updates state on fulfilled', async () => {
    const orders: Order[] = [
      {
        country: 'US',
        couponCode: '',
        createdAt: '2024-07-22T01:48:05.301Z',
        deliveryInfo: {
          address: '123 Main St',
          city: 'Anytown',
          zip: '12345',
        },
        id: -1,
        orderDetails: [
          {
            id: 41,
            price: 160,
            quantity: 2,
          },
        ],
        paid: true,
        paymentInfo: null,
        status: 'Pending',
        totalAmount: 0,
        trackingNumber: 'Tr280585',
        updatedAt: '2024-07-22T11:01:20.291Z',
      },
    ];

    mock.onGet('/checkout/getall-order').reply(200, orders);

    await store.dispatch(getOrders());

    expect(store.getState().checkout.checkout).toEqual(
      expect.objectContaining(orders[0])
    );
  });

  it('makePayment updates state on fulfilled', async () => {
    mock.onPost('/buyer/payment').reply(200, { success: true });

    await store.dispatch(makePayment(31));

    expect(store.getState().checkout.paying).toEqual(true);
  });

  it('updateDeliveryInfo updates delivery info', () => {
    const deliveryInfo = { address: '456 Main St' };
    store.dispatch(updateDeliveryInfo(deliveryInfo));

    expect(store.getState().checkout.checkout.deliveryInfo).toEqual(
      expect.objectContaining(deliveryInfo)
    );
  });

  it('updateCouponCode updates coupon code', () => {
    const couponCode = 'NEWYEAR';
    store.dispatch(updateCouponCode(couponCode));

    expect(store.getState().checkout.checkout.couponCode).toEqual(couponCode);
  });
});
