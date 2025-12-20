// src/app/shared/constants/cash-movement.constants.ts

export const CashMovementType = {
  IN: 'IN',
  OUT: 'OUT'
} as const;

export type CashMovementType =
  typeof CashMovementType[keyof typeof CashMovementType];
