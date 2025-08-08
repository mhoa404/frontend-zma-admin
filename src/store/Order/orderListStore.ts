import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';
import type { TableRow } from '../../interfaces/TableRow.interface';

type OrderListState = {
  orders: TableRow[];
  selectedItem: TableRow | null;
  loading: boolean;
};

type OrderListActions = {
  setOrders: (orders: TableRow[]) => void;
  setSelectedItem: (item: TableRow | null) => void;
  setLoading: (loading: boolean) => void;
};

const initialState: OrderListState = {
  orders: [],
  selectedItem: null,
  loading: false,
};

export const useOrderListStore = createWithEqualityFn<OrderListState & OrderListActions>(
  (set) => ({
    ...initialState,
    setOrders: (orders) => set({ orders }),
    setSelectedItem: (item) => set({ selectedItem: item }),
    setLoading: (loading) => set({ loading }),
  }),
  shallow
);
