import { Component, input, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from "../sidenav/sidenav.component";

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule, RouterModule,],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {


  @Input() collapsed=false;
  @Input() screenWidth=0;


  getBodyClass():string{
    let styleClass='';
    if(this.collapsed && this.screenWidth >768){
      styleClass = 'body-trimmed';
    } else if(this.collapsed && this.screenWidth <=768 && this.screenWidth>0){
styleClass='body-md-screen'
    }
    return styleClass;
  }
}
