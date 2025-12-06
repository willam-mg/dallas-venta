import { Estudiante } from "./estudiante";

export class Cliente {
    id?: number;
    sucursal: string;
    estudiante_id?: number;
    tipo: number; // 2 = estudiante, 3 = externo
    nombre_completo: string;
    ci: string;
    puntos: number;

    constructor() {
        this.sucursal = "";
        this.tipo = 2;
        this.nombre_completo = "";
        this.ci = "";
        this.puntos = 0;
    }

    get strTipo():string {
        return this.tipo == 2? 'Estudiane': 'Externo';
    }
}
