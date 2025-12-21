// src/app/shared/constants/cash-movement.constants.ts

export const CashMovementType = {
  IN: 'in',
  OUT: 'out',
  OPENING: 'opening',
  CLOSING: 'closing',
  AJUSTMENT: 'ajustment'
} as const;

export type CashMovementType =
  typeof CashMovementType[keyof typeof CashMovementType];
