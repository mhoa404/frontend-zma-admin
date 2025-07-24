// src/components/TableComponent.tsx
import type { ColumnDef, TableRow } from "../../interfaces/TableRow.interface";
import Thead from "./Thead";

interface TableComponentProps<T extends TableRow> {
  columns: ColumnDef[];
  BodyComponent: React.ComponentType<{
    data: T[];
    columns: ColumnDef[];
    onRowClick?: (item: T) => void;
    selectedItem?: T | null;
  }>;
  data: T[];
  selectedItem?: T | null;
  onRowClick?: (item: T) => void;
}

const TableComponent = <T extends TableRow>({
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
          columns={columns} // 👈 thêm dòng này!
          selectedItem={selectedItem}
          onRowClick={onRowClick}
        />
      </table>
    </div>
  );
};

export default TableComponent;