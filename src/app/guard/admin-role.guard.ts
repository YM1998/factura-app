import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ROLE_ADMIN } from '../util/constants';

@Injectable({
  providedIn: 'root'
})
export class AdminRoleGuard implements CanLoad {
  constructor(private authService:AuthService,
    private router:Router){}

canLoad(route: Route): boolean {
if(this.authService.isAuthenticated() && this.authService.hasRoles(ROLE_ADMIN)) {
   return true;
}

this.router.navigate(['/login']);
return false;
}

}
