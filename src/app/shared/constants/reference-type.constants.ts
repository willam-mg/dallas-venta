// src/app/shared/constants/cash-movement.constants.ts

export const ReferenceType = {
  // income resferences
  PURCHASE: 'purchase',
  MANUAL_INCOME: 'manual_icome',
  // expense reference
  SALE: 'sale',
  MANUAL_EXPENSE: 'manual_expense',
  SUPPLIER_PAYMENTS: 'supplier_payments',
  TEXT_PAYMENTS: 'text_payments',
  COLLECT_FUNDS: 'collect_funds',
} as const;

export type ReferenceType =
  typeof ReferenceType[keyof typeof ReferenceType];
