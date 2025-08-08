import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from 'zustand/shallow';

type UploadImageState = {
  selectedFile: File | null;
  imagePreviewUrl: string;
};

type UploadImageActions = {
  setSelectedFile: (file: File | null) => void;
  setImagePreviewUrl: (url: string) => void;
  resetUpload: () => void;
};

export const useProductUploadStore = createWithEqualityFn<UploadImageState & UploadImageActions>(
  (set) => ({
    selectedFile: null,
    imagePreviewUrl: '',
    setSelectedFile: (file) => set({ selectedFile: file }),
    setImagePreviewUrl: (url) => set({ imagePreviewUrl: url }),
    resetUpload: () => set({ selectedFile: null, imagePreviewUrl: '' }),
  }),
  shallow
);
