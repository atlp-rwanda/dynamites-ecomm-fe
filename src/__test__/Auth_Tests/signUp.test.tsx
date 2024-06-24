import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import signUpReducer, {
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  setUserType,
} from '@/features/Auth/SignUpSlice';
import { store } from '@/app/store';
import SignUp from '@/pages/SignUp';
import HSButton from '@/components/form/HSButton';

const renderSignUp = () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/signup']}>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('signUpSlice', () => {
  beforeEach(() => {
    configureStore({ reducer: { signUp: signUpReducer } });
  });

  it('should handle initial state', () => {
    const { signUp } = store.getState();
    expect(signUp).toEqual({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      userType: 'buyer',
      loading: false,
      error: null,
    });
  });

  it('should handle setFirstName', () => {
    store.dispatch(setFirstName('John'));
    const { signUp } = store.getState();
    expect(signUp.firstName).toEqual('John');
  });

  it('should handle setLastName', () => {
    store.dispatch(setLastName('Doe'));
    const { signUp } = store.getState();
    expect(signUp.lastName).toEqual('Doe');
  });

  it('should handle setEmail', () => {
    store.dispatch(setEmail('john.doe@example.com'));
    const { signUp } = store.getState();
    expect(signUp.email).toEqual('john.doe@example.com');
  });

  it('should handle setPassword', () => {
    store.dispatch(setPassword('password123'));
    const { signUp } = store.getState();
    expect(signUp.password).toEqual('password123');
  });

  it('should handle setUserType', () => {
    store.dispatch(setUserType('vendor'));
    const { signUp } = store.getState();
    expect(signUp.userType).toEqual('vendor');
  });
});

describe('HSButton', () => {
  beforeEach(() => {
    renderSignUp();
  });

  it('renders the button with the correct title', async () => {
    render(<HSButton title="Test Button" />);
    expect(await screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('calls the onClick handler when clicked', async () => {
    let handleClickCalled = false;
    const handleClick = () => {
      handleClickCalled = true;
    };
    render(<HSButton title="Test Button" onClick={handleClick} />);
    fireEvent.click(await screen.getByText('Test Button'));
    expect(handleClickCalled).toBe(true);
  });
});

describe('SignUp', () => {
  beforeEach(() => {
    renderSignUp();
  });

  it('submits the form with user details', async () => {
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/enter your email/i);
    const passwordInput = screen.getByLabelText(/enter your password/i);
    const confirmPasswordInput = screen.getByLabelText(
      /confirm your password/i
    );
    const userTypeBuyer = screen.getByLabelText('I am a customer');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'testpassword' },
    });
    fireEvent.click(userTypeBuyer);
  });

  it('allows user to fill out and submit the form', async () => {
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/enter your email/i);
    const passwordInput = screen.getByLabelText(/enter your password/i);
    const confirmPasswordInput = screen.getByLabelText(
      /confirm your password/i
    );
    const userTypeBuyer = screen.getByLabelText(/i am a customer/i);
    const agreeCheckbox = screen.getByLabelText(
      /by signing up, i agree with the terms of use & privacy policy\./i
    );

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Test@1234' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Test@1234' } });
    fireEvent.click(userTypeBuyer);
    fireEvent.click(agreeCheckbox);

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
    });
  });

  it('does not submit the form with incomplete or invalid user details', async () => {
    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    expect(screen.getByText('First Name is required')).toBeInTheDocument();
    expect(screen.getByText('Last Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
    expect(
      screen.getByText('Confirm Password is required')
    ).toBeInTheDocument();
  });

  it('submits the form successfully', async () => {
    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByLabelText(/enter your email/i), {
      target: { value: 'johndoe@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/enter your password/i), {
      target: { value: 'securepassword' },
    });
    fireEvent.change(screen.getByLabelText(/confirm your password/i), {
      target: { value: 'securepassword' },
    });
    fireEvent.click(screen.getByLabelText(/i am a customer/i));
    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
  });
});
