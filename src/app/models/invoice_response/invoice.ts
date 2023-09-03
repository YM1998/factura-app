import { InvoiceDetails } from "./invoice_details";

export class Invoice{
    id:number;
    cost:number;
    createdAt:string;
    iva:number;
    subtotal:number;
    total:number;
    paymentTypeId:number;
    paymentTypeName:string;
    clientName:string;
    invoiceDetails:InvoiceDetails[];
}