import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Tratamiento } from '../../../../../shared/models/Tratamiento';
import { TratamientoService } from '../../../../../shared/services/tratamiento.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edittratamientodialog',
  standalone: true,
  imports: [MatDialogModule, 
    MatFormFieldModule, 
    CommonModule, 
    MatInputModule, 
    MatButtonModule, 
    FormsModule],
  templateUrl: './edittratamientodialog.component.html',
  styleUrls: ['./edittratamientodialog.component.css']
})
export class EdittratamientodialogComponent {
  tratamientoId: number;
  descripcionTratamiento: string;
  duracionDias: number;

  constructor(
    private tratamientoService: TratamientoService,
    public dialogRef: MatDialogRef<EdittratamientodialogComponent>,
    @Inject(MAT_DIALOG_DATA) public tratamiento: Tratamiento
  ) {
    this.tratamientoId = tratamiento.id;
    this.descripcionTratamiento = tratamiento.descripcionTratamiento;
    this.duracionDias = tratamiento.duracionDias;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    const updatedTratamiento: Tratamiento = {
      id: this.tratamientoId,
      descripcionTratamiento: this.descripcionTratamiento,
      duracionDias: this.duracionDias
    };

    this.tratamientoService.updateTratamiento(this.tratamientoId, updatedTratamiento).subscribe(
      (tratamientoActualizado) => {
        console.log('Tratamiento actualizado:', tratamientoActualizado);
        this.dialogRef.close(tratamientoActualizado);  
      },
      (error) => {
        console.error('Error al actualizar el tratamiento:', error);
      }
    );
  }
}
