import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoriaMedicaService } from '../../../shared/services/historiamedica.service';
import { HistoriaMedica } from '../../../shared/models/HistoriaMedica';

import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { ConsultasComponent } from "./consultas/consultas.component";
import {MatIconModule} from '@angular/material/icon';



@Component({
  selector: 'app-openviewpaciente',
  standalone: true,
  imports: [MatTableModule,MatIconModule, 
    MatTabsModule, 
    MatSnackBarModule, 
    CommonModule, 
    MatBadgeModule, 
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule, 
    MatButtonModule, 
    ConsultasComponent],
  templateUrl: './openviewpaciente.component.html',
  styleUrls: ['./openviewpaciente.component.css']
})
export class OpenviewpacienteComponent implements OnInit {
  pacienteId: number = 0; 
  historiaMedica: HistoriaMedica = {} as HistoriaMedica; 
  historiaForm: FormGroup;
  cambioCount: number = 0;  

  constructor(
    private historiaMedicaService: HistoriaMedicaService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar  
  ) {
    this.historiaForm = this.fb.group({
      id: [null], // <-- Agregar el campo id aquí
      antecedentesMedicos: this.fb.array([]),
      cirugiasAnteriores: this.fb.array([]),
      alergias: this.fb.array([]),
      antecedentesFamiliares: this.fb.array([])
    });
    
  }

  ngOnInit(): void {
    this.pacienteId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.getHistoriaMedica(); 
  }

  get antecedentesMedicos() {
    return (this.historiaForm.get('antecedentesMedicos') as FormArray);
  }

  get cirugiasAnteriores() {
    return (this.historiaForm.get('cirugiasAnteriores') as FormArray);
  }

  get alergias() {
    return (this.historiaForm.get('alergias') as FormArray);
  }

  get antecedentesFamiliares() {
    return (this.historiaForm.get('antecedentesFamiliares') as FormArray);
  }

  volver(): void {
    this.router.navigate(['dashbadmin/pacientes']);
  }

  save(): void {
    if (this.historiaForm.valid) {
  
      if (this.historiaForm.value.id) {
        this.historiaMedicaService.updateHistoriaMedica(this.historiaForm.value.id, this.historiaForm.value)
          .subscribe(
            response => {
              console.log('Historia médica actualizada', response);
              this.snackBar.open('Cambios guardados correctamente', 'Cerrar', {
                duration: 4000 
              });
              this.cambioCount = 0;
            },
            error => {
              console.error('Error al actualizar la historia médica', error);
              this.snackBar.open('Error al actualizar la historia médica', 'Cerrar', {
                duration: 4000
              });
            }
          );
      } else {
        this.historiaMedicaService.saveHistoriaMedica(this.historiaForm.value, this.pacienteId)
          .subscribe(
            response => console.log('Historia médica creada', response),
            error => console.error('Error al crear la historia médica', error)
          );
      }
      
    
    } else {
      console.log('Formulario no válido');
    }
  }
  

  addEntrada(tipo: string): void {
    const control = this.historiaForm.get(tipo) as FormArray;
    control.push(this.fb.control(''));
    this.cambioCount++;
  }

  deleteEntrada(tipo: string, index: number): void {
    const control = this.historiaForm.get(tipo) as FormArray;
    control.removeAt(index);
    this.cambioCount++;
  }

  getHistoriaMedica(): void {
    this.historiaMedicaService.getHistoriaMedicaByPacienteId(this.pacienteId).subscribe(
      (data) => {
        console.log('Historia médica cargada:', data);
        this.historiaMedica = data;
        this.setHistoriaForm(data);
      },
  
    );
  }

  setHistoriaForm(historia: HistoriaMedica): void {
    this.historiaForm.setValue({
      id: historia.id,
      antecedentesMedicos: [],
      cirugiasAnteriores: [],
      alergias: [],
      antecedentesFamiliares: []
    });
  
    this.setFormArray('antecedentesMedicos', historia.antecedentesMedicos);
    this.setFormArray('cirugiasAnteriores', historia.cirugiasAnteriores);
    this.setFormArray('alergias', historia.alergias);
    this.setFormArray('antecedentesFamiliares', historia.antecedentesFamiliares);
  }
  
  setFormArray(controlName: string, values: any[]): void {
    const control = this.historiaForm.get(controlName) as FormArray;
    values.forEach(value => {
      control.push(this.fb.control(value));
    });
  }

  cancelChanges(): void {
    window.location.reload();
  }
  
  
}
