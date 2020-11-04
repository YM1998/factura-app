import { NgModule } from '@angular/core'
import { CategoryRouting } from './category-routing.module';
import { CommonModule } from "@angular/common";
import { HeaderComponent } from '../../templates/header/header.component';
import { CategoryComponent } from './main/category.component';
import { TableCategoryComponent } from './table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from '../../services/category.service';
import { StatusService } from '../../services/status.service';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { SaveDialogComponent } from './dialog/dialog.component';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    CategoryComponent,
    TableCategoryComponent,
    SaveDialogComponent  
  ],
  imports:[
    CategoryRouting,
    CommonModule,
    MatTableModule,
    HttpClientModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CategoryService,StatusService],
})
export class CategoryModule { }
