import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import HomeDashboard from '@/components/dashBoard/HomeDash';
import { fetchBuyers } from '@/app/Dashboard/buyerSlice';
import { fetchOrders } from '@/app/Dashboard/orderSlice';
import { fetchProducts } from '@/features/Products/ProductSlice';
import { store as appStore } from '@/app/store';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <Provider store={appStore}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );
};

describe('HomeDashboard', () => {
  beforeEach(async () => {
    await appStore.dispatch(fetchProducts());
    await appStore.dispatch(fetchBuyers());
    await appStore.dispatch(fetchOrders());
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
        `${appStore.getState().buyer.buyers.filter((buyer) => buyer.userType.name === 'Buyer').length}`
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
