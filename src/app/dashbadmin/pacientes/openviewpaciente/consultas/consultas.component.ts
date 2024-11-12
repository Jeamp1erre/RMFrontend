import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConsultaService } from '../../../../shared/services/consulta.service';
import { Consulta } from '../../../../shared/models/Consulta';
import { EditconsultadialogComponent } from '../consultas/editconsultadialog/editconsultadialog.component';
import { OpenaddconsultadialogComponent } from './openaddconsultadialog/openaddconsultadialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DiagnosticosComponent } from './diagnosticos/diagnosticos.component'; 
import { Diagnostico } from '../../../../shared/models/Diagnostico';
import { DiagnosticoService } from '../../../../shared/services/diagnostico.service';
import { FormsModule } from '@angular/forms';
import {MatBadgeModule} from '@angular/material/badge';
import { TratamientoService } from '../../../../shared/services/tratamiento.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { Tratamiento } from '../../../../shared/models/Tratamiento';

import {MatIconModule} from '@angular/material/icon';
import { TratamientosComponent } from './tratamientos/tratamientos.component';
import { EditdiagnosticodialogComponent } from './editdiagnosticodialog/editdiagnosticodialog.component';
import { EdittratamientodialogComponent } from './edittratamientodialog/edittratamientodialog.component';

@Component({
  selector: 'app-consultas',
  standalone: true,
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule, MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,FormsModule,MatBadgeModule,MatSnackBarModule
  ]
})
export class ConsultasComponent implements OnInit {
  pacienteId: number = 0; 
  @Input() consultas: Consulta[] = [];
  @Input() length: number = 0;
  @Input() isLoading: boolean = false;
  @Input() pageSize: number = 10;
  @Input() pageIndex: number = 0;

  @Output() paginateChange = new EventEmitter<any>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() editConsulta = new EventEmitter<Consulta>();
  @Output() deleteConsulta = new EventEmitter<Consulta>();

  filteredConsultas: Consulta[] = [];
  diagnosticos: Diagnostico[] = [];
  nuevoDiagnostico: { nombreDoctor: string; descripcionDiagnostico: string } = { nombreDoctor: '', descripcionDiagnostico: '' };
  tratamientos: Tratamiento[] = [];
  cambioCount: number = 0;  

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private diagnosticoService: DiagnosticoService,
    private consultaService: ConsultaService,
    private tratamientoService: TratamientoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {this.diagnosticos = []; this.tratamientos=[]}

  ngOnInit(): void {
    this.pacienteId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.getConsultasByPacienteId(); 
  }

  getConsultasByPacienteId(): void {
    this.consultaService.getConsultasByPacienteId(this.pacienteId).subscribe(data => {
      console.log('Consultas cargadas:', data);
      this.consultas = data;
      this.filteredConsultas = [...this.consultas];
    });
  }

  onSearchChange(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredConsultas = this.consultas.filter(consulta =>
      consulta.motivoConsulta.toLowerCase().includes(searchTerm)
    );
    this.searchChange.emit(searchTerm);
  }

  onPaginateChange(event: any): void {
    this.paginateChange.emit(event);
  }

  onEditConsulta(consulta: Consulta): void {
    const dialogRef = this.dialog.open(EditconsultadialogComponent, {
      width: '400px',  
      data: consulta   
    });
  
    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        console.log('Consulta actualizada:', resultado);
        this.getConsultasByPacienteId(); 
      }
    });
  }
  

  onDeleteConsulta(consulta: Consulta): void {
    this.consultaService.deleteConsulta(consulta.id).subscribe({
      next: (response) => {
        console.log('Consulta eliminada exitosamente', response);
        this.getConsultasByPacienteId();
      },
      error: (err) => {
        this.getConsultasByPacienteId();
      }
    });
  }

  openAddConsultaDialog(): void {
    const dialogRef = this.dialog.open(OpenaddconsultadialogComponent, {
      width: '400px',
      data: { pacienteId: this.pacienteId }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró', result);
      this.getConsultasByPacienteId();
    });
  }

  onAddDiagnostico(consultaId: string): void {
    console.log('ID de consulta:', consultaId);
  
    const dialogRef = this.dialog.open(DiagnosticosComponent, {
      data: { consultaId } 
    });
  
    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        const { nombreDoctor, descripcionDiagnostico } = resultado;
        console.log('Datos recibidos:', nombreDoctor, descripcionDiagnostico);
  
        this.diagnosticoService.createDiagnostico(+consultaId, nombreDoctor, descripcionDiagnostico).subscribe(
          (nuevoDiagnostico: Diagnostico) => {
            console.log('Nuevo diagnóstico creado:', nuevoDiagnostico);
            this.actualizarConsultas(nuevoDiagnostico, +consultaId);
          },
          (error) => {
            console.error('Error al agregar el diagnóstico:', error);
          }
        );
      }
    });
}  
  
