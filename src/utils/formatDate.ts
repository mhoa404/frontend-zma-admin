export const formatDate = (value: string | Date): string => {
  const date = typeof value === "string" ? new Date(value) : value;
  return date.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};