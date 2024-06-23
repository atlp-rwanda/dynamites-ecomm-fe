import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import ProductGridFour from '@/components/home/ProductGridFour';
import { Product } from '@/types/Product';
import User from '@/types/User';

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
  {
    id: 3,
    name: 'Sample Product 3',
    shortDesc: 'This is a sample product 3 description',
    image: '/src/assets/iphone.png',
    regularPrice: 300,
    salesPrice: 240,
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
      email: 'vendor3@example.com',
    } as User,
  },
  {
    id: 4,
    name: 'Sample Product 4',
    shortDesc: 'This is a sample product 4 description',
    image: '/src/assets/iphone.png',
    regularPrice: 400,
    salesPrice: 320,
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
      email: 'vendor4@example.com',
    } as User,
  },
  {
    id: 5,
    name: 'Sample Product 5',
    shortDesc: 'This is a sample product 5 description',
    image: '/src/assets/iphone.png',
    regularPrice: 500,
    salesPrice: 470,
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
      email: 'vendor5@example.com',
    } as User,
  },
];

describe('ProductGridFour Component', () => {
  it('renders ProductGridFour with up to 4 products', () => {
    render(<ProductGridFour products={mockProducts.slice(0, 4)} />);

    // Check that exactly 4 products are displayed
    expect(screen.getAllByText(/Sample Product/).length).toBe(4);
  });

  it('handles empty product list', () => {
    render(<ProductGridFour products={[]} />);

    // Check that "No Products Found" message is displayed
    expect(screen.getByText(/No Products Found/i)).toBeInTheDocument();
  });

  it('renders the correct product details', () => {
    render(<ProductGridFour products={mockProducts} />);

    // Check that product details are displayed correctly
    mockProducts.slice(0, 4).forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByText(product.shortDesc)).toBeInTheDocument();
      expect(screen.getByAltText(product.name)).toBeInTheDocument();
      expect(screen.getByAltText(product.name)).toHaveAttribute(
        'src',
        product.image
      );
      expect(screen.getByText(`$${product.salesPrice}`)).toBeInTheDocument();
      expect(screen.getByText(`$${product.regularPrice}`)).toBeInTheDocument();
    });
  });
});
