import { render, fireEvent } from '@testing-library/react';
import DashboardSideNav from '@/components/dashBoard/DashboardSideNav';

describe('DashboardSideNav', () => {
  it('renders the sidebar items', () => {
    const { getByText } = render(<DashboardSideNav />);
    expect(getByText('Dashboard')).toBeInTheDocument();
    expect(getByText('Orders')).toBeInTheDocument();
    expect(getByText('Customers')).toBeInTheDocument();
    expect(getByText('Products')).toBeInTheDocument();
  });

  it('expands and collapses the subitems', () => {
    const { getByText, queryByText } = render(<DashboardSideNav />);
    const productsItem = getByText('Products');
    fireEvent.click(productsItem);
    expect(getByText(/all products/i)).toBeVisible();
    fireEvent.click(productsItem);
    expect(queryByText(/all products/i)).not.toBeInTheDocument();
  });

  it('renders the subitems correctly', () => {
    const { getByText } = render(<DashboardSideNav />);
    const productsItem = getByText('Products');
    fireEvent.click(productsItem);
    expect(getByText('All Products')).toBeInTheDocument();
    expect(getByText('Add New')).toBeInTheDocument();
    expect(getByText('Categories')).toBeInTheDocument();
    expect(getByText('Tags')).toBeInTheDocument();
  });

  it('handles keydown events for subitems', () => {
    const { getByText, getAllByText } = render(<DashboardSideNav />);
    const productsItem = getByText('Products');
    fireEvent.keyDown(productsItem, { key: 'Enter' });
    const allProductsElements = getAllByText(/all products/i);
    fireEvent.keyDown(productsItem, { key: ' ' });
    expect(allProductsElements.some((element) => element.offsetWidth > 0)).toBe(
      false
    );
  });

  it('toggles sidebar visibility', () => {
    const { getByLabelText } = render(<DashboardSideNav />);
    const toggleButton = getByLabelText('Toggle Menu');
    fireEvent.click(toggleButton);
    expect(getByLabelText('Close Menu')).toBeInTheDocument();

    const closeButton = getByLabelText('Close Menu');
    fireEvent.click(closeButton);
    expect(toggleButton).toBeVisible();
  });
});
