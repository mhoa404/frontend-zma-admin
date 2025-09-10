import { useCallback, useEffect, useState } from 'react';
import {
  useProductListStore,
} from '../store/Product/productListStore';
import {
  useProductFormStore,
} from '../store/Product/productFormStore';
import {
  useProductModalStore,
} from '../store/Product/productModalStore';
import {
  useProductUploadStore,
} from '../store/Product/productUploadStore';

import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../scripts/productApi';
import { fetchCategories } from '../scripts/categoryApi';
import { uploadImageToCloudinary } from '../scripts/uploadApi';
import { parseAxiosError } from '../utils/parseAxiosError';
import type { UIProductRow } from '../interfaces/UIProductRow.interface';

export interface Category {
  _id: string;
  name: string;
}

export const useProductHandlers = () => {
  const { products, selectedItem, setProducts, setSelectedItem } = useProductListStore();
  const {
    form,
    editForm,
    editingId,
    setForm,
    setEditForm,
    setEditingId,
    resetForm,
    resetEditForm,
  } = useProductFormStore();
  const {
    showModal,
    showEditModal,
    setShowModal,
    setShowEditModal,
  } = useProductModalStore();
  const {
    selectedFile,
    imagePreviewUrl,
    setSelectedFile,
    setImagePreviewUrl,
    resetUpload,
  } = useProductUploadStore();

  const [categories, setCategories] = useState<Category[]>([]);

  const loadProducts = useCallback(async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error('❌ Lỗi khi tải sản phẩm:', error);
    }
  }, [setProducts]);

  const loadCategories = useCallback(async () => {
    try {
      const data = await fetchCategories();
      const mapped = data.map((cat) => ({
        _id: String(cat._id),
        name: cat.name as string,
      }));
      setCategories(mapped);
    } catch (err) {
      console.error('❌ Lỗi khi tải danh mục:', err);
    }
  }, []);

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, [loadProducts, loadCategories]);

  const handleCreateProduct = async () => {
    if (!form.category_id) return alert('⚠️ Vui lòng chọn danh mục');

    try {
      // ✅ Giữ lại URL nếu không upload mới
      let img_url = form.img_url || '';
      let img_public_id = form.img_public_id || '';

      if (selectedFile) {
        const uploaded = await uploadImageToCloudinary(selectedFile);
        img_url = uploaded.url;
        img_public_id = uploaded.public_id;
      }

      await createProduct({
        ...form,
        name: form.name.trim(),
        price: Number(form.price),
        sale_price: form.sale_price ? Number(form.sale_price) : undefined,
        description: form.description?.trim(),
        img_url,
        img_public_id,
      });

      alert('✅ Tạo sản phẩm thành công');
      resetForm();
      resetUpload();
      setShowModal(false);
      await loadProducts();
    } catch (err) {
      console.error(err);
      alert(parseAxiosError(err));
    }
  };


  const handleUpdateProduct = async () => {
    if (!editingId) return alert('❌ Thiếu ID sản phẩm');

    try {
      let img_url = editForm.img_url;
      let img_public_id = editForm.img_public_id;

      if (selectedFile) {
        const uploaded = await uploadImageToCloudinary(selectedFile);
        img_url = uploaded.url;
        img_public_id = uploaded.public_id;
      }

      await updateProduct(editingId, {
        ...editForm,
        name: editForm.name.trim(),
        price: Number(editForm.price),
        sale_price: editForm.sale_price ? Number(editForm.sale_price) : undefined,
        description: editForm.description?.trim(),
        img_url,
        img_public_id,
      });

      alert('✅ Đã cập nhật sản phẩm');
      resetEditForm();
      resetUpload();
      setShowEditModal(false);

      await loadProducts();

      // Cập nhật lại sản phẩm đang chọn
      setSelectedItem({
        ...editForm,
        _id: editingId,
        price: Number(editForm.price),
        sale_price: editForm.sale_price ? Number(editForm.sale_price) : undefined,
        img_url,
        img_public_id,
        create_at: new Date().toISOString(),
      } as UIProductRow);
    } catch (err) {
      console.error(err);
      alert(parseAxiosError(err));
    }
  };

  const handleDeleteProduct = async (id: string | undefined) => {
    if (!id) {
      alert('❌ Không tìm thấy ID hợp lệ để xoá');
      return;
    }

    const confirm = window.confirm('Bạn có chắc muốn xoá sản phẩm này?');
    if (!confirm) return;

    try {
      await deleteProduct(id);
      alert('✅ Đã xoá sản phẩm');
      setSelectedItem(null);
      await loadProducts();
    } catch (err) {
      alert('❌ Xoá sản phẩm thất bại');
      console.error(err);
    }
  };


  const handleStartEdit = (item: UIProductRow) => {
    setEditForm({
      name: item.name || '',
      price: item.price?.toString() || '',
      sale_price: item.sale_price?.toString() || '',
      description: item.description || '',
      category_id: item.category_id || '',
      img_url: item.img_url || '',
      img_public_id: item.img_public_id || '',
    });

    setImagePreviewUrl(item.img_url || '');
    setSelectedFile(null);
    setEditingId(item._id?.toString() || null);
    setShowEditModal(true);
  };

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreviewUrl('');
    }
  };

  return {
    // UI
    products,
    categories,
    selectedItem,
    showModal,
    showEditModal,
    form,
    editForm,
    imagePreviewUrl,

    // Events
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    handleStartEdit,
    handleFileChange,

    // State actions
    setForm,
    setEditForm,
    setSelectedItem,
    setShowModal,
    setShowEditModal,
    resetForm,
    resetEditForm,
    resetUpload,
    setImagePreviewUrl,
  };
};
