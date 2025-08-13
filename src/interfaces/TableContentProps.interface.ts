import type { ColumnDef } from './ColumnDef.interface';

export interface TableContentProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  selectedItem?: T | null;
  onRowClick?: (item: T) => void;
  getStatusColor?: (status: string) => string;
}
