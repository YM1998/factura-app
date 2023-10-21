import { Component,Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ExceptionHandlerService } from 'src/app/handlers/exception_handler.service';
import { MovementStock } from 'src/app/models/movement_stock';
import { MovementStockType } from 'src/app/models/movement_stock_type';
import { AuthService } from 'src/app/services/auth.service';
import { MovementStockService } from 'src/app/services/movement_stock.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  public movementStockTypes:MovementStockType[];
  public movemnetStock:MovementStock;

  public movementValueValidator = new FormControl('', [Validators.required]);
  public movementTypeValidator = new FormControl('', [Validators.required]);

  private  TYPE_INVOICE:number = 4;

  constructor(private movementStockService:MovementStockService,
             public dialogRef: MatDialogRef<DialogComponent>,
             @Inject(MAT_DIALOG_DATA) public dataDialog: MovementStock,
             private exceptionHandler:ExceptionHandlerService,
             private authService:AuthService){}

  ngOnInit(): void {
    this.movemnetStock = this.dataDialog;
    this.movementStockService.getMovementTypes()
                             .subscribe(result => 
                      {
                          this.movementStockTypes = result;

                        /** se elimina el tipo "Salida por venta" de 
                         * los tipos de movimientos disponibles */
                        const index = this.movementStockTypes
                                          .findIndex(move => move.id == this.TYPE_INVOICE)
                          if (index > -1) {
                              this.movementStockTypes.splice(index, 1);
                          }
                       });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  public save():void{
    console.log("Inicio validacion")
    if(this.formIsInvalid()) { return; }
    console.log("Paso validacion")

    this.movemnetStock.sellingPointId = this.authService.userData.sellingPointId;
    this.movementStockService.saveMovement(this.movemnetStock)
                             .subscribe(() =>  
                                        {
                                          swal('Registro exitoso',"Registro", 'success');
                                          this.dialogRef.close();
                                        },
                                        (error)=> this.exceptionHandler.handlerError(error))

  }


  private formIsInvalid():boolean {
    this.movementTypeValidator.markAsTouched();
    this.movementValueValidator.markAsTouched();

    return this.movementTypeValidator.invalid ||  this.movementValueValidator.invalid;
  }
  

}
