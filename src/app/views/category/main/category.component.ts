import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';
import {MatDialog} from '@angular/material/dialog';
import { SaveDialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit {


  constructor(private categoryService:CategoryService,
              public dialog: MatDialog) { }


  ngOnInit(): void {
  }

    openDialog(): void {
      const dialogRef = this.dialog.open(SaveDialogComponent, {
        width: 'auto',
        data: {}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }


}
