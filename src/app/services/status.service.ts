import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Status } from '../models/status';
import { STATE_GET_ALL } from '../util/enpoints.app';

@Injectable({providedIn: 'root'})
export class StatusService {
    
    constructor(private http:HttpClient) { }

    public getStatus():Observable<Status[]>{
        return this.http.get<Status[]>(STATE_GET_ALL)
                        .pipe(catchError( e => throwError(e)));
      }
    
}