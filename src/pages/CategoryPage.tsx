import { useEffect } from 'react';
import { getStatusColor } from '../utils/statusColor';
import type { ColumnDef } from '../interfaces/ColumnDef.interface';
import type { CategoryRow } from '../interfaces/Table/CategoryRow.interface';

import TableComponent from '../components/Table';
import TbodyCategories from '../components/Table/TBodyCategory';
import { RightDetailPanel } from '../components/RightDetailPanel';
import Search from '../components/Search';
import FormModal from '../components/FormModal';

import { useCategoryFormStore } from '../store/Category/categoryFormStore';
import { useCategoryListStore } from '../store/Category/categoryListStore';
import { useCategoryModalStore } from '../store/Category/categoryModalStore';
import { useCategoryHandlers } from '../hooks/useCategoryHandlers';

const CategoryPage = () => {
  const { categories, selectedItem, loading, setSelectedItem } = useCategoryListStore();
  const { form, setForm, editForm, setEditForm } = useCategoryFormStore();
  const { showModal, setShowModal, showEditModal, setShowEditModal } = useCategoryModalStore();

  const {
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    handleStartEdit,
    fetchAllCategories
  } = useCategoryHandlers();

  useEffect(() => {
    fetchAllCategories();
  }, [fetchAllCategories]);

  const handleFormChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleEditFormChange = (field: string, value: string) => {
    setEditForm({ ...editForm, [field]: value });
  };

  const columns: ColumnDef<CategoryRow>[] = [
    { header: 'Name', field: 'name' },
    {
      header: 'Created At',
      field: 'create_at',
      render: (item) =>
        item.create_at ? new Date(item.create_at).toLocaleDateString() : 'Không rõ',
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
        {loading ? (
          <div className="text-sm text-gray-500">Đang tải danh mục...</div>
        ) : (
          <TableComponent
            columns={columns}
            data={categories}
            selectedItem={selectedItem}
            onRowClick={setSelectedItem}
            BodyComponent={TbodyCategories}
          />
        )}
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
          onDelete={handleDeleteCategory}
          onEdit={handleStartEdit}
        />
      </div>

      {showModal && (
        <FormModal
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
        <FormModal
          mode="edit"
          title="Edit Category"
          submitText="Save"
          form={editForm}
          fields={[{ key: 'name', label: 'Category Name' }]}
          onChange={handleEditFormChange}
          onSubmit={handleUpdateCategory}
          onClose={() => {
            setShowEditModal(false);
          }}
        />
      )}
    </div>
  );
};

export default CategoryPage;
