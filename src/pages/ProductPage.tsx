// src/pages/ProductPage.tsx
import { useEffect, useState } from 'react'
import TableComponent from '../components/Table'
import TbodyProducts from '../components/Table/TBodyProduct'
import { getStatusColor } from '../utils/statusColor'
import { RightDetailPanel } from '../components/RightDetailPanel'
import type { ColumnDef, UIProductRow } from '../interfaces/TableRow.interface'
import { deleteProduct, fetchProducts } from '../scripts/productApi'

const ProductPage = () => {
  const [products, setProducts] = useState<UIProductRow[]>([])
  const [selectedItem, setSelectedItem] = useState<UIProductRow | null>(null)

  const loadProducts = async () => {
    try {
      const data = await fetchProducts()
      setProducts(data)
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const columns: ColumnDef[] = [
    { header: 'Image', field: 'img_url' },
    { header: 'Name', field: 'name' },
    {
      header: 'Price',
      field: 'price',
      render: (item) => `${item.price?.toLocaleString()} VNĐ`,
    },
    { header: 'Category', field: 'category_name' },
    {
      header: 'Created At',
      field: 'create_at',
      render: (item) => new Date(item.create_at!).toLocaleDateString(),
    },
    {
      header: 'Available',
      field: 'available',
      render: (item) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
            item.available ?? false
          )}`}
        >
          {item.available ? 'Yes' : 'No'}
        </span>
      ),
    },
  ]

  const handleDelete = async (id: string) => {
    const confirm = window.confirm('Bạn có chắc muốn xoá sản phẩm này?')
    if (!confirm) return
    try {
      await deleteProduct(id)
      alert('Đã xoá sản phẩm')
      setSelectedItem(null)
      await loadProducts() // ✅ cập nhật lại UI sau khi xoá
    } catch (err) {
      alert('Xoá thất bại')
      console.error(err)
    }
  }

  return (
    <div className="flex flex-1 overflow-hidden">
      <main
        className={`p-6 transition-all duration-300 ease-in-out ${
          selectedItem ? 'w-[calc(100%-320px)]' : 'w-full'
        }`}
      >
        <TableComponent
          columns={columns}
          BodyComponent={TbodyProducts}
          data={products}
          selectedItem={selectedItem}
          onRowClick={setSelectedItem}
        />
      </main>

      <div
        className={`w-80 h-full bg-white border-l border-gray-200 fixed right-0 top-0 z-50 transform transition-transform duration-300 ${
          selectedItem ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <RightDetailPanel
          selectedItem={selectedItem}
          activeMenu="Products"
          getStatusColor={getStatusColor}
          onClose={() => setSelectedItem(null)}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}

export default ProductPage
