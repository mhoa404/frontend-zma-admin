import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';

type CustomerModalState = {
  showModal: boolean;
  showEditModal: boolean;
};

type CustomerModalActions = {
  setShowModal: (show: boolean) => void;
  setShowEditModal: (show: boolean) => void;
};

const initialState: CustomerModalState = {
  showModal: false,
  showEditModal: false,
};

export const useCustomerModalStore = createWithEqualityFn<
  CustomerModalState & CustomerModalActions
>(
  (set) => ({
    ...initialState,
    setShowModal: (show) => set({ showModal: show }),
    setShowEditModal: (show) => set({ showEditModal: show }),
  }),
  shallow
);
