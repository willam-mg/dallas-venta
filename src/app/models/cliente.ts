import { Estudiante } from "./estudiante";

export class Cliente {
    id?: number;
    sucursal: string;
    estudiante_id?: number;
    tipo: number; // 2 = estudiante, 3 = externo
    nombre_completo: string;
    ci: string;
    puntos: number;

    constructor(id?: number, nombre_completo?: string, ci?:string) {
        this.id = id;
        this.nombre_completo = nombre_completo ?? "";
        this.ci = ci ?? "";
        
        this.sucursal = "";
        this.tipo = 2;
        this.puntos = 0;
    }

    get strTipo():string {
        return this.tipo == 2? 'Estudiane': 'Externo';
    }
}
