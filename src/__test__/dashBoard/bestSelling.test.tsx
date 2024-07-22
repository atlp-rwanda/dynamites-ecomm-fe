import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ProductTable from '@/components/dashBoard/BestSellingProducts';
import signInReducer from '@/features/Auth/SignInSlice';

describe('ProductTable', () => {
  it('renders without crashing', () => {
    const store = configureStore({
      reducer: {
        signIn: signInReducer,
      },
    });

    render(
      <Provider store={store}>
        <ProductTable />
      </Provider>
    );
  });

  it('displays best selling products after successful API call', async () => {
    const store = configureStore({
      reducer: {
        signIn: signInReducer,
      },
    });

    render(
      <Provider store={store}>
        <ProductTable />
      </Provider>
    );

    await screen.findByText('Best selling Products');
  });
});
