import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Consulta } from '../../../../../shared/models/Consulta';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ConsultaService } from '../../../../../shared/services/consulta.service';

@Component({
  selector: 'app-editconsultadialog',
  standalone: true,
  imports: [MatDialogModule, 
    MatFormFieldModule, 
    CommonModule, 
    FormsModule, 
    MatInputModule, 
    MatButtonModule],
  templateUrl: './editconsultadialog.component.html',
  styleUrls: ['./editconsultadialog.component.css']
})
export class EditconsultadialogComponent {

  consultaId: number;  
  nuevoMotivo: string; 
  
  constructor(
    private consultaService: ConsultaService,
    public dialogRef: MatDialogRef<EditconsultadialogComponent>,
    @Inject(MAT_DIALOG_DATA) public consulta: Consulta
  ) {  
    this.consultaId = consulta.id;
    this.nuevoMotivo = consulta.motivoConsulta;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.consultaService.updateMotivoConsulta(this.consultaId, this.nuevoMotivo).subscribe(
      (updatedConsulta) => {
        console.log('Consulta actualizada:', updatedConsulta);
        this.dialogRef.close(updatedConsulta); 
      },
      (error) => {
        console.error('Error al actualizar la consulta:', error);
      }
    );
  }
}
