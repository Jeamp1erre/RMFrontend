import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Paciente } from '../../../shared/models/Paciente';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';


@Component({
  selector: 'app-addpacientedialog',
  standalone: true,
  imports: [MatDialogModule, 
    MatFormFieldModule,
    MatNativeDateModule, 
    CommonModule, 
    MatInputModule, 
    FormsModule, 
    MatButtonModule, 
    MatSelectModule, 
    MatOptionModule,
    MatDatepickerModule],
  templateUrl: './addpacientedialog.component.html',
  styleUrls: ['./addpacientedialog.component.css']
})
export class AddpacientedialogComponent {
  newPaciente: Paciente = {
    nombre: '',
    apellido: '',
    dni: '',
    fechaNacimiento: new Date(),
    genero: '',
    telefono: '',
    email: ''
  };

  constructor(public dialogRef: MatDialogRef<AddpacientedialogComponent>) {}

  onAdd(): void {
    this.dialogRef.close(this.newPaciente);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
