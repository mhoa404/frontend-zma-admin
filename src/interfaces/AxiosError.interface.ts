// src/interfaces/AxiosError.interface.ts
export interface AxiosErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}
