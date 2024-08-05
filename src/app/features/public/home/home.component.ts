import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { Subscription } from 'rxjs';
import { getBlogPostRequest } from '../../blog-post/models/get-all-blog-post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  blogposts? : getBlogPostRequest[];
  blogPostsSubscription?: Subscription;
  
  constructor(private blogPostService:BlogPostService) {

  }
  ngOnInit(): void {
   this.blogPostsSubscription= this.blogPostService.getAllBlogPosts().subscribe({
next:(response)=>{
  this.blogposts=response;
}

   });
  }

}
