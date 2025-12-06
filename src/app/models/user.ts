import { PuntoVenta } from "./punto-venta";

export class User {
    id?: number;
    nombre_completo: string;
    foto?: string;
    email: string;
    password: string;
    password_confirmation?: string;
    turno: string;
    access_token?: string;
    punto_venta_id?: number;
    puntoVenta?: PuntoVenta;

    constructor() {
        this.nombre_completo = '';
        this.email = '';
        this.password = '';
        this.turno = '';
        this.punto_venta_id = 0;
        this.puntoVenta = new PuntoVenta();
    }
}
