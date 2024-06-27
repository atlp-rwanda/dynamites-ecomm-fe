// MostPopularItem.test.tsx
import { render, screen } from '@testing-library/react';
import SingleItem from '@/components/Popular-section/item'; // Adjust the import path as per your actual setup
import { Product } from '@/types/product'; // Adjust the import path as per your actual setup
import User from '@/types/user';

const Role ={
  id: 1,
  name: 'test',
  permissions: ['yes']
}
const  vendor : User= {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  password: 'password123',
  userType: Role,
  orders: [],
  googleId: 'google123',
  facebookId: 'facebook123',
  picture: '/path/to/profile-picture.jpg',
  provider: 'email',
  isVerified: true,
  status: 'active',
}
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
  vendor: vendor
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
