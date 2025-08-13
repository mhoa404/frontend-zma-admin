import api from "./api";
import { type OrderStatus } from "../types/order";
import { type PaymentStatus } from "../types/payment";
// Lấy tất cả đơn hàng (admin)
export const fetchAllOrders = async () => {
  const res = await api.get("/orders"); // Backend đã chặn role admin
  return res.data;
};

// Cập nhật trạng thái đơn hàng (admin)
export const updateOrderStatus = async (id: string, status: OrderStatus) => {
  const res = await api.put(`/orders/status/${id}`, { status });
  return res.data;
};

// Cập nhật trạng thái thanh toán (admin)
export const updatePaymentStatus = async (
  id: string,
  payment_status: PaymentStatus
) => {
  const res = await api.put(`/orders/payment-status/${id}`, { payment_status });
  return res.data;
};
