import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Category } from '../models/category';
import { catchError, map } from  'rxjs/operators'
import { CATEGORY_GET_ALL } from '../util/enpoints.app';
import { CATEGORY_SAVE } from '../util/enpoints.app';
import { CATEGORY_UPDATE } from '../util/enpoints.app';
import { CATEGORY_DELETE } from '../util/enpoints.app';

@Injectable({providedIn: 'root'})
export class CategoryService {

  constructor(private http:HttpClient) { }


  public getCategories():Observable<Category[]>{
    return this.http.get<Category[]>(CATEGORY_GET_ALL)
                    .pipe(catchError(e=> throwError(e)));
  }

  public saveCategory(category:Category):Observable<void>{
    return this.http.post<void>(CATEGORY_SAVE,category)
                    .pipe(catchError(e=> throwError(e)));
  }

  public updateCategory(category:Category):Observable<void>{
    return this.http.put<void>(CATEGORY_UPDATE,category)
                    .pipe(catchError(e=> throwError(e)));
  }


  public deleteCategory(idCategory:number):Observable<void>{
    return this.http.delete<void>(CATEGORY_DELETE.replace('{idCategory}', idCategory.toString()))
                    .pipe(catchError(e=> throwError(e)));
  }


}
