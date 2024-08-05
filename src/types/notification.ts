export default interface NotificationBox {
    notification_id: number;
    message_title: string;
    message_content: string;
    product_id: number;
    vendor_id: number;
    vendor_email: string;
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  