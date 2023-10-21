import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from  'rxjs/operators'
import { AttributteProduct } from '../models/attributes_product';
import { ATTRIBUTE_GET_ALL } from '../util/enpoints.app';
import { AuthService } from '../services/auth.service';



@Injectable({providedIn: 'root'})
export class TokenInterceptor implements HttpInterceptor {


    private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

    constructor(private authService:AuthService) {}


    intercept(req: HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>> {
        let token =  this.authService.token;

        if(token!=null) {
            const authReq = req.clone({
                headers:req.headers.set('Authorization','Bearer '+token)
            })
            return next.handle(authReq);
        }

        return next.handle(req);
    }

    
}