import type { TableContentProps, TableRow } from "../../common/interfaces/TableRow.interface";

const TableContent = <T extends TableRow>({
  data,
  columns,
  selectedItem,
  onRowClick,
  getStatusColor
}: TableContentProps<T>) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-500">
          <tr>
            {columns.map(col => (
              <th
                key={col.header}
                className={`px-6 py-3 text-left text-xs text-white uppercase ${col.widthClass || ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map(item => (
            <tr
              key={item._id as React.Key}
              className={`hover:bg-gray-50 cursor-pointer ${
                selectedItem?._id === item._id ? 'bg-blue-50' : ''
              }`}
              onClick={() => onRowClick?.(item)}
            >
              {columns.map(col => (
                <td key={String(col.field)} className="px-6 py-1 whitespace-nowrap">
                  {col.render
                    ? col.render(item)
                    : col.field === 'status' && getStatusColor
                    ? (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          getStatusColor(item.status || '')
                        }`}
                      >
                        {item.status}
                      </span>
                    )
                    : (item[col.field] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableContent;
