import { Producto } from "./producto";
import { PuntoVenta } from "./punto-venta";

export class Almacen {
    id?: number;
    user_id: number;
    punto_venta_id: number;
    producto_id: number;
    cantidad: number;
    producto: Producto;
    puntoVenta: PuntoVenta;

    constructor() {
        this.user_id = 0;
        this.punto_venta_id = 0;
        this.producto_id = 0;
        this.cantidad = 0;
        this.producto = new Producto();
        this.puntoVenta = new PuntoVenta();
    }
}
