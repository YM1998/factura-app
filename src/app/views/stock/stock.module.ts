import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';
import { TemplateModule } from 'src/app/templates/template.module';
import { MainComponent } from './main/main.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { ProductService } from 'src/app/services/product.service';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MovementStockService } from 'src/app/services/movement_stock.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ExceptionHandlerService } from 'src/app/handlers/exception_handler.service';


@NgModule({
  declarations: [MainComponent, DialogComponent],
  imports: [
    CommonModule,
    StockRoutingModule,
    TemplateModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    StockRoutingModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule

  ],
  providers: [ProductService, MovementStockService,ExceptionHandlerService],
})
export class StockModule { }
