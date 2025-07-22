// src/components/Thead.tsx
import type { ColumnDef } from "../../../interfaces/TableRow.interface";

interface TheadProps {
  columns: ColumnDef[];
}

const Thead = ({ columns }: TheadProps) => {
  return (
    <thead className="bg-slate-500">
      <tr>
        {columns.map((col) => (
          <th
            key={col.header}
            className={`px-6 py-3 text-left text-xs text-white uppercase ${col.widthClass || ""}`}
          >
            {col.header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default Thead;