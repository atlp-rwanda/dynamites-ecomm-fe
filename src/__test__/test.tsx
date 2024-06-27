// MostPopularItem.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import SingleItem from '../components/Popular-section/item'; // Adjust the import path as per your actual setup
import { Product } from '@/types/product'; // Adjust the import path as per your actual setup

// Mock Product data
const mockProduct: Product = {
  id: 1,
  name: 'Sample Product',
  shortDesc: 'This is a sample product description',
  image: '/src/assets/iphone.png',
  regularPrice: 100,
  salesPrice: 80,
  averageRating: 2.5,
  isAvailable: true,
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
  }
};

describe('SingleItem Component', () => {
  it('renders product information correctly', () => {
    render(<SingleItem product={mockProduct} />);

    // Assertions to verify the rendered product information
    const productName = screen.getByText('Sample Product');
    expect(productName).toBeInTheDocument();

    const productImage = screen.getByAltText('Sample Product');
    expect(productImage).toBeInTheDocument();
    expect(productImage).toHaveAttribute('src', '/src/assets/iphone.png');

    const salesPrice = screen.getByText('$80');
    expect(salesPrice).toBeInTheDocument();

    const regularPrice = screen.getByText('$100');
    expect(regularPrice).toBeInTheDocument();
  });
});
