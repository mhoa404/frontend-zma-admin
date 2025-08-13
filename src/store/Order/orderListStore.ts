import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';
import type { OrderRow } from '../../interfaces/Table/OrderRow.interface';

type OrderListState = {
  orders: OrderRow[];
  selectedItem: OrderRow | null;
  loading: boolean;
};

type OrderListActions = {
  setOrders: (orders: OrderRow[]) => void;
  setSelectedItem: (item: OrderRow | null) => void;
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
