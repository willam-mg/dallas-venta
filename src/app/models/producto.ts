export class Producto {
    id?: number;
    nombre: string;
    marca: string;
    area: string;
    precio: number;
    detalle: string;
    stock: number;
    created_at?: number;
    updated_at?: number;
    deleted_at?: number;

    public constructor() {
        this.nombre = "";
        this.marca = "";
        this.area = "";
        this.precio = 0;
        this.detalle = "";
        this.stock = 0;
    }
}
