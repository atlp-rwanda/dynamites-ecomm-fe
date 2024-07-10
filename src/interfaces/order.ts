export interface Order {
  id: number;
  totalAmount: number;
  status: string;
  deliveryInfo: string;
  paymentInfo: string | null;
  trackingNumber: string;
  createdAt: string;
  updatedAt: string;
  paid: boolean;
  orderDetails: OrderDetail[];
}

interface OrderDetail {
  id: number;
  quantity: number;
  price: number;
}

export default Order;
