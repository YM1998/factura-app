import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from  'rxjs/operators'
import { INVOICE_SAVE } from '../util/enpoints.app';
import { InvoiceRequest } from '../models/invoice_request/invoice_request';



@Injectable({providedIn: 'root'})
export class Invoiceservice {

    constructor(private http:HttpClient){}


    public saveInvoice(invoice:InvoiceRequest):Observable<void> {
        return this.http.post<void>(INVOICE_SAVE, invoice)
                        .pipe(catchError(e => throwError(e)));
    }
    

}