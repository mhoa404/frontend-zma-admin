import { useState } from 'react';
import { useProductHandlers } from '../hooks/useProductHandlers';
import TableComponent from '../components/Table';
import TbodyProducts from '../components/Table/TBodyProduct';
import { getStatusColor } from '../utils/statusColor';
import { RightDetailPanel } from '../components/RightDetailPanel';
import Search from '../components/Search';
import FormModal from '../components/FormModal';
import ImagePickerModal from '../components/ImagePickerModal';
import type { ColumnDef, UIProductRow } from '../interfaces/TableRow.interface';

const ProductPage = () => {
  const {
    products,
    categories,
    selectedItem,
    form,
    editForm,
    showModal,
    showEditModal,
    imagePreviewUrl,
    setForm,
    setEditForm,
    setSelectedItem,
    setShowModal,
    setShowEditModal,
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    handleStartEdit,
    handleFileChange,
    resetForm,
    resetUpload,
    resetEditForm,
  } = useProductHandlers();
  const [showImagePicker, setShowImagePicker] = useState(false);

  const columns: ColumnDef[] = [
    {
      header: 'Image',
      field: 'img_url',
      render: (item) =>
        item.img_url ? (
          <img src={item.img_url} alt="img" className="w-10 h-10 object-contain" />
        ) : (
          <span className="text-gray-400 text-sm italic">No image</span>
        ),
    },
    { header: 'Tên sản phẩm', field: 'name' },
    {
      header: 'Giá',
      field: 'price',
      render: (item) => `${item.price?.toLocaleString()} VNĐ`,
    },
    { header: 'Danh mục', field: 'category_name' },
    // {
    //   header: 'Ngày tạo',
    //   field: 'create_at',
    //   render: (item) => new Date(item.create_at!).toLocaleDateString(),
    // },
    {
      header: 'Hoạt động',
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
  ];

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-6 pt-6">
        <button
          className="bg-[#1e293b] text-white px-4 py-2 rounded-md hover:bg-gray-700 text-sm"
          onClick={() => setShowModal(true)}
        >
          Add Products +
        </button>
        <Search />
      </div>

      {/* Table */}
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
          onDelete={() => {
            if (selectedItem?._id) {
              handleDeleteProduct(selectedItem._id.toString());
            } else {
              alert('❌ Không tìm thấy ID hợp lệ để xoá');
            }
          }}
          onEdit={(item) => handleStartEdit(item as UIProductRow)}
        />
      </div>

      {/* Modal Add */}
      {showModal && (
        <FormModal
          mode="add"
          title="Add Product"
          submitText="Create"
          form={form}
          fields={[
            { key: 'name', label: 'Product Name' },
            { key: 'price', label: 'Price', type: 'number' },
            { key: 'sale_price', label: 'Sale Price', type: 'number' },
            { key: 'description', label: 'Description' },
            {
              key: 'category_id',
              label: 'Category',
              type: 'select',
              options: categories.map((cat) => ({ value: cat._id, label: cat.name })),
            },
          ]}
          onChange={(field, value) => setForm({ ...form, [field]: value })}
          onSubmit={handleCreateProduct}
          onClose={() => {
            setShowModal(false);
            resetForm();
            resetUpload();
          }}
          onFileChange={handleFileChange}
          onOpenImagePicker={() => setShowImagePicker(true)}
          imagePreviewUrl={imagePreviewUrl}
        />
      )}

      {/* Modal Edit */}
      {showEditModal && (
        <FormModal
          mode="edit"
          title="Edit Product"
          submitText="Save"
          form={editForm}
          fields={[
            { key: 'name', label: 'Product Name' },
            { key: 'price', label: 'Price', type: 'number' },
            { key: 'sale_price', label: 'Sale Price', type: 'number' },
            { key: 'description', label: 'Description' },
            {
              key: 'category_id',
              label: 'Category',
              type: 'select',
              options: categories.map((cat) => ({ value: cat._id, label: cat.name })),
            },
          ]}
          onChange={(field, value) => setEditForm({ ...editForm, [field]: value })}
          onSubmit={handleUpdateProduct}
          onClose={() => {
            setShowEditModal(false);
            resetEditForm();
            resetUpload();
          }}
          onFileChange={handleFileChange}
          onOpenImagePicker={() => setShowImagePicker(true)}
          imagePreviewUrl={imagePreviewUrl}
        />
      )}

      {/* Modal Image Picker */}
      {showImagePicker && (
        <ImagePickerModal
          onClose={() => setShowImagePicker(false)}
          onSelect={(image) => {
            if (image?.file) {
              handleFileChange(image.file);
            }
            setShowImagePicker(false);
          }}
        />
      )}
    </div>
  );
};

export default ProductPage;
