import { describe, it, expect, beforeEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Store, configureStore } from '@reduxjs/toolkit';
import { waitFor } from '@testing-library/dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router';
import productsReducer, {
  fetchProductDetails,
} from '@/features/Products/ProductSlice';
import signInReducer, { SignInState } from '@/features/Auth/SignInSlice';
import { AppDispatch, RootState } from '@/app/store';
import ProductDetails from '@/pages/ProductDetails';
import bestSellingReducer from '@/features/Popular/bestSellingProductSlice';

const mockProduct = {
  id: 1,
  name: 'Mock Product',
  image: '/images/mock-product.jpg',
  rating: 4.5,
  salesPrice: 99.99,
  regularPrice: 149.99,
  totalQtySold: 25,
  longDesc: 'This is a mock product used for testing purposes.',
  shortDesc: 'This is a short description',
  category: {
    id: 5,
    name: 'Electronics',
  },
  similarProducts: [
    {
      id: 3,
      name: 'Mock Similar Product',
      image: '/images/mock.png',
      averageRating: 0,
      salesPrice: 100,
      regularPrice: 200,
      longDesc: 'This is a mock product used for testing purposes.',
      shortDesc: 'This is a short description',
    },
  ],
  reviews: [
    {
      id: 1,
      user: {
        id: 1,
        firstName: 'new',
        lastName: 'user',
        picture: 'http://fake.png',
      },
      rating: 5,
      content: 'excellent product',
    },
  ],
  gallery: [],
  tags: ['testTag'],
  vendor: {
    firstName: 'Tester',
    lastName: 'Testing',
    email: 'testervendor@gmail.com',
    picture: 'https://fake.png',
  },
};

