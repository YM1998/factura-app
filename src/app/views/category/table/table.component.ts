import { Component, Input, OnInit , ViewChild} from '@angular/core';
import { Category } from '../../../models/category';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { CategoryService } from '../../../services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { SaveDialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-table-category',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableCategoryComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public categoriesDataSource : MatTableDataSource<Category> ; 

  public displayedColumns: string[] = ['Nombre', 'Estado','FechaCreacion','FechaModificacion','Usuario', 'Acciones' ];

  constructor(private categoryService: CategoryService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(categoriesList => this.loadCategories(categoriesList));
  }


  private loadCategories(categories:Category[]): void{
    this.categoriesDataSource = new MatTableDataSource<Category>(categories);
    this.categoriesDataSource.paginator = this.paginator;
  }

  openDialog(category:Category): void {
    const dialogRef = this.dialog.open(SaveDialogComponent, {
      width: 'auto',
      data: category
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
