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
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { AuthService } from 'src/app/services/auth.service';

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
  private pipe = new DatePipe('en-US');
  private today = new Date();
  invoiceByDateRequest:InvoiceByDateRequest;

  public totalCost: number; 
  public totalSales: number; 
  public totalEarnings: number;



  constructor(private invoiceService:Invoiceservice,
              private authService:AuthService){}


  ngOnInit(): void {
    this.date = new Date();
    this.invoiceByDateRequest = new InvoiceByDateRequest();
    this.invoiceByDateRequest.sellingPointId = this.authService.userData.sellingPointId;
    this.findInvoice();
    registerLocaleData( es );
  }

  public findInvoice():void {
    this.invoiceByDateRequest.date = this.pipe.transform(this.date, 'dd/MM/yyyy');
    this.invoiceService.getInvoiceByDate(this.invoiceByDateRequest)
                       .subscribe(response => {
                          console.log(response);
                          this.dataSource =  new MatTableDataSource<Invoice>(response.invoice);
                          this.dataSource.paginator = this.paginator;
                          this.totalCost = response.cost;
                          this.totalSales = response.total;
                          this.totalEarnings = response.profits;
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
