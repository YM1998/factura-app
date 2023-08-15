import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from  'rxjs/operators'
import { INVOICE_GET_PDF, INVOICE_SAVE } from '../util/enpoints.app';
import { InvoiceRequest } from '../models/invoice_request/invoice_request';
import { InvoiceResponse } from '../models/invoice_response/invoice_response';
import { InvoicePdf } from '../models/invoice_response/invoice_pdf';



@Injectable({providedIn: 'root'})
export class Invoiceservice {

    constructor(private http:HttpClient){}


    public saveInvoice(invoice:InvoiceRequest):Observable<InvoiceResponse> {
        return this.http.post<InvoiceResponse>(INVOICE_SAVE, invoice)
                        .pipe(catchError(e => throwError(e)));
    }

    public getInvoicePdf(invoiceNumber:number):Observable<InvoicePdf> {
        return this.http.get<InvoicePdf>(INVOICE_GET_PDF.replace('{id}',invoiceNumber+''))
                        .pipe(catchError(e => throwError(e)));
    }

    

}