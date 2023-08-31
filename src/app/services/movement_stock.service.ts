import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from  'rxjs/operators'
import {MOVEMENT_STOCK_GET_TYPES, MOVEMENT_STOCK_SAVE} from '../util/enpoints.app';
import { MovementStockType } from '../models/movement_stock_type';
import { MovementStock } from '../models/movement_stock';



@Injectable({providedIn: 'root'})
export class MovementStockService {

    constructor(private http:HttpClient){}



    public getMovementTypes():Observable<MovementStockType[]> {
        return this.http.get<MovementStockType[]>(MOVEMENT_STOCK_GET_TYPES)
                        .pipe(catchError(e => throwError(e)));
    }

    public saveMovement(movement:MovementStock) : Observable<void> {
        return this.http.post<void>(MOVEMENT_STOCK_SAVE, movement)
                        .pipe(catchError(e=> throwError(e)));
    }

    

}