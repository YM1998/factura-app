import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError} from  'rxjs/operators'
import { PAYMENT_TYPE_GET_ALL } from '../util/enpoints.app';
import { PaymentType } from '../models/paymet_type';



@Injectable({providedIn: 'root'})
export class PaymentTypeService {

    constructor(private http:HttpClient) {}



    public getPaymentsTypeAll():Observable<PaymentType[]> {
        return this.http.get<PaymentType[]>(PAYMENT_TYPE_GET_ALL)
                        .pipe(catchError(e=>throwError(e)));
    }

}