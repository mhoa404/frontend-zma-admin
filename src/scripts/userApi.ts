import { BACKEND_API } from '../scripts/api'
import type { TableRow } from '../interfaces/TableRow.interface'
import axios from 'axios';

export const fetchUsers = async (): Promise<TableRow[]> => {
  const token = localStorage.getItem('access_token')
  const res = await fetch(`${BACKEND_API}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  if (res.status === 403) {
    throw new Error('403 Forbidden - Bạn không có quyền truy cập')
  }

  const data = await res.json()
  if (!Array.isArray(data)) {
    throw new Error('Dữ liệu không hợp lệ')
  }

  return data
}

export const deleteUser = async (id: string) => {
  const token = localStorage.getItem('access_token')
  const res = await fetch(`${BACKEND_API}/users/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Xoá user thất bại')
  return res.json()
}

export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
  role?: string; // optional: mặc định BE đã là admin
}) => {
  const token = localStorage.getItem('access_token');
  const res = await axios.post(`${BACKEND_API}/users/create`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};


