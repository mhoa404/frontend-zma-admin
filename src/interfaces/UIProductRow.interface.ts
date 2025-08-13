import type { ProductRow } from './Table/ProductRow.interface';

export interface UIProductRow extends Omit<ProductRow, 'category_id'> {
  category_id?: string;
  category_name: string;
}
