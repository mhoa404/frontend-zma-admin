// hooks/useCategoryHandlers.ts
import { useCategoryFormStore } from "../store/Category/categoryFormStore";
import { useCategoryModalStore } from "../store/Category/categoryModalStore";
import { useCategoryListStore } from "../store/Category/categoryListStore";
import type { TableRow } from "../interfaces/TableRow.interface";
import { useCallback } from "react";
import { createCategory, deleteCategory, fetchCategories, updateCategory } from "../scripts/categoryApi";

export const useCategoryHandlers = () => {
  const { form, editForm, editingId, setForm, setEditForm, setEditingId } = useCategoryFormStore();
  const { setShowModal, setShowEditModal } = useCategoryModalStore();
  const { setCategories, setSelectedItem, setLoading } = useCategoryListStore();

  const fetchAllCategories = useCallback(async () => {
    setLoading(true);
    const data = await fetchCategories(); 
    setCategories(data);
    setLoading(false);
  }, [setCategories, setLoading]);

  const handleCreateCategory = async () => {
    const name = form.name.trim();
    if (!name) return alert('⚠️ Vui lòng nhập tên danh mục');

    await createCategory({ name });
    alert('✅ Đã thêm danh mục');
    setForm({ name: '' });
    setShowModal(false);
    await fetchAllCategories();
  };

  const handleUpdateCategory = async () => {
    const name = editForm.name.trim();
    if (!name || !editingId) return alert('⚠️ Thiếu tên hoặc ID');

    await updateCategory(editingId, { name });
    alert('✅ Cập nhật danh mục thành công');
    setShowEditModal(false);
    setEditingId(null);
    await fetchAllCategories();
  };

  const handleDeleteCategory = async (id: string) => {
    const confirm = window.confirm('Bạn có chắc muốn xoá danh mục này?');
    if (!confirm) return;

    await deleteCategory(id);
    alert('✅ Đã xoá danh mục');
    setSelectedItem(null);
    await fetchAllCategories();
  };

  const handleStartEdit = (item: TableRow) => {
    setEditForm({ name: item.name || '' });
    setEditingId(item._id?.toString() ?? null);
    setShowEditModal(true);
  };

  return {
    fetchAllCategories,
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    handleStartEdit,
  };
};
