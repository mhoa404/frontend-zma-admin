import { BACKEND_API } from '../scripts/api'
import type { UIProductRow } from '../interfaces/TableRow.interface'

type ProductWithPopulatedCategory = Omit<UIProductRow, 'category_id' | 'category_name'> & {
  category_id?: {
    _id: string
    name: string
  }
}

export const fetchProducts = async (): Promise<UIProductRow[]> => {
  const token = localStorage.getItem('access_token')

  const res = await fetch(`${BACKEND_API}/products`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!res.ok) {
    throw new Error('Lỗi khi gọi API sản phẩm')
  }

  const data = await res.json()

  const mapped: UIProductRow[] = (data as ProductWithPopulatedCategory[]).map((item) => ({
    ...item,
    category_id: item.category_id?._id ?? '',
    category_name: item.category_id?.name || 'Không rõ danh mục',
    description: item.description || 'Không có mô tả',
    img_url: item.img_url || '',
  }))

  return mapped
}

export const deleteProduct = async (id: string) => {
  const token = localStorage.getItem('access_token')
  const res = await fetch(`${BACKEND_API}/products/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Xoá sản phẩm thất bại')
  return res.json()
}
