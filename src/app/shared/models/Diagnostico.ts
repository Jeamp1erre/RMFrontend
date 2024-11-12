import { Tratamiento } from "./Tratamiento";

export class Diagnostico {
  id: number;  
  nombreDoctor: string;
  descripcionDiagnostico: string;
  tratamientos: Tratamiento[];  

  constructor(id:number,nombreDoctor: string, descripcionDiagnostico: string) {
    this.id = id;
    this.nombreDoctor = nombreDoctor;
    this.descripcionDiagnostico = descripcionDiagnostico;
    this.tratamientos = [];
  }
}
