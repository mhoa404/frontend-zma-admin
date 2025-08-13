export interface UserRow {
  _id: string;
  zalo_id?: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  create_at?: Date | string;
}
