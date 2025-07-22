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

export interface TableContentProps {
  data: TableRow[];
  columns: ColumnDef[];
  selectedItem?: TableRow | null;
  onRowClick?: (item: TableRow) => void;
  getStatusColor?: (status: string) => string;
}
