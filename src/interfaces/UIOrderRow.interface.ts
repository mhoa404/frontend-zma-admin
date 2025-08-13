import type { OrderRow } from './Table/OrderRow.interface';

export interface UIOrderRow extends OrderRow {
  customer_name: string;
  phone: string;
  full_address: string;
}