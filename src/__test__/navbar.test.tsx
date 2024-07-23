import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import signInReducer from '@/features/Auth/SignInSlice';
import cartReducer from '@/features/Cart/cartSlice';

const createTestStore = () =>
  configureStore({
    reducer: { signIn: signInReducer, cartItems: cartReducer },
  });
let httpMock: MockAdapter;

describe('Navbar Component', () => {
  it('renders Navbar component', () => {
    const store = createTestStore();
    httpMock = new MockAdapter(axios);
    const mockCartItems = [{ id: 1, name: 'Product 1', quantity: 2 }];
    httpMock
      .onGet(`${process.env.VITE_BASE_URL}/cart`)
      .reply(200, { cartItems: mockCartItems });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );

    const logo = screen.getByAltText(/logo/i);
    expect(logo).toBeInTheDocument();

    const title = screen.getByText(/dynamites/i);
    expect(title).toBeInTheDocument();

    const homeLink = screen.getByText(/Home/i);
    expect(homeLink).toBeInTheDocument();

    const shopLink = screen.getByText(/Shop/i);
    expect(shopLink).toBeInTheDocument();

    const aboutLink = screen.getByText(/About us/i);
    expect(aboutLink).toBeInTheDocument();

    const contactLink = screen.getAllByText(/Contact/i)[0];
    expect(contactLink).toBeInTheDocument();

    const cartIcon = screen.getByTitle('cart');
    expect(cartIcon).toBeInTheDocument();

    const loginBtn = screen.getByText('Login');
    expect(loginBtn).toBeInTheDocument();

    // const avatar = screen.getByAltText(/profile/i);
    // expect(avatar).toBeInTheDocument();

    // const username = screen.getByText(/amanda green/i);
    // expect(username).toBeInTheDocument();
  });

  it('highlights the correct navigation link based on the current route', () => {
    const store = createTestStore();
    httpMock = new MockAdapter(axios);
    const mockCartItems = [{ id: 1, name: 'Product 1', quantity: 2 }];
    httpMock
      .onGet(`${process.env.VITE_BASE_URL}/cart`)
      .reply(200, { cartItems: mockCartItems });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/shop']}>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Shop')).toHaveClass(
      'border-b-[2px] border-primary text-primary'
    );
  });

  it('toggles menu on hamburger icon click', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );

    const hamburgerIcon = screen.getByTitle('hamburger');
    fireEvent.click(hamburgerIcon);

    expect(screen.getAllByText(/home/i)[0]).toBeInTheDocument();
  });

  it('renders links with correct paths', () => {
    const store = createTestStore();
    httpMock = new MockAdapter(axios);
    const mockCartItems = [{ id: 1, name: 'Product 1', quantity: 2 }];
    httpMock
      .onGet(`${process.env.VITE_BASE_URL}/cart`)
      .reply(200, { cartItems: mockCartItems });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );

    const homeLink = screen.getByText(/home/i);
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');

    const shopLink = screen.getByText(/shop/i);
    expect(shopLink.closest('a')).toHaveAttribute('href', '/shop');

    const aboutLink = screen.getByText(/about us/i);
    expect(aboutLink.closest('a')).toHaveAttribute('href', '/about');

    const contactLink = screen.getAllByText(/contact/i)[0];
    expect(contactLink.closest('a')).toHaveAttribute('href', '/contact');
  });

  it('displays cart item count', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );

    const cartCount = screen.getByText(/0/i);
    expect(cartCount).toBeInTheDocument();
  });

  it('renders profile options on avatar click', () => {
    const store = configureStore({
      reducer: { signIn: signInReducer, cartItems: cartReducer },
      preloadedState: {
        signIn: {
          token: 'test token',
          user: {
            email: 'test@gmail.com',
            firstName: 'Test',
            id: 1,
            lastName: 'Test',
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
        cartItems: {
          cartItems: [],
          loading: false,
          error: null,
        },
      },
    });
    httpMock = new MockAdapter(axios);
    const mockCartItems = [{ id: 1, name: 'Product 1', quantity: 2 }];
    httpMock
      .onGet(`${process.env.VITE_BASE_URL}/cart`)
      .reply(200, { cartItems: mockCartItems });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );

    const profileIcon = screen.getByTitle('toggleProfile');
    fireEvent.click(profileIcon);

    const editProfileOption = screen.getByText(/edit profile/i);
    expect(editProfileOption).toBeInTheDocument();

    const preferencesOption = screen.getByText(/preferences/i);
    expect(preferencesOption).toBeInTheDocument();

    const nightModeOption = screen.getByText(/night mode/i);
    expect(nightModeOption).toBeInTheDocument();

    const helpCenterOption = screen.getByText(/help center/i);
    expect(helpCenterOption).toBeInTheDocument();

    const signOutOption = screen.getByText(/sign out/i);
    expect(signOutOption).toBeInTheDocument();
  });
});
