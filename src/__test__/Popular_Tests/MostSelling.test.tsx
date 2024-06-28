import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import MostSelling from '@/components/Popular-section/MostSelling'; // Adjust the path as per your project structure
import { Product } from '@/types/product';
import User from '@/types/user';

const mockStore = configureStore([]);

// Mock Product Data
const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Sample Product 1',
    shortDesc: 'This is a sample product description 1',
    image: '/src/assets/iphone1.png',
    regularPrice: 100,
    salesPrice: 80,
    averageRating: 4.5,
    isAvailable: true,
    gallery: ['/path/to/sample-product1.jpg', '/path/to/sample-product1.jpg'],
    longDesc: 'This is a sample product long description 1',
    category: {
      id: 1,
      name: 'Category Name 1',
      description: 'Category Description 1',
    },
    quantity: 10,
    tags: ['tag1', 'tag2'],
    type: 'Simple',
    reviews: [],
    vendor: {
      id: 1,
      firstName: 'Vendor 1',
      lastName: 'Name 1',
      email: 'vendor1@gmail.com',
    } as User,
  },
  {
    id: 2,
    name: 'Sample Product 2',
    shortDesc: 'This is a sample product description 2',
    image: '/src/assets/iphone2.png',
    regularPrice: 200,
    salesPrice: 160,
    averageRating: 4.5,
    isAvailable: true,
    gallery: ['/path/to/sample-product2.jpg', '/path/to/sample-product2.jpg'],
    longDesc: 'This is a sample product long description 2',
    category: {
      id: 1,
      name: 'Category Name 2',
      description: 'Category Description 2',
    },
    quantity: 10,
    tags: ['tag1', 'tag2'],
    type: 'Simple',
    reviews: [],
    vendor: {
      id: 2,
      firstName: 'Vendor 2',
      lastName: 'Name 2',
      email: 'vendor2@gmail.com',
    } as User,
  },
];

describe('MostSelling Component', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      Popularproducts: {
        items: mockProducts,
        status: 'idle',
      },
    });
  });

  it('renders the MostSelling component with loading state', async () => {
    render(
      <Provider store={store}>
        <MostSelling />
      </Provider>
    );

    const loadingElements = await screen.findAllByTestId('loading-element');
    expect(loadingElements.length).toBe(3);
  });

  it('renders the MostSelling component with products', async () => {
    render(
      <Provider store={store}>
        <MostSelling />
      </Provider>
    );

    await screen.findByText('Sample Product 1'); // Example: Wait for an element that indicates products are loaded

    const titleElement = screen.getByText('Most Selling');
    expect(titleElement).toBeInTheDocument();

    mockProducts.forEach((product) => {
      const productName = screen.getByText(product.name);
      expect(productName).toBeInTheDocument();

      const productDesc = screen.getByText(product.shortDesc);
      expect(productDesc).toBeInTheDocument();

      const productImage = screen.getByAltText(product.name);
      expect(productImage).toBeInTheDocument();
      expect(productImage).toHaveAttribute('src', product.image);

      const salesPrice = screen.getByText(`$${product.salesPrice}`);
      expect(salesPrice).toBeInTheDocument();

      const regularPrice = screen.getByText(`$${product.regularPrice}`);
      expect(regularPrice).toBeInTheDocument();
    });
  });

  it('handles left arrow click for pagination', async () => {
    render(
      <Provider store={store}>
        <MostSelling />
      </Provider>
    );

    // Wait for async actions to complete
    await screen.findByText('Sample Product 1');

    const leftArrow = screen.getByTestId('left-arrow');
    fireEvent.click(leftArrow);
  });

  it('handles right arrow click for pagination', async () => {
    render(
      <Provider store={store}>
        <MostSelling />
      </Provider>
    );

    await screen.findByText('Sample Product 1');

    const rightArrow = screen.getByTestId('right-arrow');
    fireEvent.click(rightArrow);
  });
});
