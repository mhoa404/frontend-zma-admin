import { useCallback } from 'react';
import { useCustomerFormStore } from '../store/Customer/customerFormStore';
import { useCustomerListStore } from '../store/Customer/customerListStore';
import { useCustomerModalStore } from '../store/Customer/customerModalStore';
import { createUser, deleteUser, fetchUsers, updateUser } from '../scripts/userApi';
import type { UserRow } from '../interfaces/Table/UserRow.interface';

export const useCustomerHandlers = () => {
  const { form, editForm, editingId, setForm, setEditForm, setEditingId } = useCustomerFormStore();
  const { users, setUsers, setSelectedItem, setLoading } = useCustomerListStore();
  const { setShowModal, setShowEditModal } = useCustomerModalStore();

  const fetchAllUsers = useCallback(async () => {
    setLoading(true);
    const data = await fetchUsers();
    const sorted = data.sort((a) => (a.role === 'admin' ? -1 : 1));
    setUsers(sorted);
    setLoading(false);
  }, [setUsers, setLoading]);

  const handleCreateUser = async () => {
    await createUser(form);
    alert('✅ Tạo người dùng thành công');
    setForm({ name: '', email: '', password: '', role: 'admin' });
    setShowModal(false);
    await fetchAllUsers();
  };

  const handleUpdateUser = async () => {
    if (!editingId) return alert('❌ Thiếu ID');

    const payload: {
      name: string;
      password?: string;
      phone?: string;
      zalo_id?: string;
    } = { name: editForm.name };

    if (editForm.password) payload.password = editForm.password;

    await updateUser(editingId, payload);
    alert('✅ Cập nhật người dùng thành công');
    setShowEditModal(false);
    setEditingId(null);
    await fetchAllUsers();
  };

  const handleDeleteUser = async (id: string) => {
    const confirmed = window.confirm('Bạn có chắc chắn muốn xoá người dùng này?');
    if (!confirmed) return;

    await deleteUser(id);
    alert('✅ Đã xoá người dùng');
    setSelectedItem(null);
    await fetchAllUsers();
  };

  const handleStartEdit = (item: UserRow) => {
    setEditForm({
      name: item.name || '',
      email: item.email || '',
      password: '',
      role: item.role || 'user',
    });
    setEditingId(item._id?.toString() || null);
    setShowEditModal(true);
  };

  return {
    form,
    editForm,
    users,
    editingId,
    fetchAllUsers,
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser,
    handleStartEdit,
    setForm,
    setEditForm,
    setShowModal,
    setShowEditModal,
    setSelectedItem,
  };
};
