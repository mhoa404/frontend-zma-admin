// src/utils/formatDate.ts
export const formatDate = (value?: string | Date | null): string => {
  // Nếu không có value hoặc không hợp lệ => trả về 'Không rõ'
  if (!value) return 'Không rõ';
  try {
    const date = typeof value === 'string' ? new Date(value) : value;
    return date.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  } catch (err) {
    console.log(err)
    console.warn('⚠️ Không thể format ngày:', value);
    return 'Không rõ';
  }
};
