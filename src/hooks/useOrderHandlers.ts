import { useOrderListStore } from '../store/Order/orderListStore';
import { fetchAllOrders, updateOrderStatus } from '../scripts/orderApi';
import type { OrderItem } from '../interfaces/OrderItem.interface';
import type { UIOrderRow } from '../interfaces/UIOrderRow.interface';
import type { OrderStatus } from '../types/order';

interface OrderResponse {
  _id: string;
  payment_method?: string;
  status: string;
  total_price: number;
  created_at: string;
  order_items: OrderItem[];
  address_snapshot?: {
    full_name?: string;
    phone?: string;
    street?: string;
    ward?: string;
    district?: string;
    province?: string;
  };
}

export const useOrderHandlers = () => {
  const { orders, selectedItem, setOrders, setSelectedItem, setLoading } =
    useOrderListStore();

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data: OrderResponse[] = await fetchAllOrders();

      const mapped: UIOrderRow[] = data.map((order) => ({
        _id: order._id,
        orderId: order._id,
        payment_method: order.payment_method?.toUpperCase() || 'UNKNOWN',
        status: order.status as OrderStatus,
        value: `${order.total_price.toLocaleString()}₫`,
        date: order.created_at,
        order_items: order.order_items,
        // UI fields lấy từ snapshot
        customer_name: order.address_snapshot?.full_name || '',
        phone: order.address_snapshot?.phone || '',
        full_address: [
          order.address_snapshot?.street,
          order.address_snapshot?.ward,
          order.address_snapshot?.district,
          order.address_snapshot?.province,
        ]
          .filter(Boolean)
          .join(', '),
      }));

      setOrders(mapped);
    } catch (err) {
      console.error('❌ Lỗi tải đơn hàng:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (item: UIOrderRow) => {
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

  const handleEdit = (item: UIOrderRow) => {
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
