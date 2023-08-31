import { Component, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import {MatTableDataSource} from '@angular/material/table';
import { Product } from 'src/app/models/product';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MovementStock } from 'src/app/models/movement_stock';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {


  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource : MatTableDataSource<Product> ; 

  public displayedColumns: string[] = ['Codigo', 'Nombre', 'Stock', 'Estado','Accion'];

  constructor(private productService:ProductService,
              public dialog: MatDialog) { }

  

  ngOnInit(): void {
    this.initData();
  }

  private initData():void {
    this.productService
        .getAllProductBySellingPoint(1)
        .subscribe(products => {
          this.dataSource = new MatTableDataSource<Product>(products)
          this.dataSource.paginator = this.paginator;
        });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  openDialogMovement(product:Product): void {
    let movement = new MovementStock();
    movement.productId = product.idProduct;
    const dialogRef = this.dialog.open(DialogComponent, {
      width: 'auto',
      data: movement
    });
    dialogRef.afterClosed().subscribe(result => this.initData());
  }
}
