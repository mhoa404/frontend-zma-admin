export const formatCurrency = (value: number | string): string => {
  const number = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(number)) return "0";
  return number.toLocaleString("vi-VN");
};
