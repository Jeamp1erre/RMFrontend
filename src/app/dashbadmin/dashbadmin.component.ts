import { Component } from '@angular/core';
import { BodyComponent } from "./body/body.component";
import { SidenavComponent } from './sidenav/sidenav.component';


interface SideNavToggle{
  screenWidth:number;
  collapsed:boolean;

}

@Component({
  selector: 'app-dashbadmin',
  standalone: true,
  imports: [SidenavComponent, BodyComponent],
  templateUrl: './dashbadmin.component.html',
  styleUrl: './dashbadmin.component.css'
})
export class DashbadminComponent {
  isSideNavCollapsed=false;
  screenWidth=0;


  onToggleSideNav(data:SideNavToggle):void{
    this.screenWidth=data.screenWidth;
    this.isSideNavCollapsed=data.collapsed;
  }
}
