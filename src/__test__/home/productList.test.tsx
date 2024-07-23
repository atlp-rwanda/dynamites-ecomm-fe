import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router';
import ProductsList from '@/components/home/productList';
import { Product } from '@/types/Product';
import User from '@/types/User';

const mockStore = configureStore([]);

// Mock Product Data
const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Sample Product',
    shortDesc: 'This is a sample product description',
    image: '/src/assets/iphone.png',
    regularPrice: 100,
    salesPrice: 80,
    averageRating: 4.5,
    isAvailable: true,
    isFeatured: false,
    gallery: ['/path/to/sample-product.jpg', '/path/to/sample-product.jpg'],
    longDesc: 'This is a sample product long description',
    category: {
      id: 1,
      name: 'Category Name',
      description: 'Category Description',
    },
    quantity: 10,
    tags: ['tag1', 'tag2'],
    type: 'Simple',
    reviews: [],
    vendor: {
      id: 1,
      firstName: 'Vendor',
      lastName: 'Name',
      email: 'niyobern@google.com',
    } as User,
  },
  {
    id: 2,
    name: 'Sample Product 2',
    shortDesc: 'This is a sample product 2 description',
    image: '/src/assets/iphone.png',
    regularPrice: 200,
    salesPrice: 160,
    averageRating: 4.5,
    isAvailable: true,
    isFeatured: false,
    gallery: ['/path/to/sample-product.jpg', '/path/to/sample-product.jpg'],
    longDesc: 'This is a sample product long description',
    category: {
      id: 1,
      name: 'Category Name',
      description: 'Category Description',
    },
    quantity: 10,
    tags: ['tag1', 'tag2'],
    type: 'Simple',
    reviews: [],
    vendor: {
      id: 1,
      firstName: 'Vendor',
      lastName: 'Name',
      email: 'email@gmail.com',
    } as User,
  },
];

describe('ProductsList Component', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      signIn: {
        token: 'fake token',
      },
      products: {
        products: mockProducts,
        wishlistProducts: [],
      },
    });
  });

  it('renders the ProductsList component with products', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductsList focused="all" />
        </MemoryRouter>
      </Provider>
    );

    mockProducts.forEach((product) => {
      const productName = screen.getByText(
        `${product.name.substring(0, 17)}${product.name.length > 17 ? '...' : ''}`
      );
      expect(productName).toBeInTheDocument();

      const productDesc = screen.getByText(
        `${product.shortDesc.substring(0, 27)}${product.shortDesc.length > 27 ? '...' : ''}`
      );
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
});
