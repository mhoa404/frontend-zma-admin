import { useEffect } from 'react';
import { useCustomerHandlers } from '../hooks/useCustomerHandlers';

import TableComponent from '../components/Table';
import TbodyUsers from '../components/Table/TbodyUsers';
import { RightDetailPanel } from '../components/RightDetailPanel';
import { formatDate } from '../utils/formatDate';
import type { ColumnDef } from '../interfaces/ColumnDef.interface';
import FormModal from '../components/FormModal';
import Search from '../components/Search';

import { useCustomerModalStore } from '../store/Customer/customerModalStore';
import { useCustomerListStore } from '../store/Customer/customerListStore';
import type { UserRow } from '../interfaces/Table/UserRow.interface';

const CustommerPage = () => {
  const {
    users,
    form,
    editForm,
    fetchAllUsers,
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser,
    handleStartEdit,
    setForm,
    setEditForm,
    setSelectedItem,
  } = useCustomerHandlers();

  const { showModal, showEditModal, setShowModal, setShowEditModal } = useCustomerModalStore();
  const { selectedItem } = useCustomerListStore();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const columns: ColumnDef<UserRow>[] = [
    {
      header: 'Họ tên',
      field: 'name',
      render: (item) => item.name || item.zalo_id || '(Chưa đặt tên)',
    },
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
      {/* Header + Add */}
      <div className="flex justify-between items-center px-6 pt-6">
        <button
          className="bg-[#1e293b] text-white px-4 py-2 rounded-md hover:bg-gray-700 text-sm"
          onClick={() => setShowModal(true)}
        >
          Add Users +
        </button>
        <Search />
      </div>

      {/* Table */}
      <main
        className={`p-6 pt-4 transition-all duration-300 ease-in-out ${
          selectedItem ? 'w-[calc(100%-320px)]' : 'w-full'
        }`}
      >
        <TableComponent
          columns={columns}
          data={users}
          BodyComponent={TbodyUsers}
          selectedItem={selectedItem}
          onRowClick={setSelectedItem}
        />
      </main>

      {/* Right panel */}
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
          onDelete={handleDeleteUser}
          onEdit={handleStartEdit}
        />
      </div>

      {/* Add Modal */}
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
          onChange={(field, value) => setForm({ ...form, [field]: value })}
          onSubmit={handleCreateUser}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* Edit Modal */}
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
          onChange={(field, value) => setEditForm({ ...editForm, [field]: value })}
          onSubmit={handleUpdateUser}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
};

export default CustommerPage;
