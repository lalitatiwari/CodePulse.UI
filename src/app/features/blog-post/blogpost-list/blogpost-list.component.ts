import { Component, OnDestroy, OnInit } from '@angular/core';
import { getBlogPostRequest } from '../models/get-all-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrl: './blogpost-list.component.css'
})
export class BlogpostListComponent implements OnInit,OnDestroy{

  id? : string|null
  blogposts? : getBlogPostRequest[];
  blogPostsSubscription?: Subscription;

  constructor(private blogPostService : BlogPostService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router){}
  ngOnDestroy(): void {
    this.blogPostsSubscription?.unsubscribe();
  }
  ngOnInit(): void {
  //  this.activatedRoute.paramMap.subscribe(
  //   {
  //     next:(params)=>{
  //       this.id= params.get('id');
  //     }
  //   }
  //  )

   this.blogPostsSubscription=this.blogPostService.getAllBlogPosts().subscribe({
    next:(response)=>{
      this.blogposts=response;
    }
   });
  }

  deleteBlogPostById(id:string)
  {
   // if(this.id)
   // {
      this.blogPostService.deleteBlogPost(id).subscribe(
        {
          next:(response)=>{
            this.ngOnInit();
       //   this.router.navigateByUrl("admin/blogposts");
          console.log('delete method  called')
         }
        }
      );
    }

  


}
