import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsultaService } from '../../../../../shared/services/consulta.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-openaddconsultadialog',
  standalone: true,
  imports: [
    CommonModule, 
    MatDialogModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule
  ],
  templateUrl: './openaddconsultadialog.component.html',
  styleUrls: ['./openaddconsultadialog.component.css']
})
export class OpenaddconsultadialogComponent {
  consultaForm: FormGroup;

  
  constructor(
    private fb: FormBuilder,
    private consultaService: ConsultaService,
    private dialogRef: MatDialogRef<OpenaddconsultadialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any  
  ) {
    this.consultaForm = this.fb.group({
      motivoConsulta: ['', Validators.required],  
    });
  }

  onCreateConsulta(): void {
    if (this.consultaForm.invalid) {
      return;
    }

    const motivoConsulta = this.consultaForm.value.motivoConsulta;
    const pacienteId = this.data.pacienteId;  

    this.consultaService.createConsulta(pacienteId, motivoConsulta).subscribe({
      next: (consulta) => {
        console.log('Consulta creada:', consulta);
        this.dialogRef.close();  
      },
      error: (err) => {
        console.error('Error al crear consulta:', err);
      }
    });
  }

  onClose(): void {
    this.dialogRef.close();  
  }
}