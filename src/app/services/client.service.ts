import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError} from  'rxjs/operators'
import { CLIENT_FIND_ID } from '../util/enpoints.app';
import { Client } from '../models/client';



@Injectable({providedIn: 'root'})
export class ClientService {

    constructor(private http:HttpClient) {}



    public findByClientId(id:number):Observable<Client> {
        return this.http.get<Client>(CLIENT_FIND_ID.replace('{id}',id+""))
                        .pipe(catchError(e=>throwError(e)));
    }

}