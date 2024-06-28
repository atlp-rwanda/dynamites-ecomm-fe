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
import signInReducer, { twoFactorverify } from '@/features/Auth/SignInSlice';
import TwoFactorAuthForm from '@/pages/TwoFactorAuthForm';

const createTestStore = () =>
  configureStore({ reducer: { signIn: signInReducer } });
let store: any;

const renderTwoFactorAuthForm = () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/verify-2fa']}>
        <Routes>
          <Route path="/verify-2fa" element={<TwoFactorAuthForm />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('2FA Verification Slice', () => {
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
          name: 'Vendor',
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

  it('should handle twoFactorAuth.pending', () => {
    const action = { type: twoFactorverify.pending.type };
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

  it('should handle twoFactorAuth.fulfilled', () => {
    const action = {
      type: twoFactorverify.fulfilled.type,
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
          name: 'Vendor',
          permissions: ['crud'],
        },
      },
      loading: false,
      error: null,
      message: 'Vendor Logged in successfully',
      role: null,
      needsVerification: false,
      needs2FA: false,
      vendor: {
        id: null,
        email: null,
      },
    });
  });

  it('should handle twoFactorAuth.rejected', () => {
    const action = {
      type: twoFactorverify.rejected.type,
      payload: { error: 'Login failed' },
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
});

describe('2FA Verification component', () => {
  beforeEach(() => {
    store = createTestStore();
    renderTwoFactorAuthForm();
  });

  afterEach(() => {
    cleanup();
  });
  it('it should render 2fa-Form', () => {
    expect(screen.getByTestId('form')).toBeInTheDocument();
  });

  it('it should render 6 input Fields', () => {
    expect(screen.getAllByTestId('inputField').length).toEqual(6);
  });

  it('it should render submit button', () => {
    expect(screen.getByText(/submit/)).toBeInTheDocument();
  });
  it('renders the form and allows user to fill out and submit and show Verifying... ', async () => {
    const inputFields = screen.getAllByTestId('inputField');
    const submitButton = screen.getByText(/submit/);

    inputFields.forEach((input) => {
      fireEvent.change(input, { target: { value: 2 } });
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Verifying.../)).toBeInTheDocument();
    });
  });
});
