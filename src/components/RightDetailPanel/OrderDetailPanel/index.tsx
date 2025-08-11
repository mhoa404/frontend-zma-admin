import type { TableRow } from '../../../interfaces/TableRow.interface';
import { cancelOrder } from '../../../scripts/orderApi';

interface Props {
  selectedItem: TableRow;
  onClose: () => void;
  onEdit: (item: TableRow) => void;
  onConfirm?: (item: TableRow) => void;
}

const OrderDetailPanel = ({
  selectedItem,
  onClose,
  onConfirm
}: Props) => {
  const { orderId, name, value, status = '', date, order_items } = selectedItem;

  const lowerStatus = status.toLowerCase();
  const isConfirmed = lowerStatus === 'confirmed';
  const isCompleted = lowerStatus === 'completed';

  const handleCancel = async () => {
    const confirmed = window.confirm('Bạn có chắc muốn huỷ đơn hàng này?');
    if (!confirmed) return;

    try {
      await cancelOrder(orderId?.toString() || '');
      alert('✅ Đã huỷ đơn hàng');
      onClose();
    } catch (err) {
      console.error('❌ Lỗi huỷ đơn:', err);
      alert('❌ Không thể huỷ đơn hàng');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Order Detail</h2>
        <button
          onClick={onClose}
          className="text-xl text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>

      <div className="p-6 space-y-4 overflow-y-auto text-sm">
        <div>
          <span className="text-gray-500">Order ID:</span>
          <p className="text-gray-900 font-medium">{orderId}</p>
        </div>

        <div>
          <span className="text-gray-500">Payment Method:</span>
          <p className="text-gray-900">{name}</p>
        </div>

        <div>
          <span className="text-gray-500">Total:</span>
          <p className="text-gray-900">{value}</p>
        </div>

        <div>
          <span className="text-gray-500">Status:</span>
          <p className="text-gray-900 capitalize">{status}</p>
        </div>

        <div>
          <span className="text-gray-500">Created At:</span>
          <p className="text-gray-900">{date?.toString()}</p>
        </div>

        {Array.isArray(order_items) && order_items.length > 0 && (
          <div>
            <span className="text-gray-500">Sản phẩm đã đặt:</span>
            <ul className="mt-1 list-disc ml-5 space-y-1 text-gray-900 text-sm">
              {order_items.map((item, index) => (
                <li key={index}>
                  {item.quantity} x {item.name} – {(item.price * item.quantity).toLocaleString()}₫
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="p-6 mt-auto border-t border-gray-200 space-y-2">
        {onConfirm && (
          <button
            disabled={isCompleted}
            onClick={() => onConfirm(selectedItem)}
            className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${isCompleted
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
          >
            {isConfirmed ? 'Đang giao hàng' : 'Xác nhận đơn hàng'}
          </button>
        )}

        {!isConfirmed && (
          <button
            onClick={handleCancel}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md"
          >
            Huỷ đơn hàng
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderDetailPanel;
