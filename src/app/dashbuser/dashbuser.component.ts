import { Component } from '@angular/core';
import { BodyComponent } from '../dashbadmin/body/body.component';
import { SidenavComponent } from '../dashbadmin/sidenav/sidenav.component';


interface SideNavToggle{
  screenWidth:number;
  collapsed:boolean;

}

@Component({
  selector: 'app-dashbuser',
  standalone: true,
  imports: [SidenavComponent, BodyComponent],
  templateUrl: './dashbuser.component.html',
  styleUrl: './dashbuser.component.css'
})
export class DashbuserComponent {
  isSideNavCollapsed=false;
  screenWidth=0;


  onToggleSideNav(data:SideNavToggle):void{
    this.screenWidth=data.screenWidth;
    this.isSideNavCollapsed=data.collapsed;
  }
}

