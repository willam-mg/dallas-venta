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
    date_closed_at?: number;
    time_closed_at?: number;
    status: string;
    comment?: number;
    balance: number;

    constructor() {
        this.punto_venta_id = 0;
        this.opening_amount = 0;
        this.balance = 0;
        this.date_opened_at = '';
        this.time_opened_at = '';
        this.status = '';
    }
}
