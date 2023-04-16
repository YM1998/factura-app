import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';
import {MatDialog} from '@angular/material/dialog';
import { SaveDialogComponent } from '../dialog/dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { ExceptionHandlerService } from 'src/app/handlers/exception_handler.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit {


  @ViewChild(MatPaginator) paginator: MatPaginator;
  public categoriesDataSource : MatTableDataSource<Category> ; 

  public displayedColumns: string[] = ['Nombre', 'Estado','FechaCreacion','FechaModificacion','Usuario', 'Acciones' ];

  constructor(private categoryService:CategoryService,
              private exceptionHandlerService:ExceptionHandlerService,
              public dialog: MatDialog) { }


  ngOnInit(): void {
    this.initData();
  }

  private initData() {
    this.categoryService.getCategories().subscribe(categoriesList => this.loadCategories(categoriesList));
   }

   private loadCategories(categories:Category[]): void{
    this.categoriesDataSource = new MatTableDataSource<Category>(categories);
    this.categoriesDataSource.paginator = this.paginator;
  }


  openDialogCreate(): void {
      const dialogRef = this.dialog.open(SaveDialogComponent, {
        width: 'auto',
        data: {}
      });
      dialogRef.afterClosed().subscribe(result => this.initData());
    }

    openDialogUpdate(category:Category): void {
      var copyCategory = {idCategory:category.idCategory, name:category.name, idStatus:category.idStatus }
      const dialogRef = this.dialog.open(SaveDialogComponent, {
        width: 'auto',
        data: copyCategory
      });
      dialogRef.afterClosed().subscribe(result => this.initData());
    }


    public openDialogConfirmDelete(category:Category): void {
      Swal.fire({
        title: 'Estas seguro?',
        text: 'Esta categoria se eliminara de los registros',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {
          this.deleteCategory(category.idCategory);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelado',
            'Se cancelo la operacion',
            'error'
          )
        }
      })
    }
  
  
    public deleteCategory(idCategory:number):void{
        this.categoryService.deleteCategory(idCategory)
            .subscribe(() =>  {
              this.initData();
              Swal('Se elimino correctamente el registro',"Registro Eliminado", 'success');  
            },
            (err) => this.exceptionHandlerService.handlerError(err))
    }
  
 
  

}
