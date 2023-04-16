import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from  'rxjs/operators'
import { AttributteProduct } from '../models/attributes_product';
import { ATTRIBUTE_GET_ALL } from '../util/enpoints.app';



@Injectable({providedIn: 'root'})
export class AttributeService {

    constructor(private http:HttpClient) {}



    public getAttributeAll():Observable<AttributteProduct[]> {
        return this.http.get<AttributteProduct[]>(ATTRIBUTE_GET_ALL)
                        .pipe(catchError(e=>throwError(e)));
    }

}