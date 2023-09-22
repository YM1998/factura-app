import { Injectable } from '@angular/core';
import {  CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {


  constructor(private authService:AuthService,
              private router:Router){}

canLoad(route: Route): boolean {
   
      if(this.authService.isAuthenticated()){

        if(this.isTokenExpired()){
          this.authService.logout();
          this.router.navigate(['/login']);
          return false;
        }

        return true;
      }
   
    this.router.navigate(['/login']);
  
   return false;
  }

  private isTokenExpired():boolean {
    let token = this.authService.token;
    let payload = this.authService.getPayLoad(token);
    let now = new Date().getTime()/ 1000;
    return payload.exp < now;
  }
  
}
