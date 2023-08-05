import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from  'rxjs/operators'
import { AttributteProduct } from '../models/attributes_product';
import { ATTRIBUTE_GET_ALL, SELLING_POINT_FIND_ID } from '../util/enpoints.app';
import { SellingPoint } from '../models/selling_point';



@Injectable({providedIn: 'root'})
export class SellingPointService {

    constructor(private http:HttpClient) {}


    public findById(id:number):Observable<SellingPoint> {
        return this.http.get<SellingPoint>(SELLING_POINT_FIND_ID.replace('{id}',id+""))
                        .pipe(catchError(e=>throwError(e)));
    }

}