
import { Injectable } from '@angular/core';
import swal from'sweetalert2';


@Injectable({providedIn: 'root'})
export class MessageService {
    
    constructor() { }

    public showErrorMessage(error:string):void{       
       swal("Error",  error, 'error');
    }
    
}