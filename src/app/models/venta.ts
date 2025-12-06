import { Cliente } from "./cliente";
import { DetalleVenta } from "./detalle-venta";
import { PuntoVenta } from "./punto-venta";
import { User } from "./user";

export class Venta {
    id?: number;
    fecha: string;
    hora: string;
    estado: string;
    observacion: string;
    cliente_id: number;
    vendedor_id: number;
    punto_venta_id: number;
    cliente: Cliente;
    vendedor: User;
    puntoVenta: PuntoVenta;
    detalleVenta: Array<DetalleVenta>;
    total: number;

    constructor() {
        this.fecha = "";
        this.hora = "";
        this.estado = "";
        this.observacion = "";
        this.cliente_id = 0;
        this.vendedor_id = 0;
        this.punto_venta_id = 0;
        this.cliente = new Cliente();
        this.vendedor = new User();
        this.puntoVenta = new PuntoVenta();
        this.detalleVenta = [];
        this.total = 0;
    }

    // get total(): number {
    //     let total = 0;
    //     this.detalleVenta.forEach((item)=>{
    //         total += item.subtotal;
    //     });
    //     return total;
    // }
}
