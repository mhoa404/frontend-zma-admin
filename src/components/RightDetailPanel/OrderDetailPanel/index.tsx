import { formatDate } from '../../../utils/formatDate';
import type { OrderRow } from '../../../interfaces/Table/OrderRow.interface';
import type { JSX } from 'react';

interface Props {
  selectedItem: OrderRow;
  onClose: () => void;
  onConfirm?: (item: OrderRow) => void;
  onShipping?: (item: OrderRow) => void;
  onCancel?: (item: OrderRow) => void;
}

const OrderDetailPanel = ({ selectedItem, onClose, onConfirm, onShipping, onCancel }: Props) => {
  const renderActions = () => {
    if (selectedItem.status === 'cancelled') return null;

    const actions: JSX.Element[] = [];

    if (selectedItem.status === 'pending') {
      if (onConfirm) {
        actions.push(
          <button
            key="confirm"
            onClick={() => onConfirm(selectedItem)}
            className="w-full border-2 border-green-600 text-green-600 py-2 px-4 rounded-lg hover:bg-green-600 hover:text-white"
          >
            Xác nhận đơn
          </button>
        );
      }
      if (onCancel) {
        actions.push(
          <button
            key="cancel"
            onClick={() => onCancel(selectedItem)}
            className="w-full border-2 border-red-600 text-red-600 py-2 px-4 rounded-lg hover:bg-red-600 hover:text-white"
          >
            Huỷ đơn
          </button>
        );
      }
    }

    if (selectedItem.status === 'confirmed' && onShipping) {
      actions.push(
        <button
          key="shipping"
          onClick={() => onShipping(selectedItem)}
          className="w-full border-2 border-blue-600 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-600 hover:text-white"
        >
          Chuyển sang đang giao
        </button>
      );
    }

    return actions;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="pl-3 h-20 border-b border-gray-200">
        <div className="flex items-center p-3 justify-between">
          <h3 className="text-2xl font-bold text-gray-900">Order Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto space-y-4 text-sm">
        <div>
          <h5 className="font-medium text-gray-900">Người đặt</h5>
          <p>{selectedItem.customer_name || '-'}</p>
        </div>
        <div>
          <h5 className="font-medium text-gray-900">Số điện thoại</h5>
          <p>{selectedItem.phone || '-'}</p>
        </div>
        <div>
          <h5 className="font-medium text-gray-900">Địa chỉ</h5>
          <p>{selectedItem.full_address || '-'}</p>
        </div>
        <div>
          <h5 className="font-medium text-gray-900">Tổng tiền</h5>
          <p>{selectedItem.value}</p>
        </div>
        <div>
          <h5 className="font-medium text-gray-900">Phương thức thanh toán</h5>
          <p>{selectedItem.payment_method}</p>
        </div>
        <div>
          <h5 className="font-medium text-gray-900">Trạng thái</h5>
          <p>{selectedItem.status}</p>
        </div>
        <div>
          <h5 className="font-medium text-gray-900">Ngày tạo</h5>
          <p>{formatDate(selectedItem.date)}</p>
        </div>
      </div>

      {renderActions() && (
        <div className="p-6 border-t border-gray-200 space-y-2">
          {renderActions()}
        </div>
      )}
    </div>
  );
};

export default OrderDetailPanel;