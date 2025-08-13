import type { OrderStatus } from '../../types/order';
import type { OrderItem } from '../OrderItem.interface';

export interface OrderRow {
  _id: string;
  orderId: string;
  customerName?: string;
  zalo_id?: string;
  phone?: string;
  status: OrderStatus;
  value: string;
  date: string;
  payment_method?: string;
  order_items?: OrderItem[];
}
