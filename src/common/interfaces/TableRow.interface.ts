export interface TableRow {
  _id: string | number;
  name?: string;
  status?: string;
  value?: string;
  date?: string;
  orderId?: string;
  category_id?: string;
  category_name?:string;
  description?: string;
  img_url?: string;
  price?: number;
  sale_price?: number;
  available?: boolean;
  create_at?: Date | string;
  total_reviews?: number;
  rating?: number;
  is_active?: boolean;
}


export interface ColumnDef {
  header: string;
  field: keyof TableRow;
  render?: (item: TableRow) => React.ReactNode;
  widthClass?: string;
}

export interface FormError {
  name?: string;
  email?: string;
  password?: string;
  err?: string;
}


export interface TableContentProps<T extends TableRow = TableRow> {
  data: T[];
  columns: ColumnDef[];
  selectedItem?: T | null;
  onRowClick?: (item: T) => void;
  getStatusColor?: (status: string) => string;
}

export interface UIProductRow extends Omit<TableRow, 'category_id'> {
  category_id?: string; // giữ lại để tương thích
  category_name: string;
}
