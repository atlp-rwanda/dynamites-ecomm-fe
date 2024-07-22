import React from 'react';
import { describe, it, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import productReducer, {
  fetchWishlistProducts,
  addToWishlist,
  removeFromWishlist,
} from '@/features/Products/ProductSlice';
import categoryReducer from '@/features/Products/categorySlice';
import signInReducer from '@/features/Auth/SignInSlice';
import WishlistCard from '@/components/WishlistCard';
import Wishlist from '@/pages/Wishlist';
import { AppDispatch, RootState } from '@/app/store';
import { Product } from '@/types/Product';

const mock = new MockAdapter(axios);

const renderWithProviders = (
  ui: React.ReactElement,
  {
    store = configureStore({
      reducer: {
        products: productReducer,
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

const product = {
  id: 1,
  name: 'Product name',
  shortDesc: 'Short description',
  salesPrice: 230,
  regularPrice: 280,
  averageRating: 4.7,
  image: 'path_to_image',
  gallery: ['path_to_image', 'path_to_image'],
  category: {
    id: 1,
    name: 'Category name',
    description: 'Category description',
  },
  longDesc: 'Long description',
  quantity: 10,
  tags: ['tag1', 'tag2'],
  type: 'Simple',
  isAvailable: true,
  isFeatured: true,
  reviews: [],
  vendor: {
    id: 1,
    firstName: 'Vendor',
    lastName: 'Name',
    email: 'example@gmail.com',
    password: 'hashed_password',
    userType: {
      id: 1,
      name: 'Vendor',
      permissions: ['manage_products', 'view_orders'],
    },
    orders: [],
    googleId: '',
    facebookId: '',
    picture: 'path_to_picture',
    provider: 'local',
    isVerified: true,
    status: 'active',
  },
} as Product;

describe('Wishlist async actions', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        products: productReducer,
      },
    });
    mock.reset();
  });

  it('fetches wishlist products', async () => {
    const products = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
    ];
    mock
      .onGet(`${import.meta.env.VITE_BASE_URL}/buyer/getOneWishlist`)
      .reply(200, {
        data: { product: products },
      });

    const { dispatch }: { dispatch: AppDispatch } = store;
    await dispatch(fetchWishlistProducts('token'));

    const state = (store.getState() as RootState).products;
    expect(state.wishlistProducts).toEqual(products);
  });

  it('adds a product to the wishlist', async () => {
    const products = [{ id: 1, name: 'Product 1' }];
    mock
      .onPost(`${import.meta.env.VITE_BASE_URL}/buyer/addItemToWishlist`)
      .reply(200, {
        data: { product: products },
      });

    const { dispatch }: { dispatch: AppDispatch } = store;
    await dispatch(addToWishlist({ id: 1, token: 'token' }));

    const state = (store.getState() as RootState).products;
    expect(state.wishlistProducts).toEqual(products);
  });

  it('removes a product from the wishlist', async () => {
    mock
      .onDelete(`${import.meta.env.VITE_BASE_URL}/buyer/removeToWishlist`)
      .reply(200, {
        data: { product: [] },
      });

    const { dispatch }: { dispatch: AppDispatch } = store;
    await dispatch(removeFromWishlist({ id: 1, token: 'token' }));

    const state = (store.getState() as RootState).products;
    expect(state.wishlistProducts).toEqual([]);
  });
});

describe('WishlistCard', () => {
  it('renders the wishlist card', () => {
    renderWithProviders(<WishlistCard product={product} />);

    expect(screen.getByText(/Product name/i)).toBeInTheDocument();
    expect(screen.getByText(/In Stock/i)).toBeInTheDocument();
    expect(screen.getByText(/\$230/i)).toBeInTheDocument();
    expect(screen.getByText(/\$280/i)).toBeInTheDocument();
  });
});

describe('Wishlist Page', () => {
  it('renders wishlist products', async () => {
    const products = [product];

    mock
      .onGet(`${import.meta.env.VITE_BASE_URL}/buyer/getOneWishlist`)
      .reply(200, {
        data: { product: products },
      });

    renderWithProviders(<Wishlist />);

    await waitFor(() => {
      expect(screen.getByText(/My Wishlist/i)).toBeInTheDocument();
      expect(screen.getByText(/Product name/i)).toBeInTheDocument();
    });
  });

  it('shows no products message when wishlist is empty', async () => {
    mock
      .onGet(`${import.meta.env.VITE_BASE_URL}/buyer/getOneWishlist`)
      .reply(200, {
        data: { product: [] },
      });

    renderWithProviders(<Wishlist />);

    await waitFor(() => {
      expect(
        screen.getByText(/You currently have no products in your wishlist/i)
      ).toBeInTheDocument();
    });
  });
});
