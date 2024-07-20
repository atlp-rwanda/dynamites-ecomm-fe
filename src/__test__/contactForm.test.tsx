import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import ContactForm from '@/components/Contact/ContactForm';
import contactReducer, { sendMessage } from '@/features/contact/contactSlice';

// Mock the contactSlice module
vi.mock('@/features/contact/contactSlice', async (importOriginal) => {
  const actual: any = await importOriginal();
  return {
    __esModule: true,
    ...actual,
    sendMessage: vi.fn(),
    resetStatus: vi.fn(),
  };
});

// Create a mock Redux store with initial state
const store = configureStore({
  reducer: {
    contact: contactReducer,
  },
});

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Clear mocks before each test
  });

  it('should render the contact form fields correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ContactForm />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter your phone Number')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter your message here ...')
    ).toBeInTheDocument();
  });

  it('should submit form and call sendMessage action', async () => {
    // Mock sendMessage to resolve immediately
    const mockPayload = {
      name: 'John Doe',
      phoneNumber: '1234567890',
      email: 'john@example.com',
      message: 'Hello!',
    };

    const mockResolvedValue = {
      type: 'contact/sendMessage/fulfilled',
      payload: mockPayload,
      meta: {
        arg: mockPayload,
        requestId: 'some-request-id',
        requestStatus: 'fulfilled',
      },
      error: null,
    };

    vi.mocked(sendMessage).mockResolvedValue(mockResolvedValue as any); // Cast to any to satisfy type

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ContactForm />
        </MemoryRouter>
      </Provider>
    );

    // Fill out the form fields
    fireEvent.change(screen.getByPlaceholderText('Enter your name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your phone Number'), {
      target: { value: '1234567890' },
    });
    fireEvent.change(
      screen.getByPlaceholderText('Enter your message here ...'),
      {
        target: { value: 'Hello!' },
      }
    );

    // Submit the form
    fireEvent.click(screen.getByText('Send Message'));

    await waitFor(() => {
      expect(vi.mocked(sendMessage).mock.calls[0][0]).toEqual(mockPayload);
    });
  });
});
