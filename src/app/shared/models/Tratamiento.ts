export class Tratamiento {
  id: number;
  descripcionTratamiento: string;
  duracionDias: number;

  constructor(id: number, descripcionTratamiento: string, duracionDias: number) {
    this.id = id;
    this.descripcionTratamiento = descripcionTratamiento;
    this.duracionDias = duracionDias;
  }
}