import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';
import type { TableRow } from '../../interfaces/TableRow.interface';

type CustomerListState = {
  users: TableRow[];
  selectedItem: TableRow | null;
  loading: boolean;
};

type CustomerListActions = {
  setUsers: (users: TableRow[]) => void;
  setSelectedItem: (item: TableRow | null) => void;
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
