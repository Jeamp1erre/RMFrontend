import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../shared/models/User';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cuenta',
  standalone: true,
  imports: [FormsModule, 
    CommonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule],
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {
  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    role: ''
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userService.getCurrentUser().subscribe({
      next: (userData) => {
        this.user = { ...userData, password: '' }; 
      },
      error: (err) => {
        console.error('Error al cargar el perfil del usuario', err);
        this.snackBar.open('Error al cargar los datos del usuario. Inténtalo de nuevo más tarde.', 'Cerrar', { duration: 3000 });
      }
    });
  }

  onSubmit(): void {
    if (this.user.id === undefined || this.user.id === null) {
      console.error('Error: ID no disponible');
      this.snackBar.open('Error: ID no disponible para actualizar el perfil', 'Cerrar', { duration: 3000 });
      return;
    }

  
    const userUpdate: Partial<User> = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      phone: this.user.phone,
      password: this.user.password || '', 
    };

    this.userService.updateSelf(userUpdate).subscribe({
      next: (updatedUser) => {
        console.log('Perfil actualizado con éxito', updatedUser);
        this.snackBar.open('Perfil actualizado con éxito', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/dashbadmin/users']);
      },
      error: (err) => {
        console.error('Error al actualizar el perfil', err);
        this.snackBar.open('Error al actualizar el perfil. Inténtalo de nuevo más tarde.', 'Cerrar', { duration: 3000 });
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/dashbadmin/users']);
  }
}
