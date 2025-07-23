import React from 'react'
import { formatDate } from '../../utils/formatDate'
import type { TableRow } from '../../interfaces/TableRow.interface'

interface Props {
  selectedItem: TableRow
  onClose: () => void
  getStatusColor: (status: boolean) => string
  onDelete?: (id: string) => void
}

const CategoryDetailPanel: React.FC<Props> = ({ onDelete, selectedItem, onClose, getStatusColor }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="pl-3 h-20 border-b border-gray-200">
        <div className="flex items-center p-3 justify-between">
          <h3 className="text-2xl font-bold text-gray-900">Category Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto space-y-4 text-sm">
        <div>
          <h5 className="font-medium text-gray-900">Tên danh mục</h5>
          <p>{selectedItem.name}</p>
        </div>

        <div>
          <h5 className="font-medium text-gray-900">Ngày tạo</h5>
          <p>{selectedItem.create_at ? formatDate(selectedItem.create_at) : "Không rõ"}</p>
        </div>

        <div>
          <h5 className="font-medium text-gray-900">Trạng thái</h5>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedItem.is_active ?? false)}`}>
            {selectedItem.is_active ? 'Hoạt động' : 'Không hoạt động'}
          </span>
        </div>
      </div>

      <div className="p-6 border-t border-gray-200">
        <div className="flex space-x-3">
          <button onClick={() => onDelete?.(selectedItem._id.toString())} className="flex-1 border-2 border-red-600 text-red-600 py-2 px-4 rounded-lg hover:bg-red-600 hover:text-white">Xoá</button>
          <button className="flex-1 border-2 border-gray-900 text-gray-900 py-2 px-4 rounded-lg hover:bg-slate-700 hover:text-white">Sửa</button>
        </div>
      </div>
    </div>
  )
}

export default CategoryDetailPanel
