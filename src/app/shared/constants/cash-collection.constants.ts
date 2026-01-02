// src/app/shared/constants/cash-movement.constants.ts

export const CashCollectionStatus = {
  STATUS_PENDING: 'pending',
  STATUS_CONFIRMED: 'confirmed',
  STATUS_COMPLETED: 'completed',
  STATUS_CANCELED: 'canceled',
} as const;

export type CashCollectionStatus =
  typeof CashCollectionStatus[keyof typeof CashCollectionStatus];
