export class CashRegister {
    id?: number;
    user_id?: number;
    vendedor_id?: number;
    punto_venta_id: number;
    opening_amount: number;
    closing_amount?: number;
    difference?: number;
    date_opened_at: string;
    time_opened_at: string;
    date_closed_at?: string;
    time_closed_at?: string;
    status: string;
    comment?: number;
    cash_balance: number;
    qr_balance: number;
    transfer_balance: number;

    constructor() {
        this.punto_venta_id = 0;
        this.opening_amount = 0;
        this.cash_balance = 0.00;
        this.qr_balance = 0.00;
        this.transfer_balance = 0.00;
        this.date_opened_at = '';
        this.time_opened_at = '';
        this.status = '';
    }
}
