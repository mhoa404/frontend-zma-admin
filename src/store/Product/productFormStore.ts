import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';

type ProductForm = {
  name: string;
  price: string;
  sale_price: string;
  description: string;
  category_id: string;
  img_url?: string;
  img_public_id?: string;
};

type ProductFormState = {
  form: ProductForm;
  editForm: ProductForm;
  editingId: string | null;
};

type ProductFormActions = {
  setForm: (form: ProductForm) => void;
  setEditForm: (form: ProductForm) => void;
  setEditingId: (id: string | null) => void;
  resetForm: () => void;
  resetEditForm: () => void;
};

const emptyForm: ProductForm = {
  name: '',
  price: '',
  sale_price: '',
  description: '',
  category_id: '',
};

export const useProductFormStore = createWithEqualityFn<ProductFormState & ProductFormActions>(
  (set) => ({
    form: { ...emptyForm },
    editForm: { ...emptyForm },
    editingId: null,
    setForm: (form) => set({ form }),
    setEditForm: (editForm) => set({ editForm }),
    setEditingId: (id) => set({ editingId: id }),
    resetForm: () => set({ form: { ...emptyForm } }),
    resetEditForm: () => set({ editForm: { ...emptyForm }, editingId: null }),
  }),
  shallow
);
