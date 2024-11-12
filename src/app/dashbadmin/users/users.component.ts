import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { User } from '../../shared/models/User';
import { PageEvent } from '@angular/material/paginator';
import { UserService } from '../../shared/services/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { AdduserdialogComponent } from './adduserdialog/adduserdialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EdituserdialogComponent } from './edituserdialog/edituserdialog.component';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatPaginatorModule,
     MatIconModule,
      MatTableModule, 
     MatButtonModule,
      MatFormFieldModule, 
     CommonModule, 
     MatInputModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phone', 'username', 'role', 'actions'];
  dataSource: User[] = []; 
  filteredData: User[] = [];
  isLoading: boolean = false;
  length = 0; 
  pageSize = 15;
  pageIndex = 0; 
  searchTerm: string = '';

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadUsers();
  }

  private loadUsers() {
    this.isLoading = true;

    this.userService.getAllUsers().subscribe(users => {
      this.dataSource = users;
      this.filteredData = users; 
      this.length = users.length;
      this.isLoading = false;
    }, error => {
      console.error('Error al cargar usuarios:', error);
      alert('No se pudieron cargar los usuarios. Intenta nuevamente.');
      this.isLoading = false;
    });
  }

  onPaginateChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const searchValue = target ? target.value.toLowerCase() : '';
    this.searchTerm = searchValue;

    this.applyFilter();
  }

  private applyFilter() {
    if (this.searchTerm.trim() === '') {
      this.filteredData = this.dataSource; 
    } else {
      this.filteredData = this.dataSource.filter(user => 
        user.firstName.toLowerCase().includes(this.searchTerm) || 
        user.lastName.toLowerCase().includes(this.searchTerm) || 
        user.username.toLowerCase().includes(this.searchTerm)
      );
    }
    this.length = this.filteredData.length; 
  }

  deleteUser(user: User) {
    if (confirm(`¿Estás seguro de que deseas eliminar a ${user.firstName} ${user.lastName}?`)) {
      this.userService.deleteUser(user.id).subscribe(() => {
        this.loadUsers(); 
      }, error => {
        console.error('Error al eliminar el usuario:', error);
        alert('No se pudo eliminar el usuario. Intenta nuevamente.');
      });
    }
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AdduserdialogComponent);
  
    dialogRef.afterClosed().subscribe((result: User | undefined) => {
      if (result) {
        result.role = result.role || 'USER';
        this.userService.createUser(result).subscribe({
          next: () => {
            this.loadUsers(); 
          },
          error: (err) => {
            console.error('Error al crear el usuario:', err);
            alert('No se pudo agregar el usuario. Intenta nuevamente.');
          }
        });
      }
    });
  }
  
  openEditUserDialog(user: User): void {
    const dialogRef = this.dialog.open(EdituserdialogComponent, {
        data: user 
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
            this.userService.updateUser(user.id, result).subscribe({
                next: (updatedUser) => {
                    const index = this.dataSource.findIndex(u => u.id === user.id);
                    if (index > -1) {
                        this.dataSource[index] = updatedUser;
                        this.applyFilter(); 
                    }
                },
                error: (err) => {
                    console.error('Error al actualizar el usuario:', err);
                    alert('No se pudo actualizar el usuario. Intenta nuevamente.');
                }
            });
        }
    });
  }
}
