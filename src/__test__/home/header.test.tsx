import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import Header from '@/components/home/header';

describe('Header Component', () => {
  it('renders the Header component', () => {
    render(<Header />);

    const freeShippingIcon = screen.getByAltText('Free Shipping');
    expect(freeShippingIcon).toBeInTheDocument();
    expect(screen.getByText('Free Shipping')).toBeInTheDocument();
    expect(screen.getByText('Free shipping on all orders')).toBeInTheDocument();

    const onlineSupportIcon = screen.getByAltText('Online Support 24/7');
    expect(onlineSupportIcon).toBeInTheDocument();
    expect(screen.getByText('Online Support 24/7')).toBeInTheDocument();
    expect(
      screen.getByText('Support online 24 hours a day')
    ).toBeInTheDocument();

    const moneyReturnIcon = screen.getByAltText('Money Return');
    expect(moneyReturnIcon).toBeInTheDocument();
    expect(screen.getByText('Money Return')).toBeInTheDocument();
    expect(screen.getByText('Back guarantee under 7 days')).toBeInTheDocument();

    const memberDiscountIcon = screen.getByAltText('Member Discount');
    expect(memberDiscountIcon).toBeInTheDocument();
    expect(screen.getByText('Member Discount')).toBeInTheDocument();
    expect(screen.getByText('On every order over $20.00')).toBeInTheDocument();
  });
});