actualizarConsultas(nuevoDiagnostico: Diagnostico, consultaId: number) {
  const consulta = this.consultas.find(c => c.id === consultaId);
  if (consulta) {
    consulta.diagnosticos = consulta.diagnosticos || [];
    consulta.diagnosticos.push(nuevoDiagnostico); 
  }
}

  

  onAddTratamiento(diagnosticoId: string): void {
    const dialogRef = this.dialog.open(TratamientosComponent, {
      data: { diagnosticoId } 
    });
  
    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        const { descripcionTratamiento, duracionDias } = resultado;
  
        this.tratamientoService.createTratamiento(+diagnosticoId, descripcionTratamiento, duracionDias).subscribe(
          (nuevoTratamiento: Tratamiento) => {
            console.log('Nuevo tratamiento creado:', nuevoTratamiento);
            this.actualizarDiagnosticos(nuevoTratamiento, +diagnosticoId);
          },
          (error) => {
            console.error('Error al agregar el tratamiento:', error);
          }
        );
      }
    });
  }
  
  actualizarDiagnosticos(nuevoTratamiento: Tratamiento, diagnosticoId: number) {
    const diagnostico = this.findDiagnosticoById(diagnosticoId);
    if (diagnostico) {
      diagnostico.tratamientos = diagnostico.tratamientos || [];
      diagnostico.tratamientos.push(nuevoTratamiento);
    }
  }
  

  

  findDiagnosticoById(diagnosticoId: number): Diagnostico | undefined {
    for (const consulta of this.consultas) {
      const diagnostico = consulta.diagnosticos?.find(d => d.id === diagnosticoId);
      if (diagnostico) {
        return diagnostico;
      }
    }
    return undefined;
  }

  
  onDeleteDiagnostico(diagnosticoId: number, consultaId: number): void {
    this.diagnosticoService.deleteDiagnostico(diagnosticoId).subscribe({
      next: (response) => {
        console.log('Diagnóstico eliminado con éxito:', response);
        
        const diagnostico = this.findDiagnosticoById(diagnosticoId);
        if (diagnostico) {
          diagnostico.tratamientos.forEach((tratamiento) => {
            this.tratamientoService.deleteTratamiento(tratamiento.id).subscribe({
              next: (response) => {
                console.log('Tratamiento eliminado:', response);
              },
              error: (err) => {
                console.error('Error al eliminar tratamiento:', err);
              }
            });
          });
        }
  
        this.getConsultasByPacienteId();
      },
      error: (err) => {
        this.getConsultasByPacienteId();
      }
    });
  }
  onEditDiagnostico(diagnostico: Diagnostico): void {
    const dialogRef = this.dialog.open(EditdiagnosticodialogComponent, {
      width: '400px',
      data: diagnostico  
    });
  
    dialogRef.afterClosed().subscribe((updatedDiagnostico) => {
      if (updatedDiagnostico) {
        console.log('Diagnóstico actualizado:', updatedDiagnostico);
        this.getConsultasByPacienteId();
      }
    });
  }
  onEditTratamiento(tratamiento: Tratamiento): void {
    const dialogRef = this.dialog.open(EdittratamientodialogComponent, {
      width: '400px', 
      data: tratamiento 
    });
  
    dialogRef.afterClosed().subscribe((tratamientoActualizado) => {
      if (tratamientoActualizado) {
        console.log('Tratamiento actualizado:', tratamientoActualizado);
        this.actualizarTratamientos(tratamientoActualizado);
      }
    });
  }
  
  actualizarTratamientos(updatedTratamiento: Tratamiento): void {
    for (const consulta of this.consultas) {
      for (const diagnostico of consulta.diagnosticos) {
        const tratamientoIndex = diagnostico.tratamientos.findIndex(t => t.id === updatedTratamiento.id);
        if (tratamientoIndex !== -1) {
          diagnostico.tratamientos[tratamientoIndex] = updatedTratamiento;  
        }
      }
    }
  }
  
  onDeleteTratamiento(tratamientoId: number, diagnosticoId: number): void {
    this.tratamientoService.deleteTratamiento(tratamientoId).subscribe({
      next: () => {
        console.log('Tratamiento eliminado exitosamente');
  
        const diagnostico = this.findDiagnosticoById(diagnosticoId);
        if (diagnostico) {
          diagnostico.tratamientos = diagnostico.tratamientos.filter(
            (tratamiento) => tratamiento.id !== tratamientoId
          );
        }
  
        this.getConsultasByPacienteId();
      },
      error: (err) => {
        console.error('Error al eliminar tratamiento:', err);
        this.snackBar.open('Error al eliminar tratamiento', 'Cerrar', {
          duration: 3000,
          panelClass: ['snack-bar-error']
        });
      }
    });
  }
  
 
}
