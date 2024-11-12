import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../shared/models/User';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-adduserdialog',
  standalone: true,
  imports: [MatDialogModule,
     MatFormFieldModule,
      CommonModule, 
      MatInputModule,
       FormsModule, 
       MatButtonModule , 
      MatSelectModule, 
       MatOptionModule],
  templateUrl: './adduserdialog.component.html',
  styleUrls: ['./adduserdialog.component.css']
})
export class AdduserdialogComponent {
  newUser: User = { id: 0, firstName: '', lastName: '', email: '', phone: '', username: '', password: '', role: 'USER' };
  roles: string[] = ['USER', 'ADMIN'];

  constructor(public dialogRef: MatDialogRef<AdduserdialogComponent>) {}

  onAdd(): void {
    this.dialogRef.close(this.newUser);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
