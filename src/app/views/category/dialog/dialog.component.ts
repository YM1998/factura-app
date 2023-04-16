import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Status } from 'src/app/models/status';
import { StatusService } from 'src/app/services/status.service';
import { Category } from '../../../models/category';
import swal from'sweetalert2';
import { CategoryService } from 'src/app/services/category.service';
import { ExceptionHandlerService } from 'src/app/handlers/exception_handler.service';


@Component({
  selector: 'app-save-dialog',
  templateUrl: './dialog.component.html'
})
export class SaveDialogComponent implements OnInit {

   public title:string;
   public category:Category;
   public status: Status[];
   public nameValidators = new FormControl('', [Validators.required]);
   public statusValidators = new FormControl('', [Validators.required]);





  constructor(private statusService:StatusService, 
              private categoryService:CategoryService,
              private exceptionHandlerService:ExceptionHandlerService,
              public dialogRef: MatDialogRef<SaveDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public dataDialog: Category) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {    
    this.statusService.getStatus().subscribe( statusList => this.status=statusList);
    this.loadCategory();
  }

  private loadCategory(): void{
    if(this.dataDialog){
      this.category = this.dataDialog;
       if(this.category.idCategory == null) {
          this.title = "Registrar Categoria";
       }else{
          this.title = "Actualizar Categoria";
       }
    }
  }


  public save():void{
    if(this.formIsInvalid()){ return; }
    
    if(this.category.idCategory == null) {
      this.saveCategory(this.category);
    }else{
      this.updateCategory(this.category);
    }

  }


private saveCategory(category:Category):void {
  this.categoryService.saveCategory(this.category)
      .subscribe(() => {
        swal('Registro exitoso',"Registro", 'success');
        this.dialogRef.close();
      },  
      (err) => this.exceptionHandlerService.handlerError(err));
}


private updateCategory(category:Category):void {
  this.categoryService.updateCategory(this.category)
      .subscribe(() =>  {
        swal('Actualizacion exitosa',"Registro", 'success');
        this.dialogRef.close();
      },
      (err) => this.exceptionHandlerService.handlerError(err));
}


private formIsInvalid():boolean{
  this.nameValidators.markAsTouched();
  this.statusValidators.markAsTouched();
  return this.nameValidators.invalid || this.statusValidators.invalid;
}


}
