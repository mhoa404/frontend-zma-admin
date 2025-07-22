// src/pages/CustommerPage.tsx
import { useEffect, useState } from 'react'
import TableComponent from '../components/Table'
import TbodyUsers from '../components/Table/TbodyUsers'
import { RightDetailPanel } from '../components/RightDetailPanel'
import { formatDate } from '../utils/formatDate'
import type { ColumnDef, TableRow } from '../interfaces/TableRow.interface'
import { fetchUsers } from '../scripts/userApi'

const CustommerPage = () => {
  const [users, setUsers] = useState<TableRow[]>([])
  const [selectedItem, setSelectedItem] = useState<TableRow | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchUsers()
        setUsers(data)
      } catch (error) {
        console.error('Lỗi khi lấy danh sách người dùng:', error)
      }
    }

    load()
  }, [])

  const columns: ColumnDef[] = [
    { header: 'Họ tên', field: 'name' },
    { header: 'Email', field: 'email' },
    { header: 'Số điện thoại', field: 'phone' },
    {
      header: 'Ngày tạo',
      field: 'create_at',
      render: (item) => formatDate(item.create_at!),
    },
    { header: 'Vai trò', field: 'role' },
  ]

  return (
    <>
      <div className="flex flex-1 overflow-hidden">
        <main className={`p-6 transition-all duration-300 ease-in-out ${selectedItem ? 'w-[calc(100%-320px)]' : 'w-full'}`}>
          <TableComponent
            columns={columns}
            data={users}
            selectedItem={selectedItem}
            onRowClick={setSelectedItem}
            BodyComponent={TbodyUsers}
          />
        </main>

        <div className={`w-80 h-full bg-white border-l border-gray-200 fixed right-0 top-0 z-50 transform transition-transform duration-300 ${selectedItem ? 'translate-x-0' : 'translate-x-full'}`}>
          <RightDetailPanel
            selectedItem={selectedItem}
            activeMenu="Users"
            getStatusColor={() => ''}
            onClose={() => setSelectedItem(null)}
          />
        </div>
      </div>
    </>
  )
}

export default CustommerPage
