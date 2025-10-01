// ✅ useOrderHandlers.ts (đã fix useCallback và thêm handleShipping)
import { useCallback } from 'react';
import { useOrderListStore } from '../store/Order/orderListStore';
import { fetchAllOrders, updateOrderStatus } from '../scripts/orderApi';
import type { OrderRow } from '../interfaces/Table/OrderRow.interface';
import type { OrderItem } from '../interfaces/OrderItem.interface';
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

  const loadOrders = useCallback(async () => {
    try {
      setLoading(true);
      const data: OrderResponse[] = await fetchAllOrders();
      const mapped: OrderRow[] = data.map((order) => ({
        _id: order._id,
        orderId: order._id,
        payment_method: order.payment_method?.toUpperCase() || 'UNKNOWN',
        status: order.status as OrderStatus,
        value: `${order.total_price.toLocaleString()}₫`,
        date: order.created_at,
        order_items: order.order_items,
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
  }, [setOrders, setLoading]);

  const handleConfirm = async (item: OrderRow) => {
    const confirmed = window.confirm('Bạn có chắc muốn xác nhận đơn hàng này?');
    if (!confirmed) return;

    try {
      await updateOrderStatus(item.orderId || '', 'confirmed');
      alert('Đã xác nhận đơn hàng');
      setSelectedItem(null);
      await loadOrders();
    } catch (err) {
      console.error('Lỗi xác nhận đơn hàng:', err);
      alert('Không thể xác nhận đơn hàng');
    }
  };

  const handleShipping = async (item: OrderRow) => {
    const confirm = window.confirm('Chuyển đơn hàng sang đang giao?');
    if (!confirm) return;

    try {
      await updateOrderStatus(item.orderId || '', 'shipping');
      alert('Đơn hàng đang được giao');
      setSelectedItem(null);
      await loadOrders();
    } catch (err) {
      console.error('Lỗi chuyển trạng thái:', err);
      alert('Không thể chuyển trạng thái đơn hàng');
    }
  };

  const handleEdit = (item: OrderRow) => {
    alert(`Mở modal cập nhật đơn hàng: ${item.orderId}`);
  };

  const handleCancel = async (item: OrderRow) => {
  const confirm = window.confirm('Bạn có chắc muốn huỷ đơn hàng này?');
  if (!confirm) return;

  try {
    await updateOrderStatus(item.orderId || '', 'cancelled');
    alert('Đơn hàng đã bị huỷ');
    setSelectedItem(null);
    await loadOrders();
  } catch (err) {
    console.error('Lỗi huỷ đơn hàng:', err);
    alert('Không thể huỷ đơn hàng');
  }
};


  return {
    orders,
    selectedItem,
    loadOrders,
    handleEdit,
    handleConfirm,
    handleShipping,
    setSelectedItem,
    handleCancel
  };
};
