import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Breakpoints, BreakpointState } from '@angular/cdk/layout';


@Component({
  selector: 'app-drawer-bar',
  templateUrl: './drawer-bar.component.html',
  styleUrls: ['./drawer-bar.component.css']
})
export class DrawerBarComponent {
  @Input() pagesRoutes: any = [];
  @Input() titlename: string | undefined = "";
  @Input() role: string = "";
  @Input() roleId: string = "";
  @Input() Employeeid:string = "";

  isDesktop: boolean = true;
  isMobile: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver, private route: ActivatedRoute, private router: Router) {

  }

  logout() {
    console.log("Logout Called")
    localStorage.clear();
    // localStorage.removeItem('token');
    // localStorage.removeItem('LoginInfo');
    // localStorage.removeItem('role');
    this.router.navigate(['./auth/login']);
  }


  ngOnInit() {
    this.breakpointObserver
      .observe(['(min-width: 500px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          console.log('Viewport width is 500px or greater!');
          this.isDesktop = true
          this.isMobile = false
        } else {
          console.log('Viewport width is less than 500px!');
          this.isMobile = true
          this.isDesktop = false

        }
      });
  }


  touchOptions(toggle: any) {
    if (!this.isDesktop) {
      toggle();
    }
  }
}