const renderWithProviders = (
  ui: React.ReactElement,
  {
    store = configureStore({
      reducer: {
        products: productsReducer,
        bestSellingProducts: bestSellingReducer,
        signIn: signInReducer,
      },
      preloadedState: {
        signIn: {
          token: 'fake token',
          user: null,
          role: null,
          loading: null,
          error: null,
          message: null,
          needsVerification: false,
          needs2FA: false,
          vendor: {
            id: null,
            email: null,
          },
        } as unknown as SignInState,
      },
    }),
  } = {}
) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/product-details/1']}>
        <Routes>
          <Route path="/product-details/:id" element={ui} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('ProductDetails Page', () => {
  let mock: MockAdapter;
  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  it('renders the ProductDetails page correctly', () => {
    mock.onGet(`${import.meta.env.VITE_BASE_URL}/product/1`).reply(500);

    renderWithProviders(<ProductDetails />);

    expect(screen.getByText(/Product Details/i)).toBeInTheDocument();
  });

  it('fetches and displays product details', async () => {
    mock
      .onGet(`${import.meta.env.VITE_BASE_URL}/buyer/get_product/1`)
      .reply(200, {
        product: mockProduct,
      });

    renderWithProviders(<ProductDetails />);

    await waitFor(() => {
      expect(screen.getAllByText(/Mock Product/i)[0]).toBeInTheDocument();
      expect(screen.getByText(/testTag/i)).toBeInTheDocument();
      expect(screen.getByText(/\$99.99/i)).toBeInTheDocument();
      expect(screen.getByText(/\$149.99/i)).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('25')).toBeInTheDocument();
      expect(screen.getByText('33% Off')).toBeInTheDocument();
      expect(screen.getByText('Add to Cart')).toBeInTheDocument();
      expect(screen.getByText('Add to wishlist')).toBeInTheDocument();
      // expect(screen.getAllByTestId('ratingStar').length).toBe(4);
      // expect(screen.getAllByTestId('halfStar').length).toBe(1);

      expect(
        screen.getByText(/This is a mock product used for testing purposes./i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/This is a short description/i)
      ).toBeInTheDocument();
    });
  });

  it('shows error message on failed fetch', async () => {
    mock.onGet(`${import.meta.env.VITE_BASE_URL}/product/1`).reply(500, {
      message: 'Internal Server Error',
    });

    renderWithProviders(<ProductDetails />);

    await waitFor(() => {
      expect(
        screen.getByText(/Failed to load product details/i)
      ).toBeInTheDocument();
    });
  });

  it('should display similar products', async () => {
    mock
      .onGet(`${import.meta.env.VITE_BASE_URL}/buyer/get_product/1`)
      .reply(200, { product: mockProduct });

    renderWithProviders(<ProductDetails />);

    await waitFor(() => {
      expect(screen.getByText('Mock Similar Prod...')).toBeInTheDocument();
      expect(screen.getByText('$100')).toBeInTheDocument();
      expect(screen.getByText('50% Off')).toBeInTheDocument();
    });
  });

  it('should display product details, reviews, about store', async () => {
    mock
      .onGet(`${import.meta.env.VITE_BASE_URL}/buyer/get_product/1`)
      .reply(200, { product: mockProduct });

    renderWithProviders(<ProductDetails />);

    await waitFor(() => {
      expect(screen.getByText('Product Details')).toBeInTheDocument();
      expect(
        screen.getByText('This is a mock product used for testing purposes.')
      ).toBeInTheDocument();
      expect(
        screen.getByText('This is a short description')
      ).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: 'Reviews (1)' }));

    await waitFor(() => {
      expect(screen.getByText('new user')).toBeInTheDocument();
      expect(screen.getByText('excellent product')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: 'About Store' }));

    await waitFor(() => {
      expect(screen.getAllByText('Tester Testing')[0]).toBeInTheDocument();
      expect(
        screen.getAllByText('testervendor@gmail.com')[0]
      ).toBeInTheDocument();
    });
  });

  it('should display error message when no reviews are found', async () => {
    mock
      .onGet(`${import.meta.env.VITE_BASE_URL}/buyer/get_product/1`)
      .reply(200, { product: { ...mockProduct, reviews: [] } });

    renderWithProviders(<ProductDetails />);

    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Reviews (0)' }));
    });

    await waitFor(() => {
      expect(screen.getByText('No reviews found')).toBeInTheDocument();
    });
  });

  it('should submit a review successfully', async () => {
    mock
      .onGet(`${import.meta.env.VITE_BASE_URL}/buyer/get_product/1`)
      .reply(200, { product: mockProduct });

    mock
      .onPost(`${import.meta.env.VITE_BASE_URL}/review`)
      .reply(200, { message: 'Review submitted successfully' });

    renderWithProviders(<ProductDetails />);

    mock
      .onGet(`${import.meta.env.VITE_BASE_URL}/buyer/get_product/1`)
      .reply(200, {
        product: {
          ...mockProduct,
          reviews: [
            {
              id: 1,
              user: {
                id: 1,
                firstName: 'new',
                lastName: 'rating',
                picture: 'http://fake.png',
              },
              rating: 1,
              content: 'this is a bad product',
            },
          ],
        },
      });

    await waitFor(() => {
      const star = screen.getAllByTitle('inputStar')[0];
      fireEvent.click(star);
      const contentTextArea = screen.getByTitle('inputContent');
      fireEvent.change(contentTextArea, {
        target: {
          value: 'this is a bad product',
        },
      });
    });

    await waitFor(() => {
      const submitBtn = screen.getByText('Submit');
      fireEvent.click(submitBtn);
    });

    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Reviews (1)' }));
    });

    await waitFor(() => {
      expect(screen.getByText('this is a bad product')).toBeInTheDocument();
      expect(screen.getByText('new rating')).toBeInTheDocument();
    });
  });
});

describe('Product Details async action', () => {
  let store: Store;
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    store = configureStore({
      reducer: {
        products: productsReducer,
      },
    });
  });

  it('should handle fetchProductDetails.fulfilled', async () => {
    mock
      .onGet(`${import.meta.env.VITE_BASE_URL}/buyer/get_product/1`)
      .reply(200, {
        product: mockProduct,
      });

    const { dispatch }: { dispatch: AppDispatch } = store;
    await dispatch(fetchProductDetails(1));
    const state = (store.getState() as RootState).products;
    expect(state.productDetailsLoading).toBe(false);
    expect(state.productDetails).toEqual(mockProduct);
  });

  it('should handle fetchProductDetails.rejected', async () => {
    mock
      .onGet(`${import.meta.env.VITE_BASE_URL}/buyer/get_product/1`)
      .reply(500);

    const { dispatch }: { dispatch: AppDispatch } = store;
    await dispatch(fetchProductDetails(1));
    const state = (store.getState() as RootState).products;
    expect(state.productDetailsLoading).toBe(false);
    expect(state.productDetails).toBeNull();
  });
});
