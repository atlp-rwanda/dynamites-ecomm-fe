import Product from './Product';
import User from './user';

export default interface Review {
  id: number;
  content: string;
  rating: number;
  user: User;
  product: Product;
}
