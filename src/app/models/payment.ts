import { Vendedor } from "./vendedor";
import { Venta } from "./venta";

export interface Payment {
  id?: number;
  venta_id?: number;
  vendedor_id?: number | null;

  amount: number;

  payment_method: 'cash' | 'qr' | 'transfer';

  date?: string;
  time?: string;

  created_at?: number | null;
  updated_at?: number | null;
  deleted_at?: number | null;

  venta?: Venta;
  vendedor?: Vendedor;
}
