import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Paciente } from '../../shared/models/Paciente';
import { PageEvent } from '@angular/material/paginator';
import { PacienteService } from '../../shared/services/paciente.service'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { AddpacientedialogComponent } from './addpacientedialog/addpacientedialog.component';
import { Router } from '@angular/router';
import { EditpacientedialogComponent } from './editpacientedialog/editpacientedialog.component';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [MatPaginatorModule, 
    MatTableModule,
    MatIconModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    CommonModule, 
    MatInputModule],
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'dni', 'fechaNacimiento', 'genero', 'telefono', 'email', 'acciones'];
  dataSource: Paciente[] = [];
  isLoading: boolean = false;
  length = 0; 
  pageSize = 15; 
  pageIndex = 0; 
  filteredData: Paciente[] = [];
  pacientes: Paciente[] = [];

  constructor(private pacienteService: PacienteService, private dialog: MatDialog, private router: Router) {}

  ngOnInit() {
    this.loadPacientes();
  }

  private loadPacientes() {
    this.isLoading = true;
    this.pacienteService.getAllPacientes().subscribe(pacientes => {
      this.dataSource = pacientes.map(paciente => ({
        ...paciente,
        fechaNacimiento: new Date(paciente.fechaNacimiento) 
      }));
      this.pacientes = [...this.dataSource];
      this.filteredData = [...this.dataSource];
      this.length = this.dataSource.length;
      this.isLoading = false;
    }, error => {
      console.error('Error al cargar pacientes:', error);
      this.isLoading = false;
    });
  }

  onPaginateChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const searchValue = target ? target.value.toLowerCase() : '';
    this.filteredData = this.pacientes.filter(paciente => 
      paciente.nombre.toLowerCase().includes(searchValue) || 
      paciente.apellido.toLowerCase().includes(searchValue) ||
      paciente.dni.includes(searchValue) 
    );
  }

  deletePaciente(paciente: Paciente) {
    if (confirm(`¿Estás seguro de que deseas eliminar a ${paciente.nombre} ${paciente.apellido}?`)) {
      this.pacienteService.deletePaciente(paciente.id!).subscribe(() => {
        this.loadPacientes();
      }, error => {
        console.error('Error al eliminar el paciente:', error);
        alert('No se pudo eliminar el paciente. Intenta nuevamente.');
      });
    }
  }

  openAddPacienteDialog(): void {
    const dialogRef = this.dialog.open(AddpacientedialogComponent);
    dialogRef.afterClosed().subscribe((result: Paciente | undefined) => {
      if (result) {
        this.pacienteService.createPaciente(result).subscribe({
          next: () => this.loadPacientes(),
          error: (err) => {
            console.error('Error al crear el paciente:', err);
            alert('No se pudo agregar el paciente. Intenta nuevamente.');
          }
        });
      }
    });
  }

  openEditPacienteDialog(paciente: Paciente): void {
    const dialogRef = this.dialog.open(EditpacientedialogComponent, {
      data: paciente
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pacienteService.patchPaciente(paciente.id!, result).subscribe({
          next: () => this.loadPacientes(),
          error: (err) => {
            console.error('Error al actualizar el paciente:', err);
            alert('No se pudo actualizar el paciente. Intenta nuevamente.');
          }
        });
      }
    });
  }

  openViewPaciente(paciente: Paciente): void {
    this.router.navigate(['/dashbadmin/pacientes', paciente.id]);
  }
}
