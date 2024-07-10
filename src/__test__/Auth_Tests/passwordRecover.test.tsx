import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import PasswordResetRequestForm from '@/components/password/PasswordResetRequestForm';

const mockStore = configureStore([]);

describe('SignIn Component', () => {
  let store = mockStore({
    passwordRequest: {
      status: 'idle',
      error: null,
    },
  });

  beforeEach(() => {
    store = mockStore({
      passwordRequest: {
        status: 'idle',
        error: null,
      },
    });
  });

  it('renders without crashing', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Router>
          <PasswordResetRequestForm />
        </Router>
      </Provider>
    );

    expect(getByTestId('title')).toHaveTextContent('Forgot Password');
  });

  it('displays error message when email is invalid', async () => {
    const { getByText, findByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <Router>
          <PasswordResetRequestForm />
        </Router>
      </Provider>
    );

    fireEvent.change(getByPlaceholderText('Enter your email'), {
      target: { value: 'notanemail' },
    });
    fireEvent.click(getByText(/Submit/));

    const errorMessage = await findByText('Invalid email format');
    expect(errorMessage).toBeInTheDocument();
  });

  it('submits form with valid email', async () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <Router>
          <PasswordResetRequestForm />
        </Router>
      </Provider>
    );

    fireEvent.change(getByPlaceholderText('Enter your email'), {
      target: { value: 'email@example.com' },
    });
    fireEvent.click(getByText(/Submit/));
  });

  it('renders loading state correctly', () => {
    store = mockStore({
      passwordRequest: {
        status: 'loading',
        error: null,
      },
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <Router>
          <PasswordResetRequestForm />
        </Router>
      </Provider>
    );

    expect(getByTestId('Loading')).toBeInTheDocument();
  });
});
