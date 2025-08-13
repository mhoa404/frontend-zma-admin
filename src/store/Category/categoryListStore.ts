import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';
import type { CategoryRow } from '../../interfaces/Table/CategoryRow.interface';

type CategoryListState = {
  categories: CategoryRow[];
  selectedItem: CategoryRow | null;
  loading: boolean;
};

type CategoryListActions = {
  setCategories: (categories: CategoryRow[]) => void;
  setSelectedItem: (item: CategoryRow | null) => void;
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
