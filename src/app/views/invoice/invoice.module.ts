import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { MainComponent } from './main/main.component';
import { TemplateModule } from 'src/app/templates/template.module';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { PaymentTypeService } from 'src/app/services/payment_type.service';
import { SellingPointService } from 'src/app/services/selling_point.service';
import { MessageService } from 'src/app/handlers/message.service';
import { InvoiceReportComponent } from './invoice-report/invoice-report.component';
import { Invoiceservice } from 'src/app/services/invoice.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    MainComponent,
    InvoiceReportComponent
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    TemplateModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],

  providers: [ClientService,PaymentTypeService, SellingPointService, MessageService, Invoiceservice],
})
export class InvoiceModule { }
