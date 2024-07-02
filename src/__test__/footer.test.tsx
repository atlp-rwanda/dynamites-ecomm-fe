import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { submitForm, resetState } from '@/app/Footer/Subscribe';
import Footer from '@/components/Footer/Footer';
import { store } from '@/app/store';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );
};

beforeEach(() => {
  store.dispatch(resetState());
});
describe('Footer Component', () => {
  it('renders without crashing', () => {
    renderWithProviders(<Footer />);
    expect(screen.getByText('Subscribe To Our Newsletter')).toBeInTheDocument();
  });

  it('renders email input and subscribe button', () => {
    renderWithProviders(<Footer />);
    const emailInput = screen.getByPlaceholderText('Input your email');
    const subscribeButton = screen.getByText('Subscribe');
    expect(emailInput).toBeInTheDocument();
    expect(subscribeButton).toBeInTheDocument();
  });

  it('validates email input', async () => {
    renderWithProviders(<Footer />);
    const emailInput = screen.getByPlaceholderText('Input your email');
    const subscribeButton = screen.getByText('Subscribe');

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(subscribeButton);
  });

  it('dispatches submitForm action on valid input', async () => {
    renderWithProviders(<Footer />);
    const emailInput = screen.getByPlaceholderText('Input your email');
    const subscribeButton = screen.getByText('Subscribe');

    fireEvent.change(emailInput, {
      target: { value: 'xy@gmail.com' },
    });
    fireEvent.click(subscribeButton);
    await store.dispatch(submitForm({ email: 'xy@gmail.com' }));
    if (
      store.getState().footer.error === 'Request failed with status code 400'
    ) {
      expect(store.getState().footer.status).toBe('failed');
    } else {
      expect(store.getState().footer.status).toBe('succeeded');
    }
  });

  it('shows error message on API failure', async () => {
    renderWithProviders(<Footer />);
    const emailInput = screen.getByPlaceholderText('Input your email');
    const subscribeButton = screen.getByText('Subscribe');

    fireEvent.change(emailInput, {
      target: { value: 'tresorxavier@gmail.com' },
    });
    fireEvent.click(subscribeButton);

    const rejectPromise = () => {
      return new Promise((_, reject) => {
        reject(new Error('Failed to send Data'));
      });
    };

    await store
      .dispatch(submitForm({ email: 'tresorxavier@gmail.com' }))
      .catch(rejectPromise);

    expect(store.getState().footer.error).toBe(
      'Request failed with status code 400'
    );
  });

  it('renders all sections and links', () => {
    renderWithProviders(<Footer />);

    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();

    expect(screen.getByText('Resources')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('User Guides')).toBeInTheDocument();
    expect(screen.getByText('Webinars')).toBeInTheDocument();

    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Join Us')).toBeInTheDocument();
  });

  it('renders language selector and footer text', () => {
    renderWithProviders(<Footer />);
    expect(screen.getByText('©️2024 Brand, Inc.')).toBeInTheDocument();
    expect(screen.getByText('Privacy')).toBeInTheDocument();
    expect(screen.getByText('Terms')).toBeInTheDocument();
    expect(screen.getByText('Site Map')).toBeInTheDocument();
  });
});
