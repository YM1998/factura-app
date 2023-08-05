import { InvoiceDetailRequest } from "./invoice_detail_request";

export class InvoiceRequest {
    sellerId:number;
    clientId:number;
    paymentTypeId:number;
    invoiceDetails:InvoiceDetailRequest[];
 }