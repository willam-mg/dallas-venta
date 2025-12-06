export class PuntoVenta {
    id?: number;
    nombre: string;
    detalle: string;
    sucursal: string;

    constructor() {
        this.nombre = "";
        this.detalle = "";
        this.sucursal = "";
    }
}
