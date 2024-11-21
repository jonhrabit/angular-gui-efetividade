import { Vigilante } from "../vigilantes/vigilante";

export interface Registro {
    id:number;
    data:Date;
    status:string;
    vigilante:Vigilante;
    substituto:Vigilante;
    descontoHora:string;
}
