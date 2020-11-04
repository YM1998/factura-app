import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Status } from 'src/app/models/status';
import { StatusService } from 'src/app/services/status.service';
import { Category } from '../../../models/category';


@Component({
  selector: 'app-save-dialog',
  templateUrl: './dialog.component.html'
})
export class SaveDialogComponent implements OnInit {

   public category:Category;
   public status: Status[];
   public nameValidators = new FormControl('', [Validators.required]);
   public statusValidators = new FormControl('', [Validators.required]);


  constructor(private statusService:StatusService, 
              public dialogRef: MatDialogRef<SaveDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public dataDialog: Category) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {    
    this.statusService.getStatus().subscribe( status => this.status=status);
    this.loadCategory();
  }

  private loadCategory(): void{
    if(this.dataDialog){
      this.category = this.dataDialog;
    }else{
      this.category = new Category();
    }
  }


  public save():void{
    this.nameValidators.markAsTouched();
    this.statusValidators.markAsTouched();
    if(this.nameValidators.invalid || this.statusValidators.invalid){
      return;
    }

    alert('Paso');
  }

}
