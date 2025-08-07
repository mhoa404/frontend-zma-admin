import { useEffect, useState } from 'react';
import TableComponent from '../components/Table';
import TbodyProducts from '../components/Table/TBodyProduct';
import { getStatusColor } from '../utils/statusColor';
import { RightDetailPanel } from '../components/RightDetailPanel';
import type { ColumnDef, TableRow, UIProductRow } from '../interfaces/TableRow.interface';
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from '../scripts/productApi';
import { fetchCategories } from '../scripts/categoryApi';
import Search from '../components/Search';
import FormModal from '../components/FormModal';
import { parseAxiosError } from '../utils/parseAxiosError';
import { uploadImageToCloudinary } from '../scripts/uploadApi';

interface Category {
  _id: string;
  name: string;
}

interface ProductForm {
  name: string;
  price: string;
  sale_price: string;
  description: string;
  category_id: string;
  img_url?: string;
  img_public_id?: string;
  [key: string]: string | number | undefined;
}

const ProductPage = () => {
  const [products, setProducts] = useState<UIProductRow[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedItem, setSelectedItem] = useState<UIProductRow | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  const [form, setForm] = useState<ProductForm>({
    name: '',
    price: '',
    sale_price: '',
    description: '',
    category_id: '',
  });

  const [editForm, setEditForm] = useState<ProductForm>({
    name: '',
    price: '',
    sale_price: '',
    description: '',
    category_id: '',
  });

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

  const handleFormChange = (field: keyof ProductForm, value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: field === 'price' || field === 'sale_price' ? Number(value) : value,
    }));
  };

  const handleEditFormChange = (field: keyof ProductForm, value: string) => {
    setEditForm(prev => ({
      ...prev,
      [field]: field === 'price' || field === 'sale_price' ? Number(value) : value,
    }));
  };

  const handleCreateProducts = async () => {
    if (!form.category_id) {
      alert('⚠️ Vui lòng chọn danh mục trước khi tạo sản phẩm');
      return;
    }

    try {
      let img_url = '';
      let img_public_id = '';

      if (selectedFile) {
        const uploaded = await uploadImageToCloudinary(selectedFile);
        img_url = uploaded.url;
        img_public_id = uploaded.public_id;
      }

      await createProduct({
        name: form.name.trim(),
        price: Number(form.price),
        sale_price: form.sale_price ? Number(form.sale_price) : undefined,
        description: form.description?.trim() || undefined,
        category_id: form.category_id,
        img_url,
        img_public_id,
      });

      alert('✅ Đã tạo sản phẩm thành công');
      setShowModal(false);
      setForm({ name: '', price: '', sale_price: '', description: '', category_id: '' });
      setSelectedFile(null);
      setImagePreviewUrl('');
      await loadProducts();
    } catch (error) {
      console.error('Lỗi khi tạo sản phẩm:', error);
      alert(parseAxiosError(error));
    }
  };

  const handleUpdateProduct = async () => {
    if (!editingId) {
      alert('❌ Không tìm thấy sản phẩm để cập nhật');
      return;
    }

    try {
      let img_url = editForm.img_url;
      let img_public_id = editForm.img_public_id;

      if (selectedFile) {
        const uploaded = await uploadImageToCloudinary(selectedFile);
        img_url = uploaded.url;
        img_public_id = uploaded.public_id;
      }

      await updateProduct(editingId, {
        name: editForm.name.trim(),
        price: Number(editForm.price),
        sale_price: editForm.sale_price ? Number(editForm.sale_price) : undefined,
        description: editForm.description?.trim() || undefined,
        category_id: editForm.category_id,
        img_url,
        img_public_id,
      });

      alert('✅ Cập nhật sản phẩm thành công');

      // ✅ Load lại danh sách sản phẩm
      await loadProducts();

      // ✅ Cập nhật lại selectedItem để Right Panel hiển thị đúng ảnh mới
      const updatedProduct = {
        ...editForm,
        _id: editingId,
        img_url,
        img_public_id,
        price: Number(editForm.price),
        sale_price: editForm.sale_price ? Number(editForm.sale_price) : undefined,
        create_at: new Date().toISOString(), // Nếu bạn không có create_at từ backend
      };
      setSelectedItem(updatedProduct as UIProductRow);

      // ✅ Reset lại form
      setShowEditModal(false);
      setEditingId(null);
      setSelectedFile(null);
      setImagePreviewUrl('');
    } catch (error) {
      console.error('❌ Cập nhật sản phẩm thất bại', error);
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
      img_url: product.img_url || '',
      img_public_id: product.img_public_id || '',
    });

    setImagePreviewUrl(product.img_url || '');
    setSelectedFile(null);
    setEditingId(product._id ? String(product._id) : null);
    setShowEditModal(true);
  };

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
          onDelete={handleDelete}
          onEdit={handleStartEdit}
        />
      </div>

      {/* Modal Add */}
      {showModal && (
        <FormModal<ProductForm>
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
          onClose={() => {
            setShowModal(false);
            setSelectedFile(null);
            setImagePreviewUrl('');
          }}
          onFileChange={(file) => {
            setSelectedFile(file);
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => setImagePreviewUrl(reader.result as string);
              reader.readAsDataURL(file);
            } else {
              setImagePreviewUrl('');
            }
          }}
          imagePreviewUrl={imagePreviewUrl}
        />
      )}

      {/* Modal Edit */}
      {showEditModal && (
        <FormModal<ProductForm>
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
          onSubmit={handleUpdateProduct}
          onClose={() => {
            setShowEditModal(false);
            setEditingId(null);
            setSelectedFile(null);
            setImagePreviewUrl('');
          }}
          onFileChange={(file) => {
            setSelectedFile(file);
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => setImagePreviewUrl(reader.result as string);
              reader.readAsDataURL(file);
            } else {
              setImagePreviewUrl('');
            }
          }}
          imagePreviewUrl={imagePreviewUrl}
        />
      )}
    </div>
  );
};

export default ProductPage;
