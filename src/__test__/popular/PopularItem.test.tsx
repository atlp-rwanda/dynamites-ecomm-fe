// MostPopularItem.test.tsx
import { render, screen } from '@testing-library/react';
import SingleItem from '@/components/Popular/Item'; // Adjust the import path as per your actual setup
import Product from '@/Interfaces/product'; // Adjust the import path as per your actual setup
import Category from '@/Interfaces/category';
import Vendor from '@/Interfaces/Vendor';

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

const mockProduct: Product = {
  id: 1,
  name: 'Sample Product',
  image: '/src/assets/iphone.png',
  gallery: ['/path/to/sample-product.jpg', '/path/to/sample-product.jpg'],
  shortDesc: 'This is a sample product description',
  longDesc: 'This is a sample product long description',
  quantity: 10,
  regularPrice: 100,
  salesPrice: 80,
  tags: ['tag1', 'tag2'],
  type: 'Simple',
  isAvailable: true,
  averageRating: 2.5,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  category: mockCategory,
  vendor: mockVendor,
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
