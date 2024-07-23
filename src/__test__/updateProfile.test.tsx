import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import UpdateProfile from '@/components/Profile/UpdateProfile';
import profileReducer from '@/features/Profile/ProfileSlice';
import signInReducer from '@/features/Auth/SignInSlice';

const mockStore: any = (preloadedState: any) =>
  configureStore({
    reducer: {
      profile: profileReducer,
      signIn: signInReducer,
    },
    preloadedState,
  });

describe('UpdateProfile component', () => {
  const preloadedState = {
    profile: {
      loading: false,
      error: null,
      success: false,
    },
    signIn: {
      user: {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        picture: 'profile.jpg',
      },
    },
  };

  it('renders the form with initial user data', () => {
    const store = mockStore(preloadedState);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <UpdateProfile />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByLabelText(/First name/i)).toHaveValue('John');
    expect(screen.getByLabelText(/Last name/i)).toHaveValue('Doe');
    expect(screen.getByLabelText(/Email/i)).toHaveValue('john.doe@example.com');
  });

  it('updates the profile on form submission', async () => {
    const store = mockStore(preloadedState);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <UpdateProfile />
        </BrowserRouter>
      </Provider>
    );

    const fnameInput = screen.getByLabelText(/First name/i);
    const lnameInput = screen.getByLabelText(/Last name/i);
    const emailInput = screen.getByLabelText(/Email/i);

    await userEvent.clear(fnameInput);
    await userEvent.type(fnameInput, 'Jane');
    await userEvent.clear(lnameInput);
    await userEvent.type(lnameInput, 'Smith');
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'jane.smith@example.com');

    fireEvent.click(screen.getByText(/Update Profile/i));

    await waitFor(() => {
      expect(store.getState().profile.loading).toBe(true);
    });
  });

  it('shows success message on successful profile update', async () => {
    const successState = {
      ...preloadedState,
      profile: {
        ...preloadedState.profile,
        success: true,
      },
    };
    const store = mockStore(successState);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <UpdateProfile />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('successMessage')).toHaveTextContent(
        'Profile updated successfully!'
      );
    });
  });

  it('shows error message on profile update failure', () => {
    const errorState = {
      ...preloadedState,
      profile: {
        ...preloadedState.profile,
        error: 'Failed to update profile',
      },
    };
    const store = mockStore(errorState);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <UpdateProfile />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('errorMessage')).toHaveTextContent(
      'Error: Failed to update profile'
    );
  });
});
