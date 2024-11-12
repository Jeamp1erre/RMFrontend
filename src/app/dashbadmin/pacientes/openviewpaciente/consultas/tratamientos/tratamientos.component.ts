import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-tratamientos',
  standalone: true,
  imports: [MatDialogModule,MatButtonModule,CommonModule,MatInputModule,FormsModule,MatFormFieldModule],
  templateUrl: './tratamientos.component.html',
  styleUrl: './tratamientos.component.css'
})
export class TratamientosComponent {
  descripcionTratamiento: string = '';
  duracionDias: number = 0;

  constructor(
    public dialogRef: MatDialogRef<TratamientosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any  
  ) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    const tratamiento = {
      descripcionTratamiento: this.descripcionTratamiento,
      duracionDias: this.duracionDias
    };
    this.dialogRef.close(tratamiento);  
  }
}