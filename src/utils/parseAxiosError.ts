import { AxiosError } from 'axios';

export function parseAxiosError(error: unknown): string {
  const axiosError = error as AxiosError<{ message?: string | string[] }>;

  const msg = axiosError?.response?.data?.message;

  if (typeof msg === 'string') return msg;
  if (Array.isArray(msg)) return msg.join('\n');

  return '❌ Đã xảy ra lỗi không xác định';
}
