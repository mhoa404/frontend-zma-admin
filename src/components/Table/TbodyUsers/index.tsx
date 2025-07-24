import type { ColumnDef, TableRow } from "../../../interfaces/TableRow.interface";

interface TbodyUsersProps {
  data: TableRow[];
  columns: ColumnDef[];
  onRowClick?: (item: TableRow) => void;
  selectedItem?: TableRow | null;
}

const TbodyUsers = ({ data, columns, onRowClick, selectedItem }: TbodyUsersProps) => {
  if (!Array.isArray(data)) {
    return (
      <tbody>
        <tr>
          <td colSpan={6} className="text-center py-4 text-red-500">
            Dữ liệu không hợp lệ
          </td>
        </tr>
      </tbody>
    );
  }

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
          {columns.map((col, colIndex) => (
            <td key={colIndex} className="px-6 py-2">
              {col.render ? col.render(item) : String(item[col.field] ?? '')}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TbodyUsers;
