import { Component, Inject, inject  } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-diagnosticos',
  standalone: true,
  imports: [ ReactiveFormsModule,
    MatFormFieldModule, 
    FormsModule,
    MatInputModule,  
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule],
  templateUrl: './diagnosticos.component.html',
  styleUrl: './diagnosticos.component.css'
})
export class DiagnosticosComponent {
  nombreDoctor: string = '';
  descripcionDiagnostico: string = '';

  constructor(
    public dialogRef: MatDialogRef<DiagnosticosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    const diagnostico = {
      nombreDoctor: this.nombreDoctor,
      descripcionDiagnostico: this.descripcionDiagnostico
    };
    this.dialogRef.close(diagnostico); 
  }
}