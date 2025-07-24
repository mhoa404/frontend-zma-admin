import { useEffect, useState } from 'react';
import TableComponent from '../components/Table';
import TbodyProducts from '../components/Table/TBodyProduct';
import { getStatusColor } from '../utils/statusColor';
import { RightDetailPanel } from '../components/RightDetailPanel';
import type { ColumnDef, TableRow, UIProductRow } from '../interfaces/TableRow.interface';
import { createProduct, deleteProduct, fetchProducts } from '../scripts/productApi';
import { fetchCategories } from '../scripts/categoryApi';
import Search from '../components/Search';
import FormModal from '../components/FormModal';
import { parseAxiosError } from '../utils/parseAxiosError';

interface Category {
  _id: string;
  name: string;
}

const ProductPage = () => {
  const [products, setProducts] = useState<UIProductRow[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedItem, setSelectedItem] = useState<UIProductRow | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [form, setForm] = useState({
    name: '',
    price: '',
    sale_price: '',
    description: '',
    category_id: '',
  });

  const [editForm, setEditForm] = useState<typeof form>(form);

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error('Lỗi khi lấy sản phẩm:', error);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      const mapped = data
        .filter(cat => cat._id && cat.name)
        .map((cat): Category => ({
          _id: String(cat._id),
          name: cat.name as string,
        }));
      setCategories(mapped);
    } catch (error) {
      console.error('Lỗi khi lấy danh mục:', error);
    }
  };

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const handleFormChange = (field: keyof typeof form, value: string) => {
    setForm(prev => ({
      ...prev,
      [field]:
        field === 'price' || field === 'sale_price'
          ? Number(value)
          : field === 'name'
            ? value.trim()
            : value,
    }));
  };

  const handleEditFormChange = (field: keyof typeof editForm, value: string) => {
    setEditForm(prev => ({
      ...prev,
      [field]:
        field === 'price' || field === 'sale_price'
          ? Number(value)
          : value,
    }));
  };

  const handleCreateProducts = async () => {
    if (!form.category_id) {
      alert('⚠️ Vui lòng chọn danh mục trước khi tạo sản phẩm');
      return;
    }

    try {
      await createProduct({
        name: form.name,
        price: Number(form.price),
        sale_price: form.sale_price ? Number(form.sale_price) : undefined,
        description: form.description || undefined,
        category_id: form.category_id,
      });

      alert('✅ Đã tạo sản phẩm thành công');
      setShowModal(false);
      setForm({ name: '', price: '', sale_price: '', description: '', category_id: '' });
      await loadProducts();
    } catch (error) {
      console.error('Lỗi khi tạo sản phẩm:', error);
      alert(parseAxiosError(error));
    }
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm('Bạn có chắc muốn xoá sản phẩm này?');
    if (!confirm) return;
    try {
      await deleteProduct(id);
      alert('Đã xoá sản phẩm');
      setSelectedItem(null);
      await loadProducts();
    } catch (err) {
      alert('Xoá thất bại');
      console.error(err);
    }
  };

  const handleStartEdit = (item: TableRow) => {
    const product = item as UIProductRow;

    setEditForm({
      name: product.name || '',
      price: product.price?.toString() || '',
      sale_price: product.sale_price?.toString() || '',
      description: product.description || '',
      category_id: product.category_id || '',
    });
    setShowEditModal(true);
  };



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
  ];

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="flex justify-between items-center px-6 pt-6">
        <button
          className="bg-[#1e293b] text-white px-4 py-2 rounded-md hover:bg-gray-700 text-sm"
          onClick={() => setShowModal(true)}
        >
          Add Products +
        </button>
        <Search />
      </div>

      <main
        className={`p-6 transition-all duration-300 ease-in-out ${selectedItem ? 'w-[calc(100%-320px)]' : 'w-full'
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
        className={`w-80 h-full bg-white border-l border-gray-200 fixed right-0 top-0 z-50 transform transition-transform duration-300 ${selectedItem ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <RightDetailPanel
          selectedItem={selectedItem}
          activeMenu="Products"
          getStatusColor={getStatusColor}
          onClose={() => setSelectedItem(null)}
          onDelete={handleDelete}
          onEdit={handleStartEdit} // ✅ sử dụng onEdit
        />
      </div>

      {/* Modal tạo */}
      {showModal && (
        <FormModal<typeof form>
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
              options: categories.map(cat => ({ value: cat._id, label: cat.name })),
            },
          ]}
          onChange={handleFormChange}
          onSubmit={handleCreateProducts}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* Modal sửa */}
      {showEditModal && (
        <FormModal<typeof editForm>
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
              options: categories.map(cat => ({ value: cat._id, label: cat.name })),
            },
          ]}
          onChange={handleEditFormChange}
          onSubmit={() => {
            alert('📌 TODO: Gửi API cập nhật sản phẩm tại đây');
            setShowEditModal(false);
          }}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
};

export default ProductPage;
