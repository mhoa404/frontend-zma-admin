export interface CategoryRow {
  _id: string;
  name: string;
  description?: string;
  is_active: boolean;
  create_at?: Date | string;
}
