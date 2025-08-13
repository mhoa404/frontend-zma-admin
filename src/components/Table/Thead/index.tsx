// src/components/Thead.tsx
import type { ColumnDef } from "../../../interfaces/ColumnDef.interface";

interface TheadProps<T> {
  columns: ColumnDef<T>[];
}

const Thead = <T,>({ columns }: TheadProps<T>) => {
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