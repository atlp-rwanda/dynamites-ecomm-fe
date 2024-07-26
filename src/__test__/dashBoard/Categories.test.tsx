import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Category from '@/components/dashBoard/Category';
import categoriesReducer from '@/features/Products/categorySlice';

const renderWithProviders = (ui: React.ReactElement) => {
  const store = configureStore({ reducer: { categories: categoriesReducer } });
  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );
};

describe('Category Component', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it('should render the component with initial state', () => {
    renderWithProviders(<Category />);
    expect(screen.getByText(/Categories/i)).toBeInTheDocument();
  });

  it('renders Categories component with category icons', async () => {
    mock.onGet('/api/categories').reply(200, [
      {
        id: 1,
        name: 'Category 1',
        description: 'Description 1',
        icon: 'https://example.com/icon1.png',
      },
      {
        id: 2,
        name: 'Category 2',
        description: 'Description 2',
        icon: 'https://example.com/icon2.png',
      },
    ]);

    renderWithProviders(<Category />);

    const icons = await screen.findAllByRole('img');
    icons.forEach((icon) => {
      expect(icon).toHaveAttribute('alt');
    });
  });

  it('paginates categories', async () => {
    mock.onGet('/api/categories').reply(
      200,
      Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        name: `Category ${i + 1}`,
        description: `Description ${i + 1}`,
        icon: `https://example.com/icon${i + 1}.png`,
      }))
    );

    renderWithProviders(<Category />);

    const nextPageButton = await screen.findByRole('button', { name: /next/i });
    fireEvent.click(nextPageButton);
    expect(nextPageButton).toBeInTheDocument();
  });

  it('should render the component with initial state', async () => {
    renderWithProviders(<Category />);
    await waitFor(() =>
      expect(screen.getByText(/Categories/i)).toBeInTheDocument()
    );
  });

  it('paginates categories', async () => {
    mock.onGet('/api/categories').reply(
      200,
      Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        name: `Category ${i + 1}`,
        description: `Description ${i + 1}`,
        icon: `https://example.com/icon${i + 1}.png`,
      }))
    );

    renderWithProviders(<Category />);

    const nextPageButton = await screen.findByRole('button', { name: /next/i });
    fireEvent.click(nextPageButton);
    expect(nextPageButton).toBeInTheDocument();
  });

  it('should display validation errors if form is submitted with invalid data', async () => {
    renderWithProviders(<Category />);

    // Open the form
    fireEvent.click(screen.getByText(/Add Category/i));

    // Trigger form submission
    fireEvent.click(screen.getByText(/Save/i));

    // Wait for validation errors to appear
    await waitFor(() => {
      expect(screen.getByText(/Name/i)).toBeInTheDocument();
      expect(screen.getByText(/Icon/i)).toBeInTheDocument();
      expect(screen.getByText(/Description/i)).toBeInTheDocument();
    });
  });

  it('should submit form and handle API response', async () => {
    mock.onPost(`${import.meta.env.VITE_BASE_URL}/category/`).reply(201);

    renderWithProviders(<Category />);

    // Open the form
    fireEvent.click(screen.getByText(/Add Category/i));

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText(/Name of the category/i), {
      target: { value: 'New Category' },
    });
    fireEvent.change(
      screen.getByPlaceholderText(/Description of the category/i),
      {
        target: { value: 'Category description' },
      }
    );
    fireEvent.change(screen.getByPlaceholderText(/URL of the category icon/i), {
      target: { value: 'https://example.com/icon.png' },
    });

    fireEvent.click(screen.getByText(/Save/i));

    await waitFor(() => {
      expect(mock.history.post.length).toBe(1);
    });
  });
});
