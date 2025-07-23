// src/components/RightDetailPanel
import React from 'react'
import type { TableRow } from '../../interfaces/TableRow.interface'
import UserDetailPanel from '../UserDetailPanel'
import CategoryDetailPanel from '../CategoryDetailPanel'
import ProductDetailPanel from '../ProductDetailPanel'

interface Props {
  selectedItem: TableRow | null
  activeMenu: string
  getStatusColor: (status: boolean) => string
  onClose: () => void
  onDelete: (id: string) => void
}

export const RightDetailPanel: React.FC<Props> = ({ selectedItem, activeMenu, getStatusColor, onClose, onDelete }) => {
  if (!selectedItem) return null

  switch (activeMenu) {
    case 'Users':
      return <UserDetailPanel selectedItem={selectedItem} onClose={onClose} onDelete={onDelete} />
    case 'Categories':
      return <CategoryDetailPanel selectedItem={selectedItem} getStatusColor={getStatusColor} onClose={onClose} onDelete={onDelete} />
    default:
      return <ProductDetailPanel selectedItem={selectedItem} onClose={onClose} onDelete={onDelete} />
  }
}
