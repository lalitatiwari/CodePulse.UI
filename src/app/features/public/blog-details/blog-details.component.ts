import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { getBlogPostRequest } from '../../blog-post/models/get-all-blog-post.model';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent implements OnInit {
url:string|null=null;
blog?:getBlogPostRequest;

  constructor(private activatedRoute:ActivatedRoute, private blogPostService :BlogPostService)  {}
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      {next:(params)=>{
      this.url=  params.get('url')
      }}
    );

    //fetch blog details
    if(this.url){
 this.blogPostService.getBlogByUrlHandle(this.url).subscribe({
  next:(response)=>{
    this.blog=response;

  }})
    }
  }

}
