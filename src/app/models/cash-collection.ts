import { CashCollectionStatus } from "../shared/constants/cash-collection.constants";

export class CashCollection {

  id!: number;
  cash_register_id!: number;
  reference_number!: string;

  expected_amount!: number;
  amount?: number | null;
  difference?: number | null;

  created_by!: number;
  delivered_by?: number | null;
  received_by?: number | null;

  status!: CashCollectionStatus;
  statusLabel!: string;

  collection_created_at!: string;
  collection_delivered_at?: string | null;
  collection_received_at?: string | null;

  notes?: string | null;

  created_at?: number | null;
  updated_at?: number | null;
  deleted_at?: number | null;

  /* =====================
   * RELACIONES (opcionales)
   * ===================== */

  cashRegister?: any;
  creator?: any;
  deliveredBy?: any;
  receivedBy?: any;

  // relationship
  created_by_name?: string;

  constructor(data?: Partial<CashCollection>) {
    Object.assign(this, data);
  }

  /* =====================
   * HELPERS
   * ===================== */


  isPending(): boolean {
    return this.status == CashCollectionStatus.STATUS_PENDING;
  }

  isConfirmed(): boolean {
    return this.status == CashCollectionStatus.STATUS_CONFIRMED;
  }

  isCanceled(): boolean {
    return this.status == CashCollectionStatus.STATUS_CANCELED;
  }

  // get statusLabel(): string {
  //   return this.status.charAt(0).toUpperCase() + this.status.slice(1);
  // }

}
