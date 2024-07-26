import axios from 'axios';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { render, screen, waitFor } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import Seller from '@/pages/Seller';
import productReducer from '@/app/Dashboard/AllProductSlices';
import buyerSlice, { fetchBuyers } from '@/app/Dashboard/buyerSlice';

const mock = new MockAdapter(axios);

const mockBuyers = [
  {
    id: 1,
    firstName: 'Vendor1',
    lastName: 'Last1',
    email: 'vendor1@example.com',
    userType: { id: '1', name: 'Vendor', permissions: [] },
    googleId: null,
    facebookId: null,
    picture: '',
    provider: null,
    isVerified: false,
    status: 'active',
    twoFactorCode: null,
    updatedAt: '',
    password: '',
  },
  {
    id: 2,
    firstName: 'Customer1',
    lastName: 'Last2',
    email: 'customer1@example.com',
    userType: { id: '2', name: 'Customer', permissions: [] },
    googleId: null,
    facebookId: null,
    picture: '',
    provider: null,
    isVerified: false,
    status: 'inactive',
    twoFactorCode: null,
    updatedAt: '',
    password: '',
  },
];

const renderWithProviders = (
  ui: React.ReactElement,
  {
    store = configureStore({
      reducer: {
        products: productReducer,
        buyer: buyerSlice,
      },
    }),
  } = {}
) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );
};

describe('Seller Component', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        products: productReducer,
        buyer: buyerSlice,
      },
    });
    mock.reset();
  });

  it('renders the component', () => {
    renderWithProviders(<Seller />);
    expect(screen.getByText('Sellers')).toBeInTheDocument();
  });

  it('should display elements of the table', async () => {
    mock
      .onGet(`${import.meta.env.VITE_BASE_URL}/user/getAllUsers`)
      .reply(200, { users: mockBuyers });

    renderWithProviders(<Seller />);
    await store.dispatch(fetchBuyers() as any);

    await waitFor(() => {
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Items')).toBeInTheDocument();
      expect(screen.getByText('Date')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
      expect(screen.getByText('Action')).toBeInTheDocument();
    });
  });

  it('should handle loading state', async () => {
    mock
      .onGet(`${import.meta.env.VITE_BASE_URL}/user/getAllUsers`)
      .reply(200, { users: mockBuyers });

    renderWithProviders(<Seller />);

    expect(screen.queryByRole('status')).toBeNull();
    await store.dispatch(fetchBuyers() as any);

    expect(screen.queryByRole('status')).toBeNull();
  });

  it('should handle empty vendor list', async () => {
    mock
      .onGet(`${import.meta.env.VITE_BASE_URL}/user/getAllUsers`)
      .reply(200, { users: [] });

    renderWithProviders(<Seller />);
    await store.dispatch(fetchBuyers() as any);

    await waitFor(() => {
      expect(screen.queryByText('Vendor1')).toBeNull();
      expect(screen.queryByText('Customer1')).toBeNull();
    });
  });
});
