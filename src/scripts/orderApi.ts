import api from "./api";

export const fetchAllOrders = async () => {
  const res = await api.get("/orders/all");
  return res.data;
};
