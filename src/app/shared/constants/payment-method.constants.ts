// src/app/shared/constants/payment-method.constants.ts

export const PaymentMethod = {
  CASH: 'cash',
  QR: 'qr',
  TRANSFER: 'transfer'
} as const;

export type PaymentMethod =
  typeof PaymentMethod[keyof typeof PaymentMethod];
