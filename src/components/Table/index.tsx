// src/components/TableComponent.tsx
import type { ColumnDef } from "../../interfaces/ColumnDef.interface";
import Thead from "./Thead";

interface TableComponentProps<T> {
  columns: ColumnDef<T>[];
  BodyComponent: React.ComponentType<{
    data: T[];
    columns: ColumnDef<T>[];
    onRowClick?: (item: T) => void;
    selectedItem?: T | null;
  }>;
  data: T[];
  selectedItem?: T | null;
  onRowClick?: (item: T) => void;
}

const TableComponent = <T,>({
  columns,
  BodyComponent,
  data,
  selectedItem,
  onRowClick,
}: TableComponentProps<T>) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="w-full">
        <Thead columns={columns} />
        <BodyComponent
          data={data}
          columns={columns} 
          selectedItem={selectedItem}
          onRowClick={onRowClick}
        />
      </table>
    </div>
  );
};

export default TableComponent;