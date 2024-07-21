import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { describe, expect, beforeEach } from 'vitest';
import configureStore from 'redux-mock-store';
import { Orders } from '@/components/Orders/Orders';
import { Order } from '@/interfaces/order';

const mockOrders: Order[] = [
  {
    id: 1,
    trackingNumber: '123',
    updatedAt: '2023-07-17T00:00:00Z',
    status: 'Pending',
    totalAmount: 100,
    country: 'USA',
    deliveryInfo: { address: '123 Main St', city: 'Anytown', zip: '12345' },
    paymentInfo: null,
    createdAt: '',
    paid: false,
    orderDetails: [],
  },
  {
    id: 2,
    trackingNumber: '456',
    updatedAt: '2023-07-16T00:00:00Z',
    status: 'Completed',
    totalAmount: 200,
    country: 'USA',
    deliveryInfo: { address: '123 Main St', city: 'Anytown', zip: '12345' },
    paymentInfo: null,
    createdAt: '',
    paid: false,
    orderDetails: [],
  },
];

const mockStore = configureStore([]);

describe('Orders Component', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      orders: {
        orders: mockOrders,
      },
    });
  });

  test('renders without crashing', () => {
    render(
      <Provider store={store}>
        <Orders />
      </Provider>
    );
    expect(screen.getByTestId('trackingNumber')).toBeInTheDocument();
    expect(screen.getByText(/ID/i)).toBeInTheDocument();
  });

  test('renders table headers correctly', () => {
    render(
      <Provider store={store}>
        <Orders />
      </Provider>
    );
    expect(screen.getByTestId('trackingNumber')).toBeInTheDocument();
    expect(screen.getByTestId('updatedAt')).toBeInTheDocument();
    expect(screen.getByTestId('status')).toBeInTheDocument();
    expect(screen.getByTestId('totalAmount')).toBeInTheDocument();
    expect(screen.getByTestId('action')).toBeInTheDocument();
  });

  test('renders pagination controls', () => {
    render(
      <Provider store={store}>
        <Orders />
      </Provider>
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  test('sorts by column when header is clicked', () => {
    render(
      <Provider store={store}>
        <Orders />
      </Provider>
    );
    const orderColumn = screen.getByTestId('trackingNumber');
    fireEvent.click(orderColumn);
    const sortedOrders = [...mockOrders].sort((a, b) =>
      a.trackingNumber.localeCompare(b.trackingNumber)
    );
    const rows = screen.getAllByRole('row');
    rows.forEach((row, index) => {
      if (index === 0) return; // Skip header row
      expect(row).toHaveTextContent(sortedOrders[index - 1].trackingNumber);
    });
  });

  test('filters orders by status when filter button is clicked', () => {
    render(
      <Provider store={store}>
        <Orders />
      </Provider>
    );
    const pendingFilter = screen.getByTestId('pending-filter');
    fireEvent.click(pendingFilter);
    const filteredOrders = mockOrders.filter(
      (order) => order.status === 'Pending'
    );
    const rows = screen.getAllByRole('row');
    expect(rows.length - 1).toBe(filteredOrders.length); // Subtract 1 for header row
    rows.forEach((row, index) => {
      if (index === 0) return; // Skip header row
      expect(row).toHaveTextContent(filteredOrders[index - 1].trackingNumber);
    });
  });

  test('searches orders when typing in search bar', () => {
    render(
      <Provider store={store}>
        <Orders />
      </Provider>
    );
    const searchInput = screen.getByPlaceholderText(/Search order/i);
    fireEvent.change(searchInput, { target: { value: '123' } });
    const filteredOrders = mockOrders.filter((order) =>
      order.trackingNumber.includes('123')
    );
    const rows = screen.getAllByRole('row');
    expect(rows.length - 1).toBe(filteredOrders.length); // Subtract 1 for header row
    rows.forEach((row, index) => {
      if (index === 0) return; // Skip header row
      expect(row).toHaveTextContent(filteredOrders[index - 1].trackingNumber);
    });
  });

  test('opens OrderDetailsModal when view button is clicked', () => {
    render(
      <Provider store={store}>
        <Orders />
      </Provider>
    );
    const viewButton = screen.getAllByRole('button', { name: /view/i })[0];
    fireEvent.click(viewButton);
    expect(screen.getByText(/Order #234/i)).toBeInTheDocument();
  });

  test('pagination controls work correctly', () => {
    const manyOrders = Array.from({ length: 15 }, (_, index) => ({
      id: index + 1,
      trackingNumber: `TRACK${index + 1}`,
      updatedAt: `2023-07-${index < 9 ? 0 : ''}${index + 1}T00:00:00Z`,
      status: index % 2 === 0 ? 'Pending' : 'Completed',
      totalAmount: (index + 1) * 100,
      deliveryInfo:
        '{"address": "Address", "city": "City", "country": "Country"}',
    }));
    const newStore = mockStore({
      orders: {
        orders: manyOrders,
      },
    });
    render(
      <Provider store={newStore}>
        <Orders />
      </Provider>
    );
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(6); //
  });
});
