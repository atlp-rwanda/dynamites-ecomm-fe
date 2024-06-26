import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import AppRoutes from '@/routes/AppRoutes';

describe('AppRoutes', () => {
  it('renders Home component on / route', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <AppRoutes />
        </MemoryRouter>
      </Provider>
    );
    await screen.findByText(/welcome to home/i);
  });

  it('renders SignUp component on /signup route', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/signup']}>
          <AppRoutes />
        </MemoryRouter>
      </Provider>
    );
    await screen.findAllByLabelText(/first name/i);
  });

  it('renders ErrorPage component on unknown routes', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/unknown-route']}>
          <AppRoutes />
        </MemoryRouter>
      </Provider>
    );
    await screen.findByText(/not found page/i);
  });
});
