import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from  'rxjs/operators'
import {  AUTH } from '../util/enpoints.app';
import { User } from '../models/user';



@Injectable({providedIn: 'root'})
export class AuthService {

    private _userData:User;
    private _token:string;

    public get userData(): User {
      if(this._userData!=null) {
        return this._userData;
      }else if(this._userData == null && sessionStorage.getItem("user")!=null){
        this._userData = JSON.parse(sessionStorage.getItem("user"));
        return this._userData;
      }

      return new User();
    }

    public get token(): string {
        if(this._token!=null) {
          return this._token;
        }else if(this._token == null && sessionStorage.getItem("token")!=null){
          this._token = sessionStorage.getItem("token");
          return this._token;
        }
  
        return null;
      }

    constructor(private http:HttpClient) {}



    public login(user:string,password:string, sellingPoint:number ):Observable<any> {
        const credentials = btoa('angularapp'+':'+'12345');
        const httpHeaders = new HttpHeaders({
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + credentials
        });

        let params = new URLSearchParams();
        params.set('grant_type','password');
        params.set('username', user+'-'+sellingPoint)
        params.set('password', password);
        console.log(params.toString());

        return this.http.post<any>(AUTH, params.toString(), {headers: httpHeaders})
                        .pipe(catchError(e=>throwError(e)));
    }


    public saveUserData(accessToken:string):void {
        let payload = JSON.parse(atob(accessToken.split(".")[1]));
        this._userData = new User();
        this._userData.id = payload.userId;
        this._userData.username = payload.user_name;
        this._userData.sellingPointId = payload.sellingPointId;
        this._userData.sellingPointName = payload.sellingPointName;
        this._userData.roles = payload.authorities; 
        sessionStorage.setItem('user',JSON.stringify(this._userData));
    }
  
    public saveTokenData(accessToken:string):void {
        this._token = accessToken;
        sessionStorage.setItem('token', this._token);
    }

    public isAuthenticated():boolean {
        if(this.token == null || this.token.length<=0){
            return false;
        }
        
        let payload = JSON.parse(atob(this.token.split(".")[1]));
        return payload!=null && payload.user_name && payload.user_name.length;
    }

    hasRoles(role:string): boolean {
      return this.userData.roles.includes(role);
    }

}