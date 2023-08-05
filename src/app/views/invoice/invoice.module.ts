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


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    TemplateModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],

  providers: [ClientService,PaymentTypeService, SellingPointService, MessageService],
})
export class InvoiceModule { }
