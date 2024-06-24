
import User from "./user";
import Product from "./Product";

export interface OrderDetails {
    id: number;
    order: Order;
    product: Product;
    quantity: number;
    price: number;
  }

export default interface Order {
    id: number;
    user: User | null;
    totalAmount: number;
    status: string;
    deliveryInfo?: string;
    paymentInfo?: string;
    trackingNumber: string;
    createdAt: Date;
    updatedAt: Date;
    orderDetails: OrderDetails[];
    paid?: boolean;
  }
