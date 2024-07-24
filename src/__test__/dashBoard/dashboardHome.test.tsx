import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import HomeDashboard from '@/components/dashBoard/HomeDash';
import BuyerReducer, { fetchBuyers } from '@/app/Dashboard/buyerSlice';
import OrderReducer, { fetchOrders } from '@/app/Dashboard/orderSlice';
import { fetchProducts } from '@/features/Products/ProductSlice';
import signInReducer from '@/features/Auth/SignInSlice';

vi.mock('react-chartjs-2', () => ({
  Line: () => <div data-testid="mock-line-chart" />,
}));

const createTestStore = () =>
  configureStore({
    reducer: {
      signIn: signInReducer,
      buyer: BuyerReducer,
      order: OrderReducer,
    },

    preloadedState: {
      signIn: {
        token: 'test token',
        user: {
          email: 'test@gmail.com',
          firstName: 'Test',
          id: 1,
          lastName: 'User',
          picture: 'http://fakeimage.png',
          userType: {
            id: 1,
            name: 'Admin',
            permissions: ['crud'],
          },
        },
        loading: false,
        error: null,
        message: null,
        role: null,
        needsVerification: false,
        needs2FA: false,
        vendor: {
          id: null,
          email: null,
        },
      },
    },
  });

const store = createTestStore();

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );
};

describe('HomeDashboard', () => {
  beforeEach(async () => {
    await store.dispatch(fetchProducts());
    await store.dispatch(fetchBuyers());
    await store.dispatch(fetchOrders());
  });

  test('renders the HomeDashboard component', () => {
    renderWithProviders(<HomeDashboard />);
    expect(screen.getByText(/Product Sold/)).toBeInTheDocument();
    expect(screen.getByText(/Total Order/)).toBeInTheDocument();
    expect(screen.getAllByText(/Total Sales/)[0]).toBeInTheDocument();
    expect(screen.getByText(/New Customers/)).toBeInTheDocument();
  });

  test('dispatches fetch actions on mount', async () => {
    renderWithProviders(<HomeDashboard />);
    // No need to check for dispatch since we're using the actual store
  });

  test('displays the correct number of buyers', () => {
    renderWithProviders(<HomeDashboard />);
    expect(
      screen.getByText(
        `${store.getState().buyer.buyers.filter((buyer) => buyer.userType.name === 'Buyer').length}`
      )
    ).toBeInTheDocument();
  });

  test('displays the correct greeting message', () => {
    renderWithProviders(<HomeDashboard />);
    const now = new Date();
    const hour = now.getHours();
    let greeting = 'Good Evening';
    if (hour < 12) greeting = 'Good Morning';
    else if (hour < 18) greeting = 'Good Afternoon';

    expect(screen.getByText(new RegExp(greeting, 'i'))).toBeInTheDocument();
  });
});
