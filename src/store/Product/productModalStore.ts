import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from 'zustand/shallow';

type ProductModalState = {
  showModal: boolean;
  showEditModal: boolean;
};

type ProductModalActions = {
  setShowModal: (show: boolean) => void;
  setShowEditModal: (show: boolean) => void;
};

export const useProductModalStore = createWithEqualityFn<ProductModalState & ProductModalActions>(
  (set) => ({
    showModal: false,
    showEditModal: false,
    setShowModal: (show) => set({ showModal: show }),
    setShowEditModal: (show) => set({ showEditModal: show }),
  }),
  shallow
);
