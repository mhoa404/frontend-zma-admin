import type { TableRow } from "../../../interfaces/TableRow.interface";

interface TbodyUsersProps {
  data: TableRow[];
  onRowClick?: (item: TableRow) => void;
  selectedItem?: TableRow | null;
}

const TbodyUsers = ({ data, onRowClick, selectedItem }: TbodyUsersProps) => {
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
          <td className="px-6 py-2">{item.name}</td>
          <td className="px-6 py-2">{item.email}</td>
          <td className="px-6 py-2">{item.phone}</td>
          <td className="px-6 py-2">{item.role}</td>
          <td className="px-6 py-2">
            {item.create_at
              ? new Date(item.create_at).toLocaleDateString()
              : "-"}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TbodyUsers;
