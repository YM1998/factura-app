import { InvoiceDetailRequest } from "./invoice_detail_request";

export class InvoiceRequest {
    clientId:number;
    paymentTypeId:number;
    invoiceDetails:InvoiceDetailRequest[];
 }