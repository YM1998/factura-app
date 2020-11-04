import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Category } from '../models/category';
import { catchError, map } from  'rxjs/operators'
import { getCategoryAll } from '../util/enpoints.app';

@Injectable({providedIn: 'root'})
export class CategoryService {

  constructor(private http:HttpClient) { }


  public getCategories():Observable<Category[]>{
    return this.http.get<Category[]>(getCategoryAll)
                    .pipe(catchError(e=> throwError(e)));
  }

}
