import UserDetailPanel from './UserDetailPanel'
import CategoryDetailPanel from './CategoryDetailPanel'
import ProductDetailPanel from './ProductDetailPanel'
import OrderDetailPanel from './OrderDetailPanel'

import type { UserRow } from '../../interfaces/Table/UserRow.interface'
import type { CategoryRow } from '../../interfaces/Table/CategoryRow.interface'
import type { ProductRow } from '../../interfaces/Table/ProductRow.interface'
import type { OrderRow } from '../../interfaces/Table/OrderRow.interface'

type CommonHandlers = {
  onClose: () => void
}

type RightDetailPanelProps =
  | ({
      activeMenu: 'Users'
      selectedItem: UserRow | null // ✅ cho phép null
      onDelete?: (id: string) => void
      onEdit: (item: UserRow) => void
    } & CommonHandlers)
  | ({
      activeMenu: 'Categories'
      selectedItem: CategoryRow | null // ✅ cho phép null
      getStatusColor: (status: boolean) => string
      onDelete?: (id: string) => void
      onEdit: (item: CategoryRow) => void
    } & CommonHandlers)
  | ({
      activeMenu: 'Orders'
      selectedItem: OrderRow | null // ✅ cho phép null
      onEdit: (item: OrderRow) => void
      onConfirm?: (item: OrderRow) => void
      getStatusColor?: (status: boolean) => string
    } & CommonHandlers)
  | ({
      activeMenu: 'Products'
      selectedItem: ProductRow | null // ✅ cho phép null
      onDelete?: (id: string) => void
      onEdit: (item: ProductRow) => void
    } & CommonHandlers)

export const RightDetailPanel = (props: RightDetailPanelProps) => {
  if (!props.selectedItem) return null // ✅ tránh render khi chưa chọn

  switch (props.activeMenu) {
    case 'Users':
      return (
        <UserDetailPanel
          selectedItem={props.selectedItem}
          onClose={props.onClose}
          onDelete={props.onDelete}
          onEdit={props.onEdit}
        />
      )

    case 'Categories':
      return (
        <CategoryDetailPanel
          selectedItem={props.selectedItem}
          getStatusColor={props.getStatusColor}
          onClose={props.onClose}
          onDelete={props.onDelete}
          onEdit={props.onEdit}
        />
      )

    case 'Orders':
      return (
        <OrderDetailPanel
          selectedItem={props.selectedItem}
          onClose={props.onClose}
          onEdit={props.onEdit}
          onConfirm={props.onConfirm}
        />
      )

    case 'Products':
    default:
      return (
        <ProductDetailPanel
          selectedItem={props.selectedItem}
          onClose={props.onClose}
          onDelete={props.onDelete}
          onEdit={props.onEdit}
        />
      )
  }
}
