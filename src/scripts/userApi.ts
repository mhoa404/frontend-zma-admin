// src/scripts/userApi.ts
import api from "./api";
import type { TableRow } from "../interfaces/TableRow.interface";

export const fetchUsers = async (): Promise<TableRow[]> => {
  const res = await api.get("/users");
  return res.data;
};

export const deleteUser = async (id: string) => {
  const res = await api.delete(`/users/${id}`);
  return res.data;
};

export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
  role?: string;
}) => {
  const res = await api.post("/users/create", data);
  return res.data;
};

export const updateUser = async (
  id: string,
  data: Partial<{ name: string; phone?: string; zalo_id?: string; password?: string }>
) => {
  const res = await api.put(`/users/${id}`, data);
  return res.data;
};
