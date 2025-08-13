export interface ColumnDef<T> {
  header: string;
  field: keyof T;
  render?: (item: T) => React.ReactNode;
  widthClass?: string;
}
