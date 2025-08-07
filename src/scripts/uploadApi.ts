import axios from 'axios';
import { BACKEND_API } from './api';

export const uploadImageToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const token = localStorage.getItem('access_token');
  const res = await axios.post(`${BACKEND_API}/upload/image`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data as { url: string; public_id: string };
};
