export const PAYMENT_STATUS = {
  UNPAID: "unpaid",
  PAID: "paid",
} as const;

export type PaymentStatus = typeof PAYMENT_STATUS[keyof typeof PAYMENT_STATUS];

export const PAYMENT_STATUS_LABEL: Record<PaymentStatus, string> = {
  unpaid: "Chưa thanh toán",
  paid: "Đã thanh toán",
};
