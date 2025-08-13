// src/components/TbodyCategories.tsx
import { getStatusColor } from "../../../utils/statusColor";
import type { CategoryRow } from "../../../interfaces/Table/CategoryRow.interface";

interface TbodyCategoriesProps {
  data: CategoryRow[];
  onRowClick?: (item: CategoryRow) => void;
  selectedItem?: CategoryRow | null;
}

const TbodyCategories = ({ data, onRowClick, selectedItem }: TbodyCategoriesProps) => {
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
          <td className="px-6 py-2">{item.name}</td>
          <td className="px-6 py-2">
            {item.create_at
              ? new Date(item.create_at).toLocaleDateString()
              : "Không rõ"}
          </td>
          <td className="px-6 py-2">
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                item.is_active ?? false
              )}`}
            >
              {item.is_active ? "Yes" : "No"}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TbodyCategories;
