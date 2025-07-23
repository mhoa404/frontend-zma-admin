// src/services/categoryApi.ts
import { BACKEND_API } from '../scripts/api'
import type { TableRow } from '../interfaces/TableRow.interface'

export const fetchCategories = async (): Promise<TableRow[]> => {
  const token = localStorage.getItem('access_token')

  const res = await fetch(`${BACKEND_API}/categories`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!res.ok) throw new Error(`HTTP ${res.status} - Lỗi khi lấy danh mục`)

  const data = await res.json()
  if (!Array.isArray(data)) throw new Error('Dữ liệu danh mục không hợp lệ')

  return data
}

export const deleteCategory = async (id: string) => {
  const token = localStorage.getItem('access_token')
  const res = await fetch(`${BACKEND_API}/categories/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Xoá danh mục thất bại')
  return res.json()
}
