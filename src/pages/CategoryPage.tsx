// src/pages/CategoryPage.tsx
import { useEffect, useState } from 'react'
import { getStatusColor } from '../utils/statusColor'
import type { ColumnDef, TableRow } from '../interfaces/TableRow.interface'
import TableComponent from '../components/Table'
import TbodyCategories from '../components/Table/TBodyCategory'
import { RightDetailPanel } from '../components/RightDetailPanel'
import { fetchCategories } from '../scripts/categoryApi'

const CategoryPage = () => {
  const [categories, setCategories] = useState<TableRow[]>([])
  const [selectedItem, setSelectedItem] = useState<TableRow | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchCategories()
        setCategories(data)
      } catch (error) {
        console.error('Lỗi khi lấy danh mục:', error)
      }
    }

    load()
  }, [])

  const columns: ColumnDef[] = [
    { header: 'Name', field: 'name' },
    {
      header: 'Created At',
      field: 'create_at',
      render: (item) =>
        item.create_at
          ? new Date(item.create_at).toLocaleDateString()
          : 'Không rõ',
    },
    {
      header: 'Active',
      field: 'is_active',
      render: (item) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
            item.is_active ?? false
          )}`}
        >
          {item.is_active ? 'Yes' : 'No'}
        </span>
      ),
    },
  ]

  return (
    <>
      <div className="flex flex-1 overflow-hidden">
        <main className={`p-6 transition-all duration-300 ease-in-out ${selectedItem ? 'w-[calc(100%-320px)]' : 'w-full'}`}>
          <TableComponent
            columns={columns}
            data={categories}
            selectedItem={selectedItem}
            onRowClick={setSelectedItem}
            BodyComponent={TbodyCategories}
          />
        </main>

        <div className={`w-80 h-full bg-white border-l border-gray-200 fixed right-0 top-0 z-50 transform transition-transform duration-300 ${selectedItem ? 'translate-x-0' : 'translate-x-full'}`}>
          <RightDetailPanel
            selectedItem={selectedItem}
            activeMenu="Categories"
            getStatusColor={(active) =>
              active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }
            onClose={() => setSelectedItem(null)}
          />
        </div>
      </div>
    </>
  )
}

export default CategoryPage
