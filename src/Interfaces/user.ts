import Order from './order';
import Role from './Role';

export default interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  userType: Role;
  orders: Order[];
  googleId?: string;
  facebookId?: string;
  picture?: string;
  provider?: string;
  isVerified: boolean;
  status: 'active' | 'inactive';
  twoFactorCode?: number;
}
