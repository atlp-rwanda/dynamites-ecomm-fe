import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import ContactForm from '@/components/Contact/ContactForm';
import { sendMessage, resetStatus } from '@/features/contact/contactSlice';

// Mock the sendMessage and resetStatus actions
vi.mock('@/features/contact/contactSlice', () => ({
  sendMessage: vi.fn(),
  resetStatus: vi.fn(),
}));

const mockStore = (state: any) => {
  return {
    getState: () => state,
    dispatch: vi.fn(),
    subscribe: vi.fn(),
  };
};

describe('ContactForm', () => {
  // Test ContactForm component
  describe('ContactForm', () => {
    it('should render ContactForm component with all fields and buttons', () => {
      render(
        <Provider
          store={mockStore({
            contact: { loading: false, error: null, success: false },
          })}
        >
          <ContactForm />
        </Provider>
      );
      expect(screen.getByText('Contact Us')).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText('Enter your name')
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText('Enter your email')
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText('Enter your phone Number')
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText('Enter your message here ...')
      ).toBeInTheDocument();
      expect(screen.getByText('Send Message')).toBeInTheDocument();
    });

    it('should show validation errors when form fields are empty and form is submitted', async () => {
      render(
        <Provider
          store={mockStore({
            contact: { loading: false, error: null, success: false },
          })}
        >
          <ContactForm />
        </Provider>
      );

      fireEvent.click(screen.getByText('Send Message'));

      expect(await screen.findByText('Name is required!')).toBeInTheDocument();
      expect(await screen.findByText('Email is required!')).toBeInTheDocument();
      expect(
        await screen.findByText('Message is required!')
      ).toBeInTheDocument();
      expect(
        await screen.findByText('Phone number is required!')
      ).toBeInTheDocument();
    });

    it('should dispatch sendMessage action with correct values on form submit', async () => {
      const mockSendMessage = sendMessage as vi.Mock;
      mockSendMessage.mockResolvedValueOnce({});

      render(
        <Provider
          store={mockStore({
            contact: { loading: false, error: null, success: false },
          })}
        >
          <ContactForm />
        </Provider>
      );

      // Fill in the form
      fireEvent.change(screen.getByPlaceholderText('Enter your name'), {
        target: { value: 'John Doe' },
      });
      fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
        target: { value: 'john.doe@example.com' },
      });
      fireEvent.change(screen.getByPlaceholderText('Enter your phone Number'), {
        target: { value: '123-456-7890' },
      });
      fireEvent.change(
        screen.getByPlaceholderText('Enter your message here ...'),
        { target: { value: 'This is a test message.' } }
      );

      fireEvent.click(screen.getByText('Send Message'));

      await waitFor(() => {
        expect(mockSendMessage).toHaveBeenCalledWith({
          name: 'John Doe',
          phoneNumber: '123-456-7890',
          email: 'john.doe@example.com',
          message: 'This is a test message.',
        });
      });
    });

    it('should show success message and reset the form when submission is successful', async () => {
      const mockSendMessage = sendMessage as vi.Mock;
      const mockResetStatus = resetStatus as vi.Mock;
      mockSendMessage.mockResolvedValueOnce({});
      mockResetStatus.mockImplementation(() => {});

      render(
        <Provider
          store={mockStore({
            contact: { loading: false, error: null, success: true },
          })}
        >
          <ContactForm />
        </Provider>
      );

      fireEvent.click(screen.getByText('Send Message'));

      expect(
        await screen.findByText('Message sent successfully!')
      ).toBeInTheDocument();
      expect(mockResetStatus).toHaveBeenCalled();
    });

    it('should show error message when submission fails', async () => {
      const mockSendMessage = sendMessage as vi.Mock;
      const mockResetStatus = resetStatus as vi.Mock;
      mockSendMessage.mockRejectedValueOnce(
        new Error('Failed to send message')
      );
      mockResetStatus.mockImplementation(() => {});

      render(
        <Provider
          store={mockStore({
            contact: {
              loading: false,
              error: 'Failed to send message',
              success: false,
            },
          })}
        >
          <ContactForm />
        </Provider>
      );

      fireEvent.click(screen.getByText('Send Message'));

      expect(
        await screen.findByText('Error: Failed to send message')
      ).toBeInTheDocument();
      expect(mockResetStatus).toHaveBeenCalled();
    });
  });
});
