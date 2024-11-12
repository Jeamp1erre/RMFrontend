import { Diagnostico } from "./Diagnostico";

export class Consulta {
  id: number;
  motivoConsulta: string;
  fechaConsulta: string;
  diagnosticos: Diagnostico[] = []; 
  cambioCount?: number; 

  constructor(id: number, motivoConsulta: string, fechaConsulta: string) {
    this.id = id;
    this.motivoConsulta = motivoConsulta;
    this.fechaConsulta = fechaConsulta;
    this.diagnosticos = [];
  }
}
