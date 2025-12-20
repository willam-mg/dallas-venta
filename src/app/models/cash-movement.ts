import { CashMovementType } from "../shared/constants/cash-movement.constants";
import { PaymentMethod } from "../shared/constants/payment-method.constants";

export class CashMovement {

  // Constantes equivalentes a Yii2
  static readonly TYPE_IN  = 'IN';
  static readonly TYPE_OUT = 'OUT';

  static readonly PAYMENT_CASH     = 'cash';
  static readonly PAYMENT_QR       = 'qr';
  static readonly PAYMENT_TRANSFER = 'transfer';

  id!: number;
  cash_register_id!: number;
  type!: CashMovementType;
  amount!: number;
  payment_method!: PaymentMethod;
  concept!: string;

  reference_type?: string | null;
  reference_id?: number | null;

  date_created?: string;
  time_created?: string;

  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;

  constructor(data?: Partial<CashMovement>) {
    Object.assign(this, data);
  }

}
