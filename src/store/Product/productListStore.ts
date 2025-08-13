import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';
import type { UIProductRow } from '../../interfaces/UIProductRow.interface';

type ProductListState = {
  products: UIProductRow[];
  selectedItem: UIProductRow | null;
};

type ProductListActions = {
  setProducts: (products: UIProductRow[]) => void;
  setSelectedItem: (item: UIProductRow | null) => void;
};

export const useProductListStore = createWithEqualityFn<ProductListState & ProductListActions>(
  (set) => ({
    products: [],
    selectedItem: null,
    setProducts: (products) => set({ products }),
    setSelectedItem: (item) => set({ selectedItem: item }),
  }),
  shallow
);
