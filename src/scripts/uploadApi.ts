import axios from 'axios';
import { BACKEND_API } from './api';

export interface CloudImage {
  url: string;
  public_id: string;
}

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

export const fetchCloudImages = async (folder: string): Promise<CloudImage[]> => {
  const token = localStorage.getItem('access_token');
  const res = await fetch(`${BACKEND_API}/upload/images?folder=${folder}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error('Lỗi khi lấy danh sách ảnh từ Cloudinary');
  return res.json();
};
