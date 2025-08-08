import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';

type CustomerForm = {
  name: string;
  email: string;
  password: string;
  role: string;
};

type CustomerFormState = {
  form: CustomerForm;
  editForm: CustomerForm;
  editingId: string | null;
};

type CustomerFormActions = {
  setForm: (form: CustomerForm) => void;
  setEditForm: (form: CustomerForm) => void;
  setEditingId: (id: string | null) => void;
};

const initialState: CustomerFormState = {
  form: { name: '', email: '', password: '', role: 'admin' },
  editForm: { name: '', email: '', password: '', role: 'admin' },
  editingId: null,
};

export const useCustomerFormStore = createWithEqualityFn<
  CustomerFormState & CustomerFormActions
>(
  (set) => ({
    ...initialState,
    setForm: (form) => set({ form }),
    setEditForm: (editForm) => set({ editForm }),
    setEditingId: (id) => set({ editingId: id }),
  }),
  shallow
);
