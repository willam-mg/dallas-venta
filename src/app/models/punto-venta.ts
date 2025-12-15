export class PuntoVenta {
    id?: number;
    nombre: string;
    detalle: string;
    sucursal: string;
    logo?: string;

    constructor() {
        this.nombre = "";
        this.detalle = "";
        this.sucursal = "";
    }
}