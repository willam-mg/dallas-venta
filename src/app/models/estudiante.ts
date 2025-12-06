import { Cliente } from "./cliente";

export class Estudiante {
    id?: number;
    nombre: string;
    apellido: string;
    ci: string;
    expedido: string;
    celular: string;
    genero?: string;
    telefono: string;
    email: string;
    foto?: string;
    domicilio?: string;
    codigo: string;
    credential_impresa: string;
    credential_entragada: string;
    fecha_entrega_credencial: string;
    fecha_nacimiento: string;
    puntos?: number;
    isClient: boolean;
    strGenero: string;
    cliente: Cliente;

    constructor() {
        this.nombre = "";
        this.apellido = "";
        this.ci = "";
        this.expedido = "";
        this.celular = "";
        this.telefono = "";
        this.email = "";
        this.codigo = "";
        this.credential_impresa = "";
        this.credential_entragada = "";
        this.fecha_entrega_credencial = "";
        this.fecha_nacimiento = "";
        this.isClient = false;
        this.strGenero = "";
        this.cliente = new Cliente();
        this.puntos = 0;
    }
}
