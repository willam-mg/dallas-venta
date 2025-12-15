export class Vendedor {
    id?: number;
    nombre_completo: string;
    foto: string;
    email: string;
    turno: string;

    constructor() {
        this.nombre_completo = "";
        this.foto = "";
        this.email = "";
        this.turno = "";
    }
}
