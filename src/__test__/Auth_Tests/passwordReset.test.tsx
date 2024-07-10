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
import ResetPasswordForm from '@/components/password/PasswordResetForm';
import { passwordResetReducer } from '@/features/Auth/password';

const createTestStore = () =>
  configureStore({
    reducer: {
      passwordReset: passwordResetReducer,
    },
  });
let store: ReturnType<typeof createTestStore>;

const renderForm = () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/forgot-password']}>
        <Routes>
          <Route path="/forgot-password" element={<ResetPasswordForm />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('reset form', () => {
  beforeEach(() => {
    store = createTestStore();
  });

  vi.mock('jwt-decode', () => ({
    jwtDecode: () => ({
      user: {
        userType: {
          name: 'Admin',
        },
      },
    }),
  }));

  it('should handle initial state', () => {
    const { passwordReset } = store.getState();
    expect(passwordReset).toEqual({
      status: 'idle',
      error: null,
    });
  });
});

describe('SignIn Component', () => {
  beforeEach(() => {
    store = createTestStore();
    renderForm();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders SignIn Title', () => {
    expect(screen.getByTestId('title')).toBeInTheDocument();
  });

  it('renders new password Field', () => {
    expect(
      screen.getByPlaceholderText('Enter new password')
    ).toBeInTheDocument();
  });

  it('renders confirm password Field', () => {
    expect(
      screen.getByPlaceholderText('Confirm new password')
    ).toBeInTheDocument();
  });

  it('renders the form and allows user to fill out and submit', async () => {
    const passwordInput = screen.getByPlaceholderText('Enter new password');
    const passwordConfirm = screen.getByPlaceholderText('Confirm new password');
    const submitButton = screen.getByText(/Submit/);

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(passwordConfirm, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId('Loading')).toBeInTheDocument();
    });
  });
  it('displays error messages for invalid input', async () => {
    const passwordInput = screen.getByPlaceholderText('Enter new password');
    const passwordConfirm = screen.getByPlaceholderText('Confirm new password');
    const submitButton = screen.getByText(/Submit/);

    fireEvent.change(passwordInput, { target: { value: '123' } });
    fireEvent.change(passwordConfirm, { target: { value: '123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Password must be at least 8 characters/i)
      ).toBeInTheDocument();
    });
  });
  it('displays error messages for unmatching passwords', async () => {
    const passwordInput = screen.getByPlaceholderText('Enter new password');
    const passwordConfirm = screen.getByPlaceholderText('Confirm new password');
    const submitButton = screen.getByText(/Submit/);

    fireEvent.change(passwordInput, { target: { value: 'NewPassword@123' } });
    fireEvent.change(passwordConfirm, { target: { value: 'NewPassword@124' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Passwords must match/i)).toBeInTheDocument();
    });
  });
  it('displays error messages for confirm password missing', async () => {
    const passwordInput = screen.getByPlaceholderText('Enter new password');
    const submitButton = screen.getByText(/Submit/);

    fireEvent.change(passwordInput, { target: { value: 'NewPassword@123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Confirm Password is required/i)
      ).toBeInTheDocument();
    });
  });
  it('submits the form successfully', async () => {
    const passwordInput = screen.getByPlaceholderText('Enter new password');
    const passwordConfirm = screen.getByPlaceholderText('Confirm new password');
    const submitButton = screen.getByText(/Submit/);

    fireEvent.change(passwordInput, { target: { value: 'NewPassword@123' } });
    fireEvent.change(passwordConfirm, { target: { value: 'NewPassword@123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
    });
  });
});
