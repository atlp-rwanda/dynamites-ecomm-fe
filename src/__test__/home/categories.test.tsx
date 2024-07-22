import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router';
import Categories from '@/components/home/sidebar';

const mockStore = configureStore([]);

const categories = [
  { id: 1, name: 'Fruits & Vegetables' },
  { id: 2, name: 'Meats & Seafood' },
  { id: 3, name: 'Breads & Bakery' },
  { id: 4, name: 'Electronics' },
  { id: 5, name: 'Clothes & Fashion' },
  { id: 6, name: 'Tables & Desks' },
  { id: 7, name: 'Healthcare' },
  { id: 8, name: 'Sports' },
  { id: 9, name: 'Makeup & Beauty' },
];

describe('Categories Component', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      categories: {
        categories,
      },
    });
  });
  it('renders Categories component with category details', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Categories />
        </MemoryRouter>
      </Provider>
    );

    categories.forEach((category) => {
      expect(screen.getByText(category.name)).toBeInTheDocument();
    });
  });
  it('renders Categories component with category icons', () => {
    render(
      <Provider store={store}>
        <Categories />
      </Provider>
    );

    const icons = screen.getAllByRole('img');
    icons.forEach((icon) => {
      expect(icon).toHaveAttribute('src');
    });
  });
  it('renders Categories component with correct number of categories', () => {
    render(
      <Provider store={store}>
        <Categories />
      </Provider>
    );

    const categoriesList = screen.getAllByRole('listitem');
    expect(categoriesList).toHaveLength(categories.length);
  });
  it('renders Categories component with correct category names', () => {
    render(
      <Provider store={store}>
        <Categories />
      </Provider>
    );

    categories.forEach((category) => {
      expect(screen.getByText(category.name)).toBeInTheDocument();
    });
  });
  it('renders Categories component with correct category names', () => {
    render(
      <Provider store={store}>
        <Categories />
      </Provider>
    );

    categories.forEach((category) => {
      expect(screen.getByText(category.name)).toBeInTheDocument();
    });
  });
  it('toggles clicked state on Enter or Space key press', () => {
    render(
      <Provider store={store}>
        <Categories />
      </Provider>
    );

    const elements = screen.getAllByRole('button'); // Adjust the selector to target the element with onKeyDown

    const [element, element1] = elements;
    expect(element).not.toHaveClass('clicked'); // Assuming class 'clicked' represents the clicked state

    // Simulate Enter key press
    fireEvent.keyDown(element, { key: 'Enter' });
    expect(element).toHaveClass('hidden');

    // Simulate Space key press
    fireEvent.keyDown(element, { key: ' ' });
    expect(element).not.toHaveClass('hidden');

    fireEvent.keyDown(element1, { key: 'Enter' });
    expect(element1.parentElement).toHaveClass('flex');

    fireEvent.keyDown(element1, { key: ' ' });
    expect(element1.parentElement).not.toHaveClass('flex');

    // Ensure other keys don't toggle the state
    fireEvent.keyDown(element, { key: 'ArrowDown' });
    expect(element).not.toHaveClass('clicked');
  });
});
