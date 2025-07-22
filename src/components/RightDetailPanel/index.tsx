// src/components/RightDetailPanel.tsx

import React from 'react'
import type { TableRow } from '../../common/interfaces/TableRow.interface'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'

interface RightDetailPanelProps {
  selectedItem: TableRow | null
  activeMenu: string
  getStatusColor: (available: boolean) => string
  onClose: () => void
}

export const RightDetailPanel: React.FC<RightDetailPanelProps> = ({
  selectedItem,
  onClose,
}) => {
  if (!selectedItem) return null

  const {
    name = '',
    description = '',
    price = 0,
    sale_price = 0,
    total_reviews = 0,
    rating = 0,
    create_at = '',
    available = false,
    category_name = '',
  } = selectedItem

  return (
    <div className="flex flex-col h-full">
      <div className="pl-3 h-20 border-b border-gray-200">
        <div className="flex items-center p-3 justify-between">
          <h3 className="text-2xl font-bold text-gray-900">Details</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
            type="button"
          >
            ×
          </button>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-md bg-yellow-400 flex items-center justify-center">
              <span className="text-lg font-medium text-white">
                {name.charAt(0) || '?'}
              </span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">{name}</h4>
              <p className="text-sm text-gray-500">
                {category_name || 'Danh mục không rõ'}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h5 className="font-medium text-gray-900">Mô tả</h5>
          <p className="text-sm">{description}</p>
        </div>

        <div>
          <h5 className="font-medium text-gray-900 mb-3">Chi tiết</h5>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Giá:</span>
              <span className="font-medium text-gray-900">
                {formatCurrency(price)} VNĐ
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Giá Sale:</span>
              <span className="font-medium text-gray-900">
                {sale_price > 0
                  ? `${formatCurrency(sale_price)} VNĐ`
                  : 'Không'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Lượt đánh giá:</span>
              <span className="font-medium text-gray-900">
                {total_reviews}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Rating:</span>
              <span className="font-medium text-gray-900">{rating}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Trạng thái:</span>
              <span className="font-medium text-gray-900">
                {available ? 'Có' : 'Không'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Ngày tạo:</span>
              <span className="font-medium text-gray-900">
                {formatDate(create_at)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-gray-200">
        <div className="flex space-x-3">
          <button
            type="button"
            className="flex-1 border-2 border-red-600 bg-transparent text-red-600 py-2 px-4 rounded-lg hover:bg-red-600 hover:text-white focus:outline-none transition-colors"
          >
            Xoá
          </button>
          <button
            type="button"
            className="flex-1 border-2 border-gray-900 bg-transparent text-gray-900 py-2 px-4 rounded-lg hover:bg-slate-700 hover:text-white focus:outline-none transition-colors"
          >
            Sửa
          </button>
        </div>
      </div>
    </div>
  )
}
