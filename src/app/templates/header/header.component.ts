import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent {

  constructor(private router:Router,
              public authService:AuthService) { }


  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  public hasRole(rol:string):boolean {
    return this.authService.hasRoles(rol);
  }
  

          


  

}
