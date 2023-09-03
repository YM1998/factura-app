import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Invoice } from 'src/app/models/invoice_response/invoice';
import { Invoiceservice } from 'src/app/services/invoice.service';
import { DatePipe } from '@angular/common';
import { InvoiceByDateRequest } from 'src/app/models/invoice_request/invoiceByDateRequest';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { InvoicePdf } from 'src/app/models/invoice_response/invoice_pdf';

@Component({
  selector: 'app-invoice-report',
  templateUrl: './invoice-report.component.html',
  styleUrls: ['./invoice-report.component.css']
})
export class InvoiceReportComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource : MatTableDataSource<Invoice> ; 
  public displayedColumns: string[] = ['Cliente', 'FormaPago', 'Iva', 'Subtotal', 'Total','Costos','Ganancias','Fecha','Accion'];
  public date:Date;
  pipe = new DatePipe('en-US');
  today = new Date();
  invoiceByDateRequest:InvoiceByDateRequest;


  constructor(private invoiceService:Invoiceservice){}


  ngOnInit(): void {
    this.date = new Date();
    this.invoiceByDateRequest = new InvoiceByDateRequest();
    this.invoiceByDateRequest.sellingPointId = 1;
    this.findInvoice();
  }

  public findInvoice():void {
    this.invoiceByDateRequest.date = this.pipe.transform(this.date, 'dd/MM/yyyy');
    this.invoiceService.getInvoiceByDate(this.invoiceByDateRequest)
                       .subscribe(response => {
                          console.log(response);
                          this.dataSource =  new MatTableDataSource<Invoice>(response.invoice);
                          this.dataSource.paginator = this.paginator;
                        });
  }



  public generatePdf(invoice:Invoice) : void {
    this.invoiceService
        .getInvoicePdf(invoice.id)
        .subscribe((pdfResponse) => this.generateInvoicePdf(pdfResponse))
  }


  private generateInvoicePdf(pdfResponse:InvoicePdf): void {
    const byteCharacters = atob(pdfResponse.filePdf);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers); 
    let file = new Blob([byteArray], { type: 'application/pdf' }); 
    console.log(file);
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL);

}


}
