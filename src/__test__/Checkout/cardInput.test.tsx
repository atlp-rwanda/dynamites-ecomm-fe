import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CardInput from '@/components/Checkout/CardInput';

describe('CardInput Component', () => {
  it('renders CardInput component and types into card number input', () => {
    const mockSaveCard = vi.fn();
    render(<CardInput saveCard={mockSaveCard} />);
    const cardNumberInput = screen.getByPlaceholderText('Card Number');
    fireEvent.change(cardNumberInput, {
      target: { value: '4111111111111111' },
    });
    expect(cardNumberInput).toHaveValue('4111111111111111');
  });

  it('detects Visa card type correctly', () => {
    const mockSaveCard = vi.fn();
    render(<CardInput saveCard={mockSaveCard} />);
    const cardNumberInput = screen.getByPlaceholderText('Card Number');
    fireEvent.change(cardNumberInput, {
      target: { value: '4111111111111111' },
    });
    expect(screen.getByAltText('visa')).toBeInTheDocument();
  });

  test('detects Mastercard card type correctly', () => {
    const mockSaveCard = vi.fn();
    render(<CardInput saveCard={mockSaveCard} />);
    const cardNumberInput = screen.getByPlaceholderText('Card Number');
    fireEvent.change(cardNumberInput, {
      target: { value: '5105105105105100' },
    });
    expect(screen.getByAltText('mastercard')).toBeInTheDocument();
  });

  test('shows error for invalid card type', () => {
    const mockSaveCard = vi.fn();
    render(<CardInput saveCard={mockSaveCard} />);
    const cardNumberInput = screen.getByPlaceholderText('Card Number');
    fireEvent.change(cardNumberInput, {
      target: { value: '1234567890123456' },
    });
    expect(screen.getByText('Invalid Card')).toBeInTheDocument();
  });
  test('handles expiry date change correctly', () => {
    const mockSaveCard = vi.fn();
    render(<CardInput saveCard={mockSaveCard} />);
    const expiryDateInput = screen.getByPlaceholderText('Expiry MM/YY');
    fireEvent.change(expiryDateInput, { target: { value: '12/34' } });
    expect(expiryDateInput).toHaveValue('12/34');
  });

  test('shows error for invalid expiry date', () => {
    const mockSaveCard = vi.fn();
    render(<CardInput saveCard={mockSaveCard} />);
    const expiryDateInput = screen.getByPlaceholderText('Expiry MM/YY');
    fireEvent.change(expiryDateInput, { target: { value: '19/11' } });
    expect(screen.getByText('Invalid Expiry Date')).toBeInTheDocument();
  });
});
