import { useOrderListStore } from '../store/Order/orderListStore';
import { fetchAllOrders, updateOrderStatus } from '../scripts/orderApi';
import type { OrderItem } from '../interfaces/OrderItem.interface';
import type { TableRow } from '../interfaces/TableRow.interface';

interface OrderResponse {
  _id: string;
  payment_method?: string;
  status: string;
  total_price: number;
  created_at: string;
  order_items: OrderItem[];
}

export const useOrderHandlers = () => {
  const { orders, selectedItem, setOrders, setSelectedItem, setLoading } = useOrderListStore();

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data: OrderResponse[] = await fetchAllOrders();

      const mapped: TableRow[] = data.map((order) => ({
        _id: order._id,
        orderId: order._id,
        name: order.payment_method?.toUpperCase() || 'UNKNOWN',
        status: order.status,
        value: `${order.total_price.toLocaleString()}₫`,
        date: order.created_at,
        order_items: order.order_items,
      }));

      setOrders(mapped);
    } catch (err) {
      console.error('❌ Lỗi tải đơn hàng:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (item: TableRow) => {
    const confirmed = window.confirm('Bạn có chắc muốn xác nhận đơn hàng này?');
    if (!confirmed) return;

    try {
      await updateOrderStatus(item.orderId?.toString() || '', 'confirmed');
      alert('✅ Đã xác nhận đơn hàng');
      setSelectedItem(null);
      await loadOrders();
    } catch (err) {
      console.error('❌ Lỗi xác nhận đơn hàng:', err);
      alert('❌ Không thể xác nhận đơn hàng');
    }
  };

  const handleEdit = (item: TableRow) => {
    alert(`Mở modal cập nhật đơn hàng: ${item.orderId}`);
  };

  return {
    orders,
    selectedItem,
    loadOrders,
    handleEdit,
    handleConfirm,
    setSelectedItem,
  };
};
