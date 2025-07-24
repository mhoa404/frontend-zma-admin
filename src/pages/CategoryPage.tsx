import { useEffect, useState } from 'react';
import { getStatusColor } from '../utils/statusColor';
import type { ColumnDef, TableRow } from '../interfaces/TableRow.interface';
import TableComponent from '../components/Table';
import TbodyCategories from '../components/Table/TBodyCategory';
import { RightDetailPanel } from '../components/RightDetailPanel';
import {
  fetchCategories,
  deleteCategory,
  createCategory,
  updateCategory,
} from '../scripts/categoryApi';
import Search from '../components/Search';
import FormModal from '../components/FormModal';

const CategoryPage = () => {
  const [categories, setCategories] = useState<TableRow[]>([]);
  const [selectedItem, setSelectedItem] = useState<TableRow | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null); // ✅

  const [form, setForm] = useState({ name: '' });
  const [editForm, setEditForm] = useState({ name: '' });

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error('Lỗi khi lấy danh mục:', error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleFormChange = (field: keyof typeof form, value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEditFormChange = (field: keyof typeof editForm, value: string) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleStartEdit = (item: TableRow) => {
    setEditForm({ name: item.name || '' });
    setEditingId(item._id?.toString() || null); 
    setShowEditModal(true);
  };

  const handleCreateCategory = async () => {
    const name = form.name.trim();
    if (!name) {
      alert('⚠️ Vui lòng nhập tên danh mục');
      return;
    }

    try {
      await createCategory({ name });
      alert('✅ Đã thêm danh mục');
      setShowModal(false);
      setForm({ name: '' });
      await loadCategories();
    } catch (error) {
      alert('❌ Thêm danh mục thất bại');
      console.error(error);
    }
  };

  const handleUpdateCategory = async () => {
    const name = editForm.name.trim();
    if (!name) {
      alert('⚠️ Vui lòng nhập tên danh mục');
      return;
    }

    if (!editingId) {
      alert('❌ Không tìm thấy ID danh mục để cập nhật');
      return;
    }

    try {
      await updateCategory(editingId, { name });
      alert('✅ Cập nhật danh mục thành công');
      setShowEditModal(false);
      setEditingId(null);
      await loadCategories();
    } catch (error) {
      alert('❌ Cập nhật thất bại');
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm('Bạn có chắc muốn xoá danh mục này?');
    if (!confirm) return;
    try {
      await deleteCategory(id);
      alert('Đã xoá danh mục');
      setSelectedItem(null);
      await loadCategories();
    } catch (err) {
      alert('Xoá thất bại');
      console.error(err);
    }
  };

  const columns: ColumnDef[] = [
    { header: 'Name', field: 'name' },
    {
      header: 'Created At',
      field: 'create_at',
      render: item =>
        item.create_at
          ? new Date(item.create_at).toLocaleDateString()
          : 'Không rõ',
    },
    {
      header: 'Active',
      field: 'is_active',
      render: item => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
            item.is_active ?? false
          )}`}
        >
          {item.is_active ? 'Yes' : 'No'}
        </span>
      ),
    },
  ];

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="flex justify-between items-center px-6 pt-6">
        <button
          className="bg-[#1e293b] text-white px-4 py-2 rounded-md hover:bg-gray-700 text-sm"
          onClick={() => setShowModal(true)}
        >
          Add Categories +
        </button>
        <Search />
      </div>

      <main
        className={`p-6 transition-all duration-300 ease-in-out ${
          selectedItem ? 'w-[calc(100%-320px)]' : 'w-full'
        }`}
      >
        <TableComponent
          columns={columns}
          data={categories}
          selectedItem={selectedItem}
          onRowClick={setSelectedItem}
          BodyComponent={TbodyCategories}
        />
      </main>

      <div
        className={`w-80 h-full bg-white border-l border-gray-200 fixed right-0 top-0 z-50 transform transition-transform duration-300 ${
          selectedItem ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <RightDetailPanel
          selectedItem={selectedItem}
          activeMenu="Categories"
          getStatusColor={getStatusColor}
          onClose={() => setSelectedItem(null)}
          onDelete={handleDelete}
          onEdit={handleStartEdit}
        />
      </div>

      {showModal && (
        <FormModal<typeof form>
          mode="add"
          title="Add Category"
          form={form}
          fields={[{ key: 'name', label: 'Category Name' }]}
          onChange={handleFormChange}
          onSubmit={handleCreateCategory}
          onClose={() => {
            setShowModal(false);
            setForm({ name: '' });
          }}
        />
      )}

      {showEditModal && (
        <FormModal<typeof editForm>
          mode="edit"
          title="Edit Category"
          submitText="Save"
          form={editForm}
          fields={[{ key: 'name', label: 'Category Name' }]}
          onChange={handleEditFormChange}
          onSubmit={handleUpdateCategory} 
          onClose={() => {
            setShowEditModal(false);
            setEditingId(null);
          }}
        />
      )}
    </div>
  );
};

export default CategoryPage;
