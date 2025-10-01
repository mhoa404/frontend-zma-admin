import { formatDate } from '../../../utils/formatDate'
import type { UserRow } from '../../../interfaces/Table/UserRow.interface'

interface Props {
  selectedItem: UserRow
  onClose: () => void
  onDelete?: (id: string) => void
  onEdit: (item: UserRow) => void;
}

const UserDetailPanel = ({ onEdit, onDelete, selectedItem, onClose }: Props) => {
  return (
    <div className="flex flex-col h-full">
      <div className="pl-3 h-20 border-b border-gray-200">
        <div className="flex items-center p-3 justify-between">
          <h3 className="text-2xl font-bold text-gray-900">User Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto space-y-4 text-sm">
        <div>
          <h5 className="font-medium text-gray-900">Họ tên</h5>
          <p>{selectedItem.name}</p>
        </div>

        <div>
          <h5 className="font-medium text-gray-900">Email</h5>
          <p>{selectedItem.email}</p>
        </div>

        <div>
          <h5 className="font-medium text-gray-900">Số điện thoại</h5>
          <p>{selectedItem.phone || '-'}</p>
        </div>

        <div>
          <h5 className="font-medium text-gray-900">Vai trò</h5>
          <p>{selectedItem.role}</p>
        </div>

        <div>
          <h5 className="font-medium text-gray-900">Ngày tạo</h5>
          <p>{selectedItem.createAt ? formatDate(selectedItem.createAt) : 'Không rõ'}</p>
        </div>
      </div>

      <div className="p-6 border-t border-gray-200">
        <div className="flex space-x-3">
          <button onClick={() => onDelete?.(selectedItem._id.toString())} className="flex-1 border-2 border-red-600 text-red-600 py-2 px-4 rounded-lg hover:bg-red-600 hover:text-white">Xoá</button>
          <button onClick={() => onEdit(selectedItem)}  className="flex-1 border-2 border-gray-900 text-gray-900 py-2 px-4 rounded-lg hover:bg-slate-700 hover:text-white">Sửa</button>
        </div>
      </div>
    </div>
  )
}

export default UserDetailPanel
