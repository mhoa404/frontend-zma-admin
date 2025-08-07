import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';

type CategoryModalState = {
  showModal: boolean;
  showEditModal: boolean;
};

type CategoryModalActions = {
  setShowModal: (show: boolean) => void;
  setShowEditModal: (show: boolean) => void;
};

const initialState: CategoryModalState = {
  showModal: false,
  showEditModal: false,
};

export const useCategoryModalStore = createWithEqualityFn<
  CategoryModalState & CategoryModalActions
>((set) => ({
  ...initialState,
  setShowModal: (show) => set({ showModal: show }),
  setShowEditModal: (show) => set({ showEditModal: show }),
}), shallow);
