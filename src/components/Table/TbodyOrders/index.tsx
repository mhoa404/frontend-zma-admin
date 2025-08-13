import type { UIOrderRow } from "../../../interfaces/UIOrderRow.interface";
import type { ColumnDef } from "../../../interfaces/ColumnDef.interface";

interface Props {
  data: UIOrderRow[];
  columns: ColumnDef<UIOrderRow>[];
  selectedItem?: UIOrderRow | null;
  onRowClick?: (item: UIOrderRow) => void;
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
          className={`hover:bg-gray-50 cursor-pointer ${
            selectedItem?._id === item._id ? "bg-blue-50" : ""
          }`}
          onClick={() => onRowClick?.(item)}
        >

          {/* Các cột còn lại */}
          {columns.map((col) => {
            const value = item[col.field as keyof UIOrderRow] as unknown;
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
                  : String(value ?? "")}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default TbodyOrders;
