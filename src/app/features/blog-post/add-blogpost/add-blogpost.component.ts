import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/get-category-request.model';
import { Subscription } from 'rxjs';
import { ImageService } from '../../../shared/components/image-selector/image.service';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent implements OnInit, OnDestroy {

  blog:AddBlogPost;
  categories?:Category[];
  isImageSelectorVisible: boolean=false;
  imageSelectorSubscription?: Subscription;

 
  constructor(private blogPostService: BlogPostService, private categoryService :CategoryService,
    private router: Router, private imageService :ImageService) {
  this.blog =  { 
  title:'',
  author:'',
  publishedDate: new Date(),
  urlHandle:'',
  shortDescription:'',
  featuredImageUrl:'',
  content:'',
  isVisible:true,
  categories:[]

 }
    
  }
  ngOnDestroy(): void {
    this.imageSelectorSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    });

    this.imageSelectorSubscription = this.imageService.onSelectImage().subscribe(
      {
        next:(response)=>{
          this.blog.featuredImageUrl=response.url;
          this.isImageSelectorVisible=false;
        }
      }
    )
  }

  onSubmit():void{
    console.log('inside submit button');
    this.blogPostService.addBlogPost(this.blog).subscribe({
      next:(response)=>{
        this.router.navigateByUrl('/admin/blogposts');
       
      }
    });


  }

  openImageSelectorModal(): void {
    this.isImageSelectorVisible = true;
  }

  closeImageSelectorModal(): void {
    this.isImageSelectorVisible = false;
  }

}
