import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import signInReducer from '@/features/Auth/SignInSlice';
import DashboardSideNav from '@/components/dashBoard/DashboardSideNav';

const createTestStore = () =>
  configureStore({
    reducer: { signIn: signInReducer },

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

const renderDashboardSideNav = () => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <DashboardSideNav />
      </MemoryRouter>
    </Provider>
  );
};

describe('DashboardSideNav', () => {
  it('renders the sidebar items', () => {
    const { getByText } = renderDashboardSideNav();
    expect(getByText('Dashboard')).toBeInTheDocument();
    expect(getByText('Orders')).toBeInTheDocument();
    expect(getByText('Customers')).toBeInTheDocument();
    expect(getByText('Products')).toBeInTheDocument();
  });

  it('expands and collapses the subitems', () => {
    const { getByText, queryByText } = renderDashboardSideNav();
    const productsItem = getByText('Products');
    fireEvent.click(productsItem);
    expect(getByText(/all products/i)).toBeVisible();
    fireEvent.click(productsItem);
    expect(queryByText(/all products/i)).not.toBeInTheDocument();
  });

  it('renders the subitems correctly', async () => {
    const { getByText } = renderDashboardSideNav();
    const productsItem = getByText('Products');
    fireEvent.click(productsItem);
    await waitFor(() => {
      expect(getByText('All Products')).toBeInTheDocument();
      expect(getByText('Categories')).toBeInTheDocument();
    });
  });

  it('handles keydown events for subitems', () => {
    const { getByText, getAllByText } = renderDashboardSideNav();
    const productsItem = getByText('Products');
    fireEvent.keyDown(productsItem, { key: 'Enter' });
    const allProductsElements = getAllByText(/all products/i);
    fireEvent.keyDown(productsItem, { key: ' ' });
    expect(allProductsElements.some((element) => element.offsetWidth > 0)).toBe(
      false
    );
  });

  it('toggles sidebar visibility', () => {
    const { getByLabelText } = renderDashboardSideNav();
    const toggleButton = getByLabelText('Toggle Menu');
    fireEvent.click(toggleButton);
    expect(getByLabelText('Close Menu')).toBeInTheDocument();

    const closeButton = getByLabelText('Close Menu');
    fireEvent.click(closeButton);
    expect(toggleButton).toBeVisible();
  });
});
