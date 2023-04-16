
import { Injectable } from '@angular/core';
import swal from'sweetalert2';


@Injectable({providedIn: 'root'})
export class ExceptionHandlerService {
    
    constructor() { }

    public handlerError(error:any):void{
       if(error.error.messageError) {
          swal("Error", error.error.messageError, 'error');
       }else {
        swal("Sucedio un eror procesando su solicitud ","Error", 'error');
       }         
    }
    
}