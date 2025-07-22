// src/services/userApi.ts
import { BACKEND_API } from '../scripts/api'
import type { TableRow } from '../interfaces/TableRow.interface'

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
