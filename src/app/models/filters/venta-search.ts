export class VentaSearch {
    cliente: string;
    fechaInicio: string;
    fechaFin: string;
    estado: string;

    constructor() {
        this.cliente = '';
        this.fechaInicio = '';
        this.fechaFin = '';
        this.estado = '';
    }

    public setValues(search: any) {
        this.cliente = search.cliente;
        this.fechaInicio = search.fechaInicio;
        this.fechaFin = search.fechaFin;
        this.estado = search.estado;
        // this.cliente = search.cliente ?? this.cliente;
        // this.fechaInicio = search.fechaInicio! ?? this.fechaInicio;
        // this.fechaFin = search.fechaFin! ?? this.fechaFin;
        // this.estado = search.estado! ?? this.estado;
    }
}
