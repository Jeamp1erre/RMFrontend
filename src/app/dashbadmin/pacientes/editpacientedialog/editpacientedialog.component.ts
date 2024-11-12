import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Paciente } from '../../../shared/models/Paciente';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-editpacientedialog',
  standalone: true,
  imports: [
    MatDialogModule, 
    MatFormFieldModule,
    MatNativeDateModule, 
    CommonModule, 
    MatInputModule, 
    FormsModule, 
    MatButtonModule, 
    MatSelectModule, 
    MatOptionModule,
    MatDatepickerModule
  ],
  templateUrl: './editpacientedialog.component.html',
  styleUrls: ['./editpacientedialog.component.css']
})
export class EditpacientedialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditpacientedialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Paciente
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
