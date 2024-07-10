import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import DashNavbar from '@/components/dashBoard/dashBoardNav';
import signInReducer from '@/features/Auth/SignInSlice';

const createTestStore = () =>
  configureStore({ reducer: { signIn: signInReducer } });

describe('DashNavbar Component', () => {
  it('renders DashNavbar component', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <DashNavbar />
        </MemoryRouter>
      </Provider>
    );

    const logo = screen.getByAltText(/logo/i);
    expect(logo).toBeInTheDocument();

    const title = screen.getByText(/dynamites/i);
    expect(title).toBeInTheDocument();

    const dashboardText = screen.getByText(/dashboard/i);
    expect(dashboardText).toBeInTheDocument();

    const notificationIcon = screen.getByTitle(/notifications/i);
    expect(notificationIcon).toBeInTheDocument();
  });

  it('renders profile options on avatar click', () => {
    const store = configureStore({
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

    render(
      <Provider store={store}>
        <MemoryRouter>
          <DashNavbar />
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

  it('renders Login button when user is not logged in', () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <DashNavbar />
        </MemoryRouter>
      </Provider>
    );

    const loginBtn = screen.getByText(/login/i);
    expect(loginBtn).toBeInTheDocument();
  });
});
