import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import ProductCard from '@/components/home/ProductCard';
import { Product } from '@/types/Product';
import User from '@/types/User';

// Mock Product Data
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
  } as User,
};

describe('ProductCard Component', () => {
  it('renders the ProductCard component with product details', () => {
    render(<ProductCard product={mockProduct} />);

    const productName = screen.getByText(mockProduct.name);
    expect(productName).toBeInTheDocument();

    const productDesc = screen.getByText(mockProduct.shortDesc);
    expect(productDesc).toBeInTheDocument();

    const productImage = screen.getByAltText(mockProduct.name);
    expect(productImage).toBeInTheDocument();
    expect(productImage).toHaveAttribute('src', mockProduct.image);

    const salesPrice = screen.getByText(`$${mockProduct.salesPrice}`);
    expect(salesPrice).toBeInTheDocument();

    const regularPrice = screen.getByText(`$${mockProduct.regularPrice}`);
    expect(regularPrice).toBeInTheDocument();
    expect(regularPrice).toHaveClass('line-through');

    const discountBadge = screen.getByText('20% Off');
    expect(discountBadge).toBeInTheDocument();
    expect(discountBadge).toHaveClass(
      'text-white bg-red-600 py-1 px-4 font-thin rounded-xl text-sm'
    );

    const averageRating = screen.getByText(
      mockProduct.averageRating.toString()
    );
    expect(averageRating).toBeInTheDocument();

    const starIcons = screen.getAllByTestId('ratingStar');
    expect(starIcons.length).toBe(Math.floor(mockProduct.averageRating));

    const halfStar = screen.getAllByTestId('halfStar');
    expect(halfStar.length).toBe(1);

    const emptyStar = screen.getAllByTestId('emptyStar');
    expect(emptyStar.length).toBe(Math.floor(4 - mockProduct.averageRating));

    const addToCartIcon = screen.getByTestId('addToCart');
    expect(addToCartIcon).toBeInTheDocument();
    expect(addToCartIcon).toHaveClass(
      'text-white h-10 w-10 rounded p-2 cursor-pointer'
    );
  });
});
