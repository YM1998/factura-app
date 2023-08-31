import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from  'rxjs/operators'
import {  PRODUCT_FIND_BY_CODE, PRODUCT_GET_ALL, PRODUCT_GET_ALL_BY_SELLING_POINT, PRODUCT_SAVE, PRODUCT_UPDATE, PRODUCT_UPDATE_STATUS } from '../util/enpoints.app';
import { Product } from '../models/product';
import { ProductUpdate } from '../models/product_update';

@Injectable({providedIn: 'root'})
export class ProductService {

  constructor(private http:HttpClient) { }


  public getAllProduct():Observable<Product[]> {
    return this.http.get<Product[]>(PRODUCT_GET_ALL)
                    .pipe(catchError(e =>throwError(e)));
  }

  public getAllProductBySellingPoint(sellingPointId:number):Observable<Product[]> {
    return this.http.get<Product[]>(PRODUCT_GET_ALL_BY_SELLING_POINT.replace('{sellingPointId}',sellingPointId+''))
                    .pipe(catchError(e =>throwError(e)));
  }

  
  public findByProductId(productCode:string):Observable<Product> {
    return this.http.get<Product>(PRODUCT_FIND_BY_CODE.replace('{code}',productCode))
                    .pipe(catchError(e =>throwError(e)));
  }


  public saveProduct(product:Product): Observable<void> {
   return this.http.post<void>(PRODUCT_SAVE, product)
             .pipe(catchError(e => throwError(e)));
  }

  public updateProduct(productUpdate:ProductUpdate): Observable<void> {
    return this.http.put<void>(PRODUCT_UPDATE, productUpdate)
              .pipe(catchError(e => throwError(e)));
   }

   public updateState(statusId:number, productId:number): Observable<void> {
    return this.http.put<void>(PRODUCT_UPDATE_STATUS
               .replace('{productId}',productId+'')
               .replace('{statusId}', statusId+''),{})              
               .pipe(catchError(e => throwError(e)));
   }

 



}
