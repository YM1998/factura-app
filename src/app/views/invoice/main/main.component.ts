import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Client } from 'src/app/models/client';
import { InvoiceCarts } from 'src/app/models/invoice_carts';
import { PaymentType } from 'src/app/models/paymet_type';
import { SellingPoint } from 'src/app/models/selling_point';
import { ClientService } from 'src/app/services/client.service';
import { PaymentTypeService } from 'src/app/services/payment_type.service';
import { ProductService } from 'src/app/services/product.service';
import { SellingPointService } from 'src/app/services/selling_point.service';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from 'src/app/handlers/message.service';
import { Product } from 'src/app/models/product';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import swal from 'sweetalert2';
import { InvoiceRequest } from 'src/app/models/invoice_request/invoice_request';
import { Invoiceservice } from 'src/app/services/invoice.service';
import { ExceptionHandlerService } from 'src/app/handlers/exception_handler.service';
import { InvoicePdf } from 'src/app/models/invoice_response/invoice_pdf';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  
  
  public paymentTypeList:PaymentType[];
  
  public client:Client;
  public sellingPoint:SellingPoint;  
  public paymentTypeId:number;
  public paymentTypeName:string;
  public invoiceCarts:MatTableDataSource<InvoiceCarts> ;
  public productCode:string;
  public total:number;


  private ID_CLIENT_GENERAL:number = 1;
  private INVOICES_SESSION_STORAGE:string = "DATA_INVOICE";

  
  public productCodeValidator = new FormControl('', [Validators.required]);
  public paymentTypeValidators = new FormControl('', [Validators.required]);

  displayedColumns: string[] = ['Codigo', 'Nombre','Cantidad','Precio','Total','Acciones'];
  displayStyle:string = "none";
  public clientePayment:number;
  public changeClient:number;

  constructor(private clientService:ClientService,
              private sellingPointService:SellingPointService,
              private paymentTypeService:PaymentTypeService,
              private productService:ProductService,
              private messageService:MessageService,
              private invoiceService:Invoiceservice,
              private exceptionHandler:ExceptionHandlerService,
              private authService:AuthService) {}


  ngOnInit(): void {
    document.getElementById("codeproduct").focus();
    this.clientService.findByClientId(this.ID_CLIENT_GENERAL).subscribe(result => this.client = result);
    this.sellingPointService.findById(1).subscribe(result => this.sellingPoint = result);
    this.paymentTypeService.getPaymentsTypeAll().subscribe(result => this.paymentTypeList = result)
    if(sessionStorage.getItem(this.INVOICES_SESSION_STORAGE)!=null) {
       this.invoiceCarts = new MatTableDataSource<InvoiceCarts>(JSON.parse(sessionStorage.getItem(this.INVOICES_SESSION_STORAGE)));
       this.calculateTotal();
    }else{
      this.invoiceCarts = new MatTableDataSource<InvoiceCarts>();
    }
    registerLocaleData( es );
  }


  private updateDataInvoice(invoice:InvoiceCarts[]):void {
    this.invoiceCarts = new MatTableDataSource<InvoiceCarts>(invoice);
    if(invoice.length == 0 ) {
        this.removeInvoiceSessionStorage();
    }else { 
      sessionStorage.setItem(this.INVOICES_SESSION_STORAGE, JSON.stringify(invoice));  
    }
    
  }
  


  public cleanData():void {
    this.clientService.findByClientId(this.ID_CLIENT_GENERAL).subscribe(result => this.client = result);
    this.removeInvoiceSessionStorage();
    this.invoiceCarts = new MatTableDataSource<InvoiceCarts>();
    this.total = 0;
    this.productCode = null;
    this.paymentTypeId = null;
  }

  private removeInvoiceSessionStorage():void {
    sessionStorage.removeItem(this.INVOICES_SESSION_STORAGE);
  }


  public addProduct():void {
    this.productCodeValidator.markAsTouched();
    if(this.productCodeValidator.valid) {
      this.productService.findByProductId(this.productCode)
          .subscribe(product => this.addProductInTable(product),
                    (err) => this.messageService.showErrorMessage("No se pudo encontrar el articulo"));
            
    }
  }


  private addProductInTable(product:Product): void {
    const data = this.invoiceCarts.data;
    const index = data.findIndex(productCart => product.codigo == productCart.productCode);

    if(index>=0) {
      const productCart = data[index];
      productCart.amount = (+productCart.amount) + 1;
      productCart.total = productCart.amount * productCart.price;
      data[index] = productCart;
    } else {
      let productAdd:InvoiceCarts = {
          productCode:product.codigo, nameProduct:product.name,
          amount:1,price:product.price,total:product.price 
      }          
      data.push(productAdd);      
    }  
    this.productCode = null;
    this.updateDataInvoice(data);
    this.calculateTotal();  
    document.getElementById("codeproduct").focus();
    this.productCodeValidator.markAsUntouched();
  }


public deleteItem(itemCart:InvoiceCarts): void {
  let data = this.invoiceCarts.data;
  const index = data.findIndex(item => item.productCode == itemCart.productCode)
  if (index > -1) {
      data.splice(index, 1);
      this.updateDataInvoice(data);
      this.calculateTotal();
 }

}

public numberOnly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
}

public calculateTotal():void{
  this.total = 0;
  this.invoiceCarts.data.forEach(item => this.total += item.total);
}



public confirmInvoice():void {

  if(!this.validateInvoice()) {
    return ;
  }

  this.displayStyle = "block";
  this.paymentTypeName = this.paymentTypeList.find(paymentType=>paymentType.id == this.paymentTypeId).name;
}



public saveInvoice():void {

  if(!this.validateInvoice()) {
    return ;
  }

  let invoice = new InvoiceRequest();
  invoice.clientId = this.client.id;
  invoice.paymentTypeId = this.paymentTypeId;
  invoice.sellerId = this.authService.userData.id;
  invoice.sellingPointId = this.authService.userData.sellingPointId;
  invoice.invoiceDetails = this.invoiceCarts
                               .data
                               .map((item)=>{
                                return {price:item.price, amount:item.amount, productCode:item.productCode}
                               });
  this.invoiceService.saveInvoice(invoice).subscribe((response)=>{
    
   
    this.displayStyle = "none";
    this.cleanData();
    this.invoiceService
        .getInvoicePdf(response.numberInvoice)
        .subscribe((pdfResponse) => this.generateInvoicePdf(pdfResponse))
  },
  (error)=>this.exceptionHandler.handlerError(error));
 
}




private validateInvoice():boolean {
  this.paymentTypeValidators.markAsTouched();
  if(this.paymentTypeValidators.invalid) {    
    return false;
  }

  if(this.invoiceCarts.data.length == 0 ) {
     swal("Error","Adicione productos a la compra", 'error');
     return false;
  }

  let invoiceValidation = true;

  for(let i=0; i<this.invoiceCarts.data.length; i++){
      if(this.invoiceCarts.data[i].amount== null || this.invoiceCarts.data[i].amount<=0) {
        invoiceValidation = false;
        break;
      }

      if(this.invoiceCarts.data[i].price== null || this.invoiceCarts.data[i].price<=0) {
        invoiceValidation = false;
        break;
      }
      
  } 

  if(!invoiceValidation) {
    let errorMsg = "valida que dentro de la compra se encuentre bien diligenciados "+
                   " la cantidad y el precio para cada producto,"+
                   " estos deben ser valores numericos superiores a 0 ";
     swal("Error",errorMsg, 'error');
     return false;
  }
  

  return true;
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
