import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';

type CategoryFormState = {
  form: { name: string };
  editForm: { name: string };
  editingId: string | null;
};

type CategoryFormActions = {
  setForm: (form: CategoryFormState['form']) => void;
  setEditForm: (form: CategoryFormState['editForm']) => void;
  setEditingId: (id: string | null) => void;
};

const initialState: CategoryFormState = {
  form: { name: '' },
  editForm: { name: '' },
  editingId: null,
};

export const useCategoryFormStore = createWithEqualityFn<
  CategoryFormState & CategoryFormActions
>((set) => ({
  ...initialState,
  setForm: (form) => set({ form }),
  setEditForm: (editForm) => set({ editForm }),
  setEditingId: (id) => set({ editingId: id }),
}), shallow);
