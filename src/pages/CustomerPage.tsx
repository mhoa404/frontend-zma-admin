import { useEffect, useState } from 'react';
import TableComponent from '../components/Table';
import TbodyUsers from '../components/Table/TbodyUsers';
import { RightDetailPanel } from '../components/RightDetailPanel';
import { formatDate } from '../utils/formatDate';
import type { ColumnDef, TableRow } from '../interfaces/TableRow.interface';
import {
  createUser,
  fetchUsers,
  deleteUser,
  updateUser,
} from '../scripts/userApi';
import Search from '../components/Search';
import type { AxiosErrorResponse } from '../interfaces/AxiosError.interface';
import FormModal from '../components/FormModal';

const CustommerPage = () => {
  const [users, setUsers] = useState<TableRow[]>([]);
  const [selectedItem, setSelectedItem] = useState<TableRow | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin',
  });

  const [editForm, setEditForm] = useState<typeof form>(form);

  const handleFormChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditFormChange = (field: string, value: string) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleStartEdit = (item: TableRow) => {
    setEditForm({
      name: item.name || '',
      email: item.email || '',
      password: '',
      role: item.role || 'user',
    });
    setEditingId(item._id?.toString() || null);
    setShowEditModal(true);
  };

  const handleCreateUser = async () => {
    try {
      await createUser(form);
      alert('✅ Tạo tài khoản admin thành công');
      setShowModal(false);
      setForm({ name: '', email: '', password: '', role: 'admin' });
      await loadUsers();
    } catch (err) {
      const error = err as AxiosErrorResponse;
      console.error(error);
      alert(error.response?.data?.message || '❌ Tạo tài khoản thất bại');
    }
  };

  const handleUpdateUser = async () => {
    if (!editingId) {
      alert('❌ Không tìm thấy ID người dùng cần cập nhật');
      return;
    }

    const payload: {
      name: string;
      password?: string;
      phone?: string;
      zalo_id?: string;
    } = {
      name: editForm.name,
    };

    if (editForm.password) payload.password = editForm.password;

    try {
      await updateUser(editingId, payload);
      alert('✅ Cập nhật người dùng thành công');
      setShowEditModal(false);
      setEditingId(null);
      await loadUsers();
    } catch (error) {
      console.error(error);
      alert('❌ Cập nhật người dùng thất bại');
    }
  };

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      const sorted = data.sort((a, b) => {
        if (a.role === 'admin' && b.role !== 'admin') return -1;
        if (a.role !== 'admin' && b.role === 'admin') return 1;
        return 0;
      });
      setUsers(sorted);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách người dùng:', error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Bạn có chắc chắn muốn xoá người dùng này?');
    if (!confirmed) return;

    try {
      await deleteUser(id);
      alert('Đã xoá người dùng');
      setSelectedItem(null);
      await loadUsers();
    } catch (err) {
      alert('Xoá thất bại');
      console.error(err);
    }
  };

  const columns: ColumnDef[] = [
    { header: 'Họ tên', field: 'name' },
    { header: 'Email', field: 'email' },
    { header: 'Số điện thoại', field: 'phone' },
    {
      header: 'Vai trò',
      field: 'role',
      render: (item) => (
        <span
          className={`text-white px-2 py-1 rounded text-xs font-medium ${
            item.role === 'admin' ? 'bg-red-500' : 'bg-blue-500'
          }`}
        >
          {item.role === 'admin' ? 'Admin' : 'User'}
        </span>
      ),
    },
    {
      header: 'Ngày tạo',
      field: 'create_at',
      render: (item) => formatDate(item.create_at!),
    },
  ];

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="flex justify-between items-center px-6 pt-6">
        <button
          className="bg-[#1e293b] text-white px-4 py-2 rounded-md hover:bg-gray-700 text-sm"
          onClick={() => setShowModal(true)}
        >
          Add Users +
        </button>
        <Search />
      </div>

      <main
        className={`p-6 pt-4 transition-all duration-300 ease-in-out ${
          selectedItem ? 'w-[calc(100%-320px)]' : 'w-full'
        }`}
      >
        <TableComponent
          columns={columns}
          data={users}
          selectedItem={selectedItem}
          onRowClick={setSelectedItem}
          BodyComponent={TbodyUsers}
        />
      </main>

      <div
        className={`w-80 h-full bg-white border-l border-gray-200 fixed right-0 top-0 z-50 transform transition-transform duration-300 ${
          selectedItem ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <RightDetailPanel
          selectedItem={selectedItem}
          activeMenu="Users"
          getStatusColor={() => ''}
          onClose={() => setSelectedItem(null)}
          onDelete={handleDelete}
          onEdit={handleStartEdit}
        />
      </div>

      {showModal && (
        <FormModal
          mode="add"
          title="Add User"
          form={form}
          fields={[
            { key: 'name', label: 'Name' },
            { key: 'email', label: 'Email' },
            { key: 'password', label: 'Password', type: 'password' },
          ]}
          onChange={handleFormChange}
          onSubmit={handleCreateUser}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* Modal Sửa */}
      {showEditModal && (
        <FormModal
          mode="edit"
          title="Edit User"
          submitText="Save"
          form={editForm}
          fields={[
            { key: 'name', label: 'Name' },
            { key: 'email', label: 'Email', readOnly: true }, 
            { key: 'password', label: 'New Password', type: 'password' },
          ]}
          onChange={handleEditFormChange}
          onSubmit={handleUpdateUser}
          onClose={() => {
            setShowEditModal(false);
            setEditingId(null);
          }}
        />
      )}
    </div>
  );
};

export default CustommerPage;
