import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/get-category-request.model';
import { environment } from '../../../../environments/environment';
import { UpdateCategoryRequest } from '../models/update-category-request.model';
import { CookieService } from 'ngx-cookie-service';



@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  //private readonly apiUrl= "https://localhost:7266/api";

  
 
  constructor( private  http : HttpClient,
    private cookieService : CookieService
  ) { }


  addCategory(model: AddCategoryRequest) : Observable< void>
  {
    return this.http.post<void>(`${environment.apiUrl}/Categories?addAuth=true`,model);
  }

  getAllCategories(query?:string, sortBy?:string, sortDirection?:string, pageNumber?:number, pageSize?:number)
  :Observable<Category[]>{
    let params= new HttpParams();
    if(query)
    {
      params=params.set('query',query);
    }
    if(sortBy)
    {
      params= params.set('sortBy',sortBy);
    }
    if(sortDirection)
    {
      params= params.set('sortDirection',sortDirection);

    }

    if(pageNumber){
      params= params.set('pageNumber',pageNumber)
    }
    if(pageSize)
    {
      params=params.set('pageSize',pageSize)
    }
    return this.http.get<Category[]>(`${environment.apiUrl}/Categories`,{params:params});
  }

  getCategoryById(id:string): Observable<Category>
  {
  return this.http.get<Category>(`${environment.apiUrl}/Categories/${id}`);

  }

  updateCategoryById(id: string,category: UpdateCategoryRequest): Observable<Category>
  {
    
   return this.http.put<Category>(`${environment.apiUrl}/categories/${id}?addAuth=true`,category
   // ,{ headers:{'Authorization':this.cookieService.get('Authorization')} }
  );
  }

  deleteCategoryById(id: string): Observable<Category>
    {
      return this.http.delete<Category>(`${environment.apiUrl}/categories/${id}?addAuth=true`);
    }

    getCategoryCount():Observable<number>{
      return this.http.get<number>(`${environment.apiUrl}/categories/count`);
    }
}
