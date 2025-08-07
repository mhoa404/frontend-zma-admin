import type { TableRow } from '../../interfaces/TableRow.interface';
import UserDetailPanel from '../UserDetailPanel';
import CategoryDetailPanel from '../CategoryDetailPanel';
import ProductDetailPanel from '../ProductDetailPanel';
import OrderDetailPanel from '../OrderDetailPanel';

interface Props {
  selectedItem: TableRow | null;
  activeMenu: string;
  getStatusColor: (status: boolean) => string;
  onClose: () => void;
  onDelete?: (id: string) => void;
  onEdit: (item: TableRow) => void;
  onConfirm?: (item: TableRow) => void;
}

export const RightDetailPanel = ({
  selectedItem,
  activeMenu,
  getStatusColor,
  onClose,
  onDelete,
  onEdit,
  onConfirm, // ✅
}: Props) => {
  if (!selectedItem) return null;

  switch (activeMenu) {
    case 'Users':
      return (
        <UserDetailPanel
          selectedItem={selectedItem}
          onClose={onClose}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      );

    case 'Categories':
      return (
        <CategoryDetailPanel
          selectedItem={selectedItem}
          getStatusColor={getStatusColor}
          onClose={onClose}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      );

    case 'Orders':
      return (
        <OrderDetailPanel
          selectedItem={selectedItem}
          onClose={onClose}
          onEdit={onEdit}
          onConfirm={onConfirm} // ✅ truyền xuống
        />
      );

    default:
      return (
        <ProductDetailPanel
          selectedItem={selectedItem}
          onClose={onClose}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      );
  }
};
