import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { navbarData } from './nav-data';
import { navbarUserData } from './nav-user-data';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { AuthService } from '../../shared/services/auth.service';


export interface SideNavToggle{
  screenWidth:number;
  collapsed:boolean;

}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterModule,MatIconModule,],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
  animations:[trigger('fadeInOut',[
                        transition(':enter',[
                            style({opacity:0}),
                             animate ('350ms',
                              style({opacity:1})
                            )
                          ]),
                          transition(':leave',[
                            style({opacity:1}),
                             animate ('350ms',
                              style({opacity:0})
                            )
                          ])
                        ]),
                        trigger('rotate',[
                          transition(':enter',[
                            animate('1000ms',
                              keyframes([
                                style({transform:'rotate(0deg)',offset:'0'}),
                                style({transform:'rotate(2turn)',offset:'1'}),
                              ])
                            )
                          ])  
                        ])
                      ]
})
export class SidenavComponent implements OnInit {

  constructor(private AuthService: AuthService, private router: Router) {}

  @Output()onToggleSideNav: EventEmitter<SideNavToggle>=new EventEmitter();
  collapsed=false;
  screenWidth=0;
  navData: any[] = [];
  

  @HostListener('window:resize',['$event'])
  onResize(event:any){
    this.screenWidth=window.innerWidth; 
    if(this.screenWidth <= 768){
      this.collapsed=false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth:this.screenWidth});
    }
  }

  logout(): void {
    this.AuthService.logout();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
      this.screenWidth=window.innerWidth; 
      this.loadNavData();
  }

  loadNavData(): void {
    const role = sessionStorage.getItem('role'); 

    if (role === 'admin') {
      this.navData = navbarData; 
    } else {
      this.navData = navbarUserData;  
    }
  }

  toggleCollapse():void{
    this.collapsed=!this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed,screenWidth: this.screenWidth})
  }

  closeSidenav():void{
    this.collapsed=false;
    this.onToggleSideNav.emit({collapsed: this.collapsed,screenWidth: this.screenWidth})

  }
}
