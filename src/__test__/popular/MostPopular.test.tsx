import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import MostPopular from '@/components/Popular/MostPopular';
import Product from '../../interfaces/product';
import Category from '../../interfaces/category';
import Vendor from '../../interfaces/Vendor';

const mockCategory: Category = {
  id: 1,
  name: 'Electronics',
  description: 'Category for electronic products',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
};

const mockVendor: Vendor = {
  firstName: 'Sample',
  lastName: 'Vendor',
  picture: '/path/to/vendor-picture.jpg',
};

const mockProduct1: Product = {
  id: 1,
  name: 'Sample Product 1',
  image: '/src/assets/iphone1.png',
  gallery: ['/path/to/sample-product1.jpg', '/path/to/sample-product1.jpg'],
  shortDesc: 'This is a sample product description 1',
  longDesc: 'This is a sample product long description 1',
  quantity: 10,
  regularPrice: 100,
  salesPrice: 80,
  tags: ['tag1', 'tag2'],
  type: 'Simple',
  isAvailable: true,
  averageRating: 4.5,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  category: mockCategory,
  vendor: mockVendor,
};

const mockProduct2: Product = {
  id: 2,
  name: 'Sample Product 2',
  image: '/src/assets/iphone2.png',
  gallery: ['/path/to/sample-product2.jpg', '/path/to/sample-product2.jpg'],
  shortDesc: 'This is a sample product description 2',
  longDesc: 'This is a sample product long description 2',
  quantity: 15,
  regularPrice: 200,
  salesPrice: 160,
  tags: ['tag3', 'tag4'],
  type: 'Simple',
  isAvailable: true,
  averageRating: 4.0,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  category: mockCategory,
  vendor: mockVendor,
};

const mockProduct3: Product = {
  id: 3,
  name: 'Sample Product 3',
  image: '/src/assets/iphone3.png',
  gallery: ['/path/to/sample-product3.jpg', '/path/to/sample-product3.jpg'],
  shortDesc: 'This is a sample product description 3',
  longDesc: 'This is a sample product long description 3',
  quantity: 20,
  regularPrice: 300,
  salesPrice: 240,
  tags: ['tag5', 'tag6'],
  type: 'Simple',
  isAvailable: false,
  averageRating: 3.5,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  category: mockCategory,
  vendor: mockVendor,
};

const mockProducts = [mockProduct1, mockProduct2, mockProduct3];

const mockStore = configureStore([]);

describe('MostPopular Component', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      availableProducts: {
        availableProduct: mockProducts,
        status: 'idle',
      },
    });
  });

  it('renders the MostPopular component with products', async () => {
    render(
      <Provider store={store}>
        <MostPopular />
      </Provider>
    );

    const titleElement = screen.getByText('Most Popular');
    expect(titleElement).toBeInTheDocument();

    mockProducts.forEach((product) => {
      const productName = screen.getByText(product.name);
      expect(productName).toBeInTheDocument();

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
        <MostPopular />
      </Provider>
    );

    const leftArrow = screen.getByAltText('Left Arrow Icon');
    fireEvent.click(leftArrow);

    // Add your assertions for updated state after left arrow click
  });

  it('handles right arrow click for pagination', async () => {
    render(
      <Provider store={store}>
        <MostPopular />
      </Provider>
    );

    const rightArrow = screen.getByAltText('Right Arrow Icon');
    fireEvent.click(rightArrow);

    // Add your assertions for updated state after right arrow click
  });

  it('displays loading skeletons when status is loading', () => {
    store = mockStore({
      availableProducts: {
        availableProduct: [],
        status: 'loading',
      },
    });

    render(
      <Provider store={store}>
        <MostPopular />
      </Provider>
    );

    const skeletons = screen.getAllByRole('status');
    expect(skeletons).toHaveLength(3);
  });

  it('displays error message when status is failed', () => {
    store = mockStore({
      availableProducts: {
        availableProduct: [],
        status: 'failed',
      },
    });

    render(
      <Provider store={store}>
        <MostPopular />
      </Provider>
    );

    const errorMessages = screen.getAllByText('Loading Failed...');
    expect(errorMessages).toHaveLength(3);
    errorMessages.forEach((errorMessage) => {
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
