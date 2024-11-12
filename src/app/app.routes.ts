import { Routes } from '@angular/router';
import { LoginComponent } from './iniciosesion/components/login/login.component';
import { DashbadminComponent } from './dashbadmin/dashbadmin.component';
import { UsersComponent } from './dashbadmin/users/users.component';
import { PacientesComponent } from './dashbadmin/pacientes/pacientes.component';
import { OpenviewpacienteComponent } from './dashbadmin/pacientes/openviewpaciente/openviewpaciente.component';
import { CuentaComponent } from './dashbadmin/cuenta/cuenta.component';
import { DashbuserComponent } from './dashbuser/dashbuser.component';

export const routes: Routes = [ 
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component:LoginComponent },

    {
        path: 'dashbadmin', component:DashbadminComponent , children: [
            { path: 'users', component: UsersComponent },
            { path: 'pacientes', component: PacientesComponent },
            { path: 'pacientes/:id', component: OpenviewpacienteComponent },
            { path: 'cuenta', component: CuentaComponent },
            
            { path: '', redirectTo: 'users', pathMatch: 'full' } 
        ]
    },
    {
        path: 'dashbuser', component:DashbuserComponent , children: [
            { path: 'pacientes', component: PacientesComponent },
            { path: 'pacientes/:id', component: OpenviewpacienteComponent },
            { path: 'cuenta', component: CuentaComponent },
            
            { path: '', redirectTo: 'pacientes', pathMatch: 'full' } 
        ]
    },
   
];

