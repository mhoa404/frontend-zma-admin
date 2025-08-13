import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';
import type { UserRow } from '../../interfaces/Table/UserRow.interface';

type CustomerListState = {
  users: UserRow[];
  selectedItem: UserRow | null;
  loading: boolean;
};

type CustomerListActions = {
  setUsers: (users: UserRow[]) => void;
  setSelectedItem: (item: UserRow | null) => void;
  setLoading: (loading: boolean) => void;
};

const initialState: CustomerListState = {
  users: [],
  selectedItem: null,
  loading: false,
};

export const useCustomerListStore = createWithEqualityFn<
  CustomerListState & CustomerListActions
>(
  (set) => ({
    ...initialState,
    setUsers: (users) => set({ users }),
    setSelectedItem: (item) => set({ selectedItem: item }),
    setLoading: (loading) => set({ loading }),
  }),
  shallow
);
