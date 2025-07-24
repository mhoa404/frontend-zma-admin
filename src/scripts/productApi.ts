import { BACKEND_API } from '../scripts/api';
import type { UIProductRow } from '../interfaces/TableRow.interface';
import axios from 'axios';

type ProductWithPopulatedCategory = Omit<UIProductRow, 'category_id' | 'category_name'> & {
  category_id?: {
    _id: string;
    name: string;
  };
};

export interface UpdateProductPayload {
  name: string;
  price: number;
  sale_price?: number;
  description?: string;
  category_id: string;
}

// Lấy danh sách sản phẩm
export const fetchProducts = async (): Promise<UIProductRow[]> => {
  const token = localStorage.getItem('access_token');

  const res = await fetch(`${BACKEND_API}/products`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error('Lỗi khi gọi API sản phẩm');
  }

  const data = await res.json();

  const mapped: UIProductRow[] = (data as ProductWithPopulatedCategory[]).map((item) => ({
    ...item,
    category_id: item.category_id?._id ?? '',
    category_name: item.category_id?.name || 'Không rõ danh mục',
    description: item.description || 'Không có mô tả',
    img_url: item.img_url || '',
  }));

  return mapped;
};

// Xoá sản phẩm
export const deleteProduct = async (id: string) => {
  const token = localStorage.getItem('access_token');

  const res = await fetch(`${BACKEND_API}/products/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error('Xoá sản phẩm thất bại');
  return res.json();
};

export const createProduct = async (product: {
  name: string;
  price: number;
  sale_price?: number;
  description?: string;
  category_id: string;
}) => {
  const token = localStorage.getItem('access_token');

  const res = await axios.post(`${BACKEND_API}/products/create`, product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const updateProduct = async (id: string, data: UpdateProductPayload) => {
  const token = localStorage.getItem('access_token');
  const res = await fetch(`${BACKEND_API}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Cập nhật sản phẩm thất bại');
  return await res.json();
};
