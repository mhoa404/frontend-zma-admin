import type { ColumnDef, TableRow } from "../../../interfaces/TableRow.interface";

interface Props {
  data: TableRow[];
  columns: ColumnDef[];
  selectedItem?: TableRow | null;
  onRowClick?: (item: TableRow) => void;
}

const TbodyOrders = ({ data, columns, selectedItem, onRowClick }: Props) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {data.map((item) => (
        <tr
          key={item._id}
          className={`hover:bg-gray-50 cursor-pointer ${
            selectedItem?._id === item._id ? "bg-blue-50" : ""
          }`}
          onClick={() => onRowClick?.(item)}
        >
          {columns.map((col) => {
            const value = item[col.field];

            return (
              <td
                key={String(col.field)}
                className="px-6 py-2 text-sm text-gray-800"
              >
                {col.render
                  ? col.render(item)
                  : value instanceof Date
                  ? value.toLocaleString()
                  : value ?? ""}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default TbodyOrders;
