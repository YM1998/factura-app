import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from  'rxjs/operators'
import { INVOICE_GET_BY_DATE, INVOICE_GET_PDF, INVOICE_SAVE } from '../util/enpoints.app';
import { InvoiceRequest } from '../models/invoice_request/invoice_request';
import { InvoiceResponse } from '../models/invoice_response/invoice_response';
import { InvoicePdf } from '../models/invoice_response/invoice_pdf';
import { InvoiceByDateRequest } from '../models/invoice_request/invoiceByDateRequest';
import { Invoice } from '../models/invoice_response/invoice';
import { InvoiceDataResponse } from '../models/invoice_response/invoice_data_response';



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

    public getInvoiceByDate(invoiceByDateRequest:InvoiceByDateRequest):Observable<InvoiceDataResponse> {
        return this.http.post<InvoiceDataResponse>(INVOICE_GET_BY_DATE, invoiceByDateRequest)
                        .pipe(catchError(e => throwError(e)));
    }

    

}