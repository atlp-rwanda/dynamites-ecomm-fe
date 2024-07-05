import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import signInReducer, { loginUser, logout } from '@/features/Auth/SignInSlice';
import SignIn from '@/pages/SignIn';

const createTestStore = () =>
  configureStore({ reducer: { signIn: signInReducer } });
let store: any;

const renderSignIn = () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/signin']}>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('signInSlice', () => {
  beforeEach(() => {
    store = createTestStore();
  });

  vi.mock('jwt-decode', () => ({
    jwtDecode: () => ({
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
    }),
  }));

  it('should handle initial state', () => {
    const { signIn } = store.getState();
    expect(signIn).toEqual({
      token: null,
      user: null,
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
    });
  });

  it('should handle loginUser.pending', () => {
    const action = { type: loginUser.pending.type };
    const state = signInReducer(undefined, action);
    expect(state).toEqual({
      token: null,
      user: null,
      loading: true,
      error: null,
      message: null,
      role: null,
      needsVerification: false,
      needs2FA: false,
      vendor: {
        id: null,
        email: null,
      },
    });
  });

  it('should handle loginUser.fulfilled', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: { token: 'testToken', message: 'Login successful' },
    };
    const state = signInReducer(undefined, action);
    expect(state).toEqual({
      token: 'testToken',
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
      message: 'Login successful',
      role: 'Admin',
      needsVerification: false,
      needs2FA: false,
      vendor: {
        id: null,
        email: null,
      },
    });
  });

  it('should handle loginUser.rejected', () => {
    const action = {
      type: loginUser.rejected.type,
      payload: { message: 'Login failed' },
    };
    const state = signInReducer(undefined, action);
    expect(state).toEqual({
      token: null,
      user: null,
      loading: false,
      error: 'Login failed',
      message: null,
      role: null,
      needsVerification: false,
      needs2FA: false,
      vendor: {
        id: null,
        email: null,
      },
    });
  });

  it('should handle logout', () => {
    const initialState = {
      token: 'testToken',
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
      message: 'Logout Successfully',
      role: 'Admin',
      needsVerification: false,
      needs2FA: false,
      vendor: {
        id: null,
        email: null,
      },
    };
    const action = { type: logout.type };
    const state = signInReducer(initialState, action);
    expect(state).toEqual({
      token: null,
      user: null,
      loading: false,
      error: null,
      message: 'Logout Successfully',
      role: null,
      needsVerification: false,
      needs2FA: false,
      vendor: {
        id: null,
        email: null,
      },
    });
  });
});

describe('SignIn Component', () => {
  beforeEach(() => {
    store = createTestStore();
    renderSignIn();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders SignIn Title', () => {
    expect(screen.getByTestId('title')).toBeInTheDocument();
  });

  it('renders Email Input Field', () => {
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
  });

  it('renders Password Input Field', () => {
    expect(
      screen.getByPlaceholderText('Enter your password')
    ).toBeInTheDocument();
  });

  it('renders the form and allows user to fill out and submit', async () => {
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const submitButton = screen.getByText(/Sign In/);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId('Loading')).toBeInTheDocument();
    });
  });
  it('displays error messages for invalid input', async () => {
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const submitButton = screen.getByText(/Sign In/);

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Invalid email format/i)).toBeInTheDocument();
      expect(
        screen.getByText(/password must contain at least 6 chars/i)
      ).toBeInTheDocument();
    });
  });

  it('does not submit the form with incomplete user details', async () => {
    const submitButton = screen.getByText(/Sign In/);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  it('submits the form successfully', async () => {
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.submit(screen.getByTestId('form'));

    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
    });
  });
});
