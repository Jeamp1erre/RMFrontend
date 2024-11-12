import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Diagnostico } from '../../../../../shared/models/Diagnostico';  // Asegúrate de tener el modelo adecuado
import { DiagnosticoService } from '../../../../../shared/services/diagnostico.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-editdiagnosticodialog',
  standalone: true,
  imports: [MatDialogModule, 
    MatFormFieldModule, 
    CommonModule, 
    FormsModule, 
    MatInputModule, 
    MatButtonModule],
  templateUrl: './editdiagnosticodialog.component.html',
  styleUrls: ['./editdiagnosticodialog.component.css']
})
export class EditdiagnosticodialogComponent {

  diagnosticoId: number; 
  nuevoNombreDoctor: string;  
  nuevaDescripcion: string;   
  
  constructor(
    private diagnosticoService: DiagnosticoService,
    public dialogRef: MatDialogRef<EditdiagnosticodialogComponent>,
    @Inject(MAT_DIALOG_DATA) public diagnostico: Diagnostico
  ) {
    this.diagnosticoId = diagnostico.id;
    this.nuevoNombreDoctor = diagnostico.nombreDoctor;
    this.nuevaDescripcion = diagnostico.descripcionDiagnostico;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.diagnosticoService.updateDiagnostico(this.diagnosticoId, this.nuevoNombreDoctor, this.nuevaDescripcion).subscribe(
      (updatedDiagnostico) => {
        console.log('Diagnóstico actualizado:', updatedDiagnostico);
        this.dialogRef.close(updatedDiagnostico); 
      },
      (error) => {
        console.error('Error al actualizar el diagnóstico:', error);
      }
    );
  }
}
