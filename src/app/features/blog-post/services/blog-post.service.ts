import { Injectable } from '@angular/core';
import { HttpClient}  from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddBlogPost } from '../models/add-blog-post.model';
import { environment } from '../../../../environments/environment';
import { getBlogPostRequest } from '../models/get-all-blog-post.model';
import { updateBlogPost } from '../models/update-blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private httpClient:HttpClient) { }

  addBlogPost(blog: AddBlogPost): Observable<AddBlogPost>
  {
    //console.log('inside service');
   // console.log(blog);
   // console.log("url:" + `${environment.apiUrl}/BlogPosts`)
    return this.httpClient.post<AddBlogPost>(`${environment.apiUrl}/BlogPosts?addAuth=true`,blog);
   
  
  }

  getAllBlogPosts(): Observable<getBlogPostRequest[]>
  {
    return this.httpClient.get<getBlogPostRequest[]>(`${environment.apiUrl}/BlogPosts`);
  }

  getBlogPostById(id: string) : Observable<getBlogPostRequest>
  {
    return this.httpClient.get<getBlogPostRequest>(`${environment.apiUrl}/BlogPosts/${id}`);
  }

  updateBlogPost(id:string,blog: updateBlogPost): Observable<getBlogPostRequest>
  {
    return this.httpClient.put<getBlogPostRequest>(`${environment.apiUrl}/BlogPosts/${id}?addAuth=true`,blog);
  }


  deleteBlogPost(id:string): Observable<getBlogPostRequest>
  {
    return this.httpClient.delete<getBlogPostRequest>(`${environment.apiUrl}/BlogPosts/${id}?addAuth=true`);
  }

  getBlogByUrlHandle (url:string) : Observable<getBlogPostRequest>
  {
   return this.httpClient.get<getBlogPostRequest>(`${environment.apiUrl}/BlogPosts/${url}`);
  }
}
