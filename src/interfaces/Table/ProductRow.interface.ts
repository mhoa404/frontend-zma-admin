export interface ProductRow {
  _id: string;
  name: string;
  category_id?: string;
  category_name?: string;
  description?: string;
  img_url?: string;
  img_public_id?: string;
  price: number;
  sale_price?: number;
  available: boolean;
  create_at?: Date | string;
  total_reviews?: number;
  rating?: number;
}
