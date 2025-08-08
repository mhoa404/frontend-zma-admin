import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';
import type { FormError } from '../../interfaces/FormError.interface';

type LoginFormState = {
  email: string;
  password: string;
  showPassword: boolean;
  isLoading: boolean;
  errors: FormError;
};

type LoginFormActions = {
  setEmail: (email: string) => void;
  setPassword: (pw: string) => void;
  setShowPassword: (show: boolean) => void;
  setErrors: (err: FormError) => void;
  setIsLoading: (isLoading: boolean) => void;
  reset: () => void;
};

const initialState: LoginFormState = {
  email: '',
  password: '',
  showPassword: false,
  isLoading: false,
  errors: {},
};

export const useLoginFormStore = createWithEqualityFn<
  LoginFormState & LoginFormActions
>((set) => ({
  ...initialState,
  setEmail: (email) => set({ email }),
  setPassword: (pw) => set({ password: pw }),
  setShowPassword: (show) => set({ showPassword: show }),
  setErrors: (errors) => set({ errors }),
  setIsLoading: (isLoading) => set({ isLoading }),
  reset: () => set(initialState),
}), shallow);
