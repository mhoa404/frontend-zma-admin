// src/services/categoryApi.ts
import { BACKEND_API } from '../scripts/api';
import type { TableRow } from '../interfaces/TableRow.interface';
import axios from 'axios';

export const fetchCategories = async (): Promise<TableRow[]> => {
  const token = localStorage.getItem('access_token');

  try {
    const res = await fetch(`${BACKEND_API}/categories`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status} - Lỗi khi lấy danh mục`);

    const data = await res.json();
    if (!Array.isArray(data)) throw new Error('Dữ liệu danh mục không hợp lệ');

    return data;
  } catch (err) {
    console.error('❌ fetchCategories:', err);
    throw err;
  }
};

export const deleteCategory = async (id: string) => {
  const token = localStorage.getItem('access_token');

  try {
    const res = await fetch(`${BACKEND_API}/categories/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error('Xoá danh mục thất bại');
    return await res.json();
  } catch (err) {
    console.error('❌ deleteCategory:', err);
    throw err;
  }
};

export const createCategory = async (category: { name: string }) => {
  const token = localStorage.getItem('access_token');

  try {
    const res = await fetch(`${BACKEND_API}/categories/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    });

    if (!res.ok) throw new Error('Tạo danh mục thất bại');
    return await res.json();
  } catch (err) {
    console.error('❌ createCategory:', err);
    throw err;
  }
};

export const updateCategory = async (id: string, data: { name: string }) => {
  const token = localStorage.getItem('access_token');

  try {
    const res = await axios.put(`${BACKEND_API}/categories/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    console.error('❌ updateCategory:', err);
    throw err;
  }
};
