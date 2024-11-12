export interface HistoriaMedica {
  id: number;
  antecedentesMedicos: string[];
  cirugiasAnteriores: string[];
  alergias: string[];
  antecedentesFamiliares: string[];
  pacienteId: number;  
}
