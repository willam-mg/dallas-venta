import { Almacen } from "./almacen";
import { Venta } from "./venta";

export class DetalleVenta {
    id?: number;
    almacen_id: number;
    producto_id: number;
    precio: number;
    cantidad: number;
    venta_id: number;
    almacen: Almacen;
    venta: Venta;

    constructor() {
        this.almacen_id = 0;
        this.producto_id = 0;
        this.precio = 0;
        this.cantidad = 0;
        this.venta_id = 0;
        this.almacen = new Almacen();
        this.venta = new Venta();
    }

    get subtotal(): number {
        return this.precio * this.cantidad;
    }
}
