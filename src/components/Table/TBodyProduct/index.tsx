// src/components/TbodyProducts.tsx
import type { UIProductRow } from "../../../interfaces/TableRow.interface";
import { getStatusColor } from "../../../utils/statusColor";

interface TbodyProductsProps {
  data: UIProductRow[];
  onRowClick?: (item: UIProductRow) => void;
  selectedItem?: UIProductRow | null;
}

const TbodyProducts = ({ data, onRowClick, selectedItem }: TbodyProductsProps) => {
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
          <td className="px-6 py-2 w-32">
            <img
              src={item.img_url}
              alt="Lỗi tải ảnh"
              className="w-16 h-16 object-cover rounded"
            />
          </td>
          <td className="px-6 py-2">{item.name}</td>
          <td className="px-6 py-2">{item.price?.toLocaleString()} VNĐ</td>
          <td className="px-6 py-2">{item.category_name}</td>
          {/* <td className="px-6 py-2">{new Date(item.create_at!).toLocaleDateString()}</td> */}
          <td className="px-6 py-2">
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                item.available ?? false
              )}`}
            >
              {item.available ? "Yes" : "No"}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TbodyProducts;