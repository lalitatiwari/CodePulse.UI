import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { HttpClient } from '@angular/common/http';
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

  getAllCategories():Observable<Category[]>{
    return this.http.get<Category[]>(`${environment.apiUrl}/Categories`);
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
}
