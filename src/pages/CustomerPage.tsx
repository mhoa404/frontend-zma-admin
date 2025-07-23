// src/pages/CustommerPage.tsx
import { useEffect, useState } from 'react'
import TableComponent from '../components/Table'
import TbodyUsers from '../components/Table/TbodyUsers'
import { RightDetailPanel } from '../components/RightDetailPanel'
import { formatDate } from '../utils/formatDate'
import type { ColumnDef, TableRow } from '../interfaces/TableRow.interface'
import { fetchUsers, deleteUser } from '../scripts/userApi'
import Search from '../components/Search'
import AddUsersModal from '../components/AddUsersModal'

const CustommerPage = () => {
  const [users, setUsers] = useState<TableRow[]>([])
  const [selectedItem, setSelectedItem] = useState<TableRow | null>(null)
  const [showModal, setShowModal] = useState(false)


  const loadUsers = async () => {
    try {
      const data = await fetchUsers()
      setUsers(data)
    } catch (error) {
      console.error('Lỗi khi lấy danh sách người dùng:', error)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Bạn có chắc chắn muốn xoá người dùng này?')
    if (!confirmed) return

    try {
      await deleteUser(id)
      alert('Đã xoá người dùng')
      setSelectedItem(null)
      await loadUsers()
    } catch (err) {
      alert('Xoá thất bại')
      console.error(err)
    }
  }

  const columns: ColumnDef[] = [
    { header: 'Họ tên', field: 'name' },
    { header: 'Email', field: 'email' },
    { header: 'Số điện thoại', field: 'phone' },
    { header: 'Vai trò', field: 'role' },
    {
      header: 'Ngày tạo',
      field: 'create_at',
      render: (item) => formatDate(item.create_at!),
    },

  ]

  return (
    <div className="flex flex-col flex-1 overflow-hidden ">
      <div className="flex justify-between items-center px-6 pt-6">
        <button
          className="bg-[#1e293b] text-white px-4 py-2 rounded-md hover:bg-gray-700 text-sm"
          onClick={() => setShowModal(true)}
        >
          Add Users +
        </button>

        <Search />
      </div>

      <main className={`p-6 pt-4 transition-all duration-300 ease-in-out ${selectedItem ? 'w-[calc(100%-320px)]' : 'w-full'}`}>
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
          onDelete={handleDelete}
        />
      </div>

      {showModal && (
        <AddUsersModal onClose={() => setShowModal(false)} />
      )}

    </div>
  )

}

export default CustommerPage
