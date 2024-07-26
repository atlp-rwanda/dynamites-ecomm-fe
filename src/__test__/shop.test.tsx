import React from 'react';
import { describe, it, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import productsReducer, {
  fetchProducts,
  searchProducts,
  fetchRecommendedProducts,
} from '@/features/Products/ProductSlice';
import categoryReducer from '@/features/Products/categorySlice';
import Shop from '@/pages/Shop';
import { AppDispatch, RootState } from '@/app/store';
import signInReducer from '@/features/Auth/SignInSlice';

const mock = new MockAdapter(axios);

const renderWithProviders = (
  ui: React.ReactElement,
  {
    store = configureStore({
      reducer: {
        products: productsReducer,
        categories: categoryReducer,
        signIn: signInReducer,
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

describe('Shop Component', () => {
  beforeEach(() => {
    mock.reset();
    /* eslint-disable class-methods-use-this */
    global.ResizeObserver = class {
      observe() {}

      unobserve() {}

      disconnect() {}
    };
    /* eslint-enable class-methods-use-this */
  });

  it('renders the Shop component correctly', () => {
    renderWithProviders(<Shop />);

    expect(screen.getByText(/Shop/i)).toBeInTheDocument();
  });

  it('fetches and displays products', async () => {
    mock.onGet(`${import.meta.env.VITE_BASE_URL}/search`).reply(200, {
      message: 'success',
      data: [
        {
          id: 1,
          name: 'Product 1',
          shortDesc: 'short desc',
          image: '/product1.jpg',
        },
        {
          id: 2,
          name: 'Product 2',
          shortDesc: 'short desc',
          image: '/product2.jpg',
        },
      ],
    });

    renderWithProviders(<Shop />);

    await waitFor(() => {
      expect(screen.getByText(/Product 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Product 2/i)).toBeInTheDocument();
    });
  });

  it('filters products based on user input', async () => {
    mock.onGet(`${import.meta.env.VITE_BASE_URL}/search`).reply(200, {
      message: 'success',
      data: [
        {
          id: 1,
          name: 'Product 1',
          shortDesc: 'short desc',
          image: '/product1.jpg',
        },
      ],
    });

    renderWithProviders(<Shop />);

    const searchInput = screen.getByPlaceholderText('search');
    fireEvent.change(searchInput, { target: { value: 'Product 1' } });
    fireEvent.keyDown(searchInput, { key: 'Enter' });

    await waitFor(() => {
      expect(screen.getByText(/Product 1/i)).toBeInTheDocument();
      expect(screen.queryByText(/Product 2/i)).not.toBeInTheDocument();
    });
  });

  it('displays the filter section on mobile devices', async () => {
    renderWithProviders(<Shop />);
    const filterBtn = screen.getByTitle('filter');
    fireEvent.click(filterBtn);

    await waitFor(() => {
      expect(screen.getAllByText('Filters')[1]).toBeInTheDocument();
      expect(screen.getAllByText('Clear All')[1]).toBeInTheDocument();
      expect(screen.getAllByText('Categories')[1]).toBeInTheDocument();
      expect(screen.getAllByText('Rating')[1]).toBeInTheDocument();
    });
  });
});

describe('ProductSlice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        products: productsReducer,
      },
    });
    mock.reset();
  });

  it('fetches products successfully', async () => {
    mock.onGet(`${import.meta.env.VITE_BASE_URL}/product`).reply(200, {
      message: 'success',
      data: [
        { id: 1, name: 'Product 1', image: '/product1.jpg' },
        { id: 2, name: 'Product 2', image: '/product2.jpg' },
      ],
    });

    const { dispatch }: { dispatch: AppDispatch } = store;
    await dispatch(fetchProducts());

    const state = (store.getState() as RootState).products;
    expect(state.allProducts).toHaveLength(2);
    expect(state.allProducts[0].name).toBe('Product 1');
  });

  it('searches products based on parameters', async () => {
    mock.onGet(`${import.meta.env.VITE_BASE_URL}/search`).reply(200, {
      message: 'success',
      data: [{ id: 1, name: 'Searched Product', image: '/searched.jpg' }],
      total: 1,
    });

    const { dispatch }: { dispatch: AppDispatch } = store;
    await dispatch(searchProducts({ keyword: 'Searched' }));

    const state = (store.getState() as RootState).products;
    expect(state.allProducts).toHaveLength(1);
    expect(state.allProducts[0].name).toBe('Searched Product');
  });

  it('fetches recommended products', async () => {
    mock
      .onGet(`${import.meta.env.VITE_BASE_URL}/product/recommended`)
      .reply(200, {
        message: 'success',
        data: [
          { id: 1, name: 'Recommended Product 1', image: '/recommended1.jpg' },
          { id: 2, name: 'Recommended Product 2', image: '/recommended2.jpg' },
        ],
      });

    const { dispatch }: { dispatch: AppDispatch } = store;
    await dispatch(fetchRecommendedProducts());

    const state = (store.getState() as RootState).products;
    expect(state.recommendedProducts).toHaveLength(2);
    expect(state.recommendedProducts[0].name).toBe('Recommended Product 1');
  });
});
