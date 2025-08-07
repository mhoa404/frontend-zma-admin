import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';
import type { TableRow } from '../../interfaces/TableRow.interface';

type CategoryListState = {
  categories: TableRow[];
  selectedItem: TableRow | null;
  loading: boolean;
};

type CategoryListActions = {
  setCategories: (categories: TableRow[]) => void;
  setSelectedItem: (item: TableRow | null) => void;
  setLoading: (loading: boolean) => void;
};

const initialState: CategoryListState = {
  categories: [],
  selectedItem: null,
  loading: false,
};

export const useCategoryListStore = createWithEqualityFn<
  CategoryListState & CategoryListActions
>((set) => ({
  ...initialState,
  setCategories: (categories) => set({ categories }),
  setSelectedItem: (item) => set({ selectedItem: item }),
  setLoading: (loading) => set({ loading }),
}), shallow);
