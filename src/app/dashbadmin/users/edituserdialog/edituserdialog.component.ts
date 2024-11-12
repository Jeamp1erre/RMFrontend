import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../shared/models/User';
import { UserService } from '../../../shared/services/user.service'; 
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { catchError, of } from 'rxjs';  

@Component({
  selector: 'app-edituserdialog',
  standalone: true,
  imports: [
    MatDialogModule, MatButtonModule,
    MatFormFieldModule,
    CommonModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './edituserdialog.component.html',
  styleUrls: ['./edituserdialog.component.css']
})
export class EdituserdialogComponent {
  roles: string[] = ['USER', 'ADMIN'];

  constructor(
    public dialogRef: MatDialogRef<EdituserdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private userService: UserService  
  ) {
    this.data.password = ''; 
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  onSaveClick(): void {
    if (!this.data.password) {
      delete this.data.password; 
    }
  
    console.log('Datos a enviar:', this.data);  
  
    this.userService.updateUser(this.data.id, this.data).pipe(
      catchError(error => {
        console.error('Error al actualizar el usuario:', error);
        alert('No se pudo actualizar el usuario. Intente nuevamente.');
        return of(null); 
      })
    ).subscribe(updatedUser => {
      if (updatedUser) {
        this.dialogRef.close(updatedUser);  
      }
    });
  }
  
}