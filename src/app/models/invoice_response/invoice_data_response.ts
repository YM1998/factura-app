import { Invoice } from "./invoice";

export class InvoiceDataResponse {
    invoice:Invoice[];
    total:number;
    subtotal:number;
    cost:number;
}