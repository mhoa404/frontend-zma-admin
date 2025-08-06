import type { ColumnDef, TableRow } from "../../../interfaces/TableRow.interface";

interface Props {
  data: TableRow[];
  columns: ColumnDef[];
  selectedItem?: TableRow | null;
  onRowClick?: (item: TableRow) => void;
}

interface OrderItem {
  product_id: string;
  name: string;
  quantity: number;
  price: number;
  img_url?: string;
}

const TbodyOrders = ({ data, columns, selectedItem, onRowClick }: Props) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {data.map((item) => (
        <tr
          key={item._id}
          className={`hover:bg-gray-50 cursor-pointer ${selectedItem?._id === item._id ? "bg-blue-50" : ""
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
                  : Array.isArray(value)
                    ? (
                      <ul className="list-disc list-inside space-y-1">
                        {(value as OrderItem[]).map((v, idx) => (
                          <li key={idx}>
                            {v.name} x{v.quantity} - {v.price.toLocaleString()}đ
                          </li>
                        ))}
                      </ul>
                    )
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
