import api from "./api";

export const fetchAllOrders = async () => {
  const res = await api.get("/orders/all");
  return res.data;
};

export const cancelOrder = async (id: string) => {
  const res = await api.put(`/orders/status/${id}`, {
    status: 'cancelled',
  });
  return res.data;
};

export const updateOrderStatus = async (id: string, status: string) => {
  return await api.put(`/orders/status/${id}`, {
    status,
  });
};
